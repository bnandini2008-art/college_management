from rest_framework import serializers
from .models import ChatSession, ChatMessage, CollegeInfo, Department, Notice

class ChatMessageSerializer(serializers.ModelSerializer):
    timestamp = serializers.SerializerMethodField()

    class Meta:
        model = ChatMessage
        fields = ['id', 'role', 'content', 'created_at', 'timestamp']

    def get_timestamp(self, obj):
        # Format like "10:24 AM" matching the reference UI image
        return obj.created_at.strftime('%I:%M %p')


class ChatSessionSerializer(serializers.ModelSerializer):
    messages = ChatMessageSerializer(many=True, read_only=True)

    class Meta:
        model = ChatSession
        fields = ['id', 'created_at', 'last_active_at', 'is_active', 'messages']


class CollegeInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollegeInfo
        fields = ['id', 'category', 'title', 'content', 'updated_at']


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name', 'code', 'hod', 'description', 'courses_offered', 'icon', 'order']


class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = ['id', 'title', 'date', 'category', 'description', 'is_active', 'order']
