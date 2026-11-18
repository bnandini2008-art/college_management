import uuid
from datetime import timedelta
from django.utils import timezone
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import ChatSession, ChatMessage, CollegeInfo, Department, Notice
from .serializers import (
    ChatMessageSerializer,
    ChatSessionSerializer,
    CollegeInfoSerializer,
    DepartmentSerializer,
    NoticeSerializer
)
from .gemini_service import call_gemini_api

INITIAL_GREETING = """Hey, Student! 👋
Welcome to SKASC!
I'm NEO Buddy, your AI student companion.

How can I help you today?"""


@api_view(['POST'])
@permission_classes([AllowAny])
def chat_send(request):
    """
    POST /api/chat/
    Send a message (session_id, message); returns the bot reply.
    Implements NFR-4 abuse control: 500 char limit & 20 msgs/minute rate limit.
    """
    session_id_str = request.data.get('session_id')
    user_message = request.data.get('message', '').strip()

    if not user_message:
        return Response({'error': 'Message cannot be empty.'}, status=status.HTTP_400_BAD_REQUEST)

    # NFR-4: Message length restriction
    max_length = getattr(settings, 'CHAT_MAX_MESSAGE_LENGTH', 500)
    if len(user_message) > max_length:
        return Response({
            'error': f'Message exceeds maximum allowed length of {max_length} characters.'
        }, status=status.HTTP_400_BAD_REQUEST)

    # Resolve or create ChatSession
    session = None
    if session_id_str:
        try:
            session_uuid = uuid.UUID(str(session_id_str))
            session = ChatSession.objects.filter(id=session_uuid).first()
        except ValueError:
            session = None

    if not session:
        session = ChatSession.objects.create()

    # NFR-4: Rate limiting check (20 messages per minute)
    one_minute_ago = timezone.now() - timedelta(minutes=1)
    recent_count = ChatMessage.objects.filter(
        session=session,
        role='user',
        created_at__gte=one_minute_ago
    ).count()

    rate_limit = getattr(settings, 'CHAT_RATE_LIMIT_PER_MINUTE', 20)
    if recent_count >= rate_limit:
        return Response({
            'error': 'Rate limit exceeded. Please wait a moment before sending another message.'
        }, status=status.HTTP_429_TOO_MANY_REQUESTS)

    # FR-6: Save user message in DB
    user_msg_obj = ChatMessage.objects.create(
        session=session,
        role='user',
        content=user_message
    )

    # FR-5: Call Gemini API (with fallback)
    try:
        bot_reply = call_gemini_api(session, user_message)
    except Exception as e:
        bot_reply = "I'm having a brief connection glitch right now! 💙 Please ask me again in just a moment, or contact our college office at +91 422 2679 901."

    # FR-6: Save assistant reply in DB
    bot_msg_obj = ChatMessage.objects.create(
        session=session,
        role='assistant',
        content=bot_reply
    )

    session.last_active_at = timezone.now()
    session.save(update_fields=['last_active_at'])

    return Response({
        'session_id': str(session.id),
        'reply': bot_reply,
        'timestamp': bot_msg_obj.created_at.strftime('%I:%M %p'),
        'user_message_id': user_msg_obj.id,
        'bot_message_id': bot_msg_obj.id,
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def chat_history(request):
    """
    GET /api/chat/history/?session_id=UUID
    Returns all messages belonging to this session.
    """
    session_id_str = request.query_params.get('session_id')
    if not session_id_str:
        return Response({'session_id': None, 'messages': []})

    try:
        session_uuid = uuid.UUID(str(session_id_str))
        session = ChatSession.objects.filter(id=session_uuid).first()
        if not session:
            return Response({'session_id': session_id_str, 'messages': []})
    except ValueError:
        return Response({'session_id': session_id_str, 'messages': []})

    messages = ChatMessage.objects.filter(session=session).order_by('created_at')
    serializer = ChatMessageSerializer(messages, many=True)
    return Response({
        'session_id': str(session.id),
        'messages': serializer.data
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def chat_new(request):
    """
    POST /api/chat/new/
    Creates a new ChatSession and stores the initial greeting from NEO Buddy.
    """
    session = ChatSession.objects.create()

    # Store initial welcoming message
    initial_msg = ChatMessage.objects.create(
        session=session,
        role='assistant',
        content=INITIAL_GREETING
    )

    return Response({
        'session_id': str(session.id),
        'greeting': INITIAL_GREETING,
        'timestamp': initial_msg.created_at.strftime('%I:%M %p'),
    }, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def chat_clear_history(request):
    """
    DELETE /api/chat/history/?session_id=UUID
    Clears conversation history for the given session.
    """
    session_id_str = request.query_params.get('session_id') or request.data.get('session_id')
    if not session_id_str:
        return Response({'error': 'session_id is required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        session_uuid = uuid.UUID(str(session_id_str))
        session = ChatSession.objects.filter(id=session_uuid).first()
        if session:
            # Delete messages or session
            session.messages.all().delete()
            # Optionally recreate the friendly greeting
            ChatMessage.objects.create(
                session=session,
                role='assistant',
                content=INITIAL_GREETING
            )
            return Response({'success': True, 'message': 'Chat history cleared successfully.'})
    except ValueError:
        pass

    return Response({'success': False, 'message': 'Session not found.'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([AllowAny])
def departments_list(request):
    """GET /api/departments/"""
    departments = Department.objects.all()
    serializer = DepartmentSerializer(departments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def notices_list(request):
    """GET /api/notices/"""
    notices = Notice.objects.filter(is_active=True)
    serializer = NoticeSerializer(notices, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def college_info_list(request):
    """GET /api/college-info/"""
    category = request.query_params.get('category')
    qs = CollegeInfo.objects.all()
    if category:
        qs = qs.filter(category=category)
    serializer = CollegeInfoSerializer(qs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def college_stats(request):
    """GET /api/stats/ Returns summary data for the college website."""
    return Response({
        'college_name': 'SKASC - Shree Kandhaswamy Arts & Science College',
        'motto': 'Learn • Innovate • Excel',
        'years_of_excellence': '25+',
        'happy_students': '5K+',
        'placement_support': '100%',
        'phone': '+91 422 2679 901',
        'email': 'info@skasc.ac.in',
        'address': 'Coimbatore, Tamil Nadu, India - 641008',
    })
