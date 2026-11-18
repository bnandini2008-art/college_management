from django.urls import path
from . import views

urlpatterns = [
    # Chatbot endpoints as per SRS Section 7.1
    path('chat/', views.chat_send, name='chat_send'),
    path('chat/history/', views.chat_history, name='chat_history'),
    path('chat/new/', views.chat_new, name='chat_new'),
    path('chat/clear/', views.chat_clear_history, name='chat_clear'),

    # College portal dynamic endpoints
    path('departments/', views.departments_list, name='departments_list'),
    path('notices/', views.notices_list, name='notices_list'),
    path('college-info/', views.college_info_list, name='college_info_list'),
    path('stats/', views.college_stats, name='college_stats'),
]
