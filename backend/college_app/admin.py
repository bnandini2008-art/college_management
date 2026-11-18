from django.contrib import admin
from .models import ChatSession, ChatMessage, CollegeInfo, Department, Notice

class ChatMessageInline(admin.TabularInline):
    model = ChatMessage
    extra = 0
    readonly_fields = ('role', 'content', 'created_at')
    can_delete = False

@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ('id', 'created_at', 'last_active_at', 'is_active', 'message_count')
    list_filter = ('is_active', 'created_at')
    search_fields = ('id',)
    inlines = [ChatMessageInline]
    readonly_fields = ('id', 'created_at', 'last_active_at')

    def message_count(self, obj):
        return obj.messages.count()
    message_count.short_description = "Total Messages"


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'session', 'role', 'short_content', 'created_at')
    list_filter = ('role', 'created_at')
    search_fields = ('content', 'session__id')
    readonly_fields = ('session', 'role', 'content', 'created_at')

    def short_content(self, obj):
        return obj.content[:60] + ('...' if len(obj.content) > 60 else '')
    short_content.short_description = "Message"


@admin.register(CollegeInfo)
class CollegeInfoAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'updated_at')
    list_filter = ('category', 'updated_at')
    search_fields = ('title', 'content')


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'hod', 'order')
    list_editable = ('order',)
    search_fields = ('name', 'code', 'hod')


@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'category', 'is_active', 'order')
    list_filter = ('category', 'is_active')
    list_editable = ('is_active', 'order')
    search_fields = ('title', 'description')
