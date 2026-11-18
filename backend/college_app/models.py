import uuid
from django.db import models
from django.contrib.auth.models import User

class ChatSession(models.Model):
    """Stores one visitor's continuous chat session, identified by a UUID."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    last_active_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-last_active_at']

    def __str__(self):
        return f"Session {self.id} (Active: {self.is_active})"


class ChatMessage(models.Model):
    """Stores every user message and assistant reply with its session and timestamp."""
    ROLE_CHOICES = [
        ('user', 'User'),
        ('assistant', 'Assistant'),
        ('system', 'System'),
    ]
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"[{self.role}] {self.content[:40]}... ({self.created_at.strftime('%H:%M:%S')})"


class CollegeInfo(models.Model):
    """Knowledge base entries managed by administrators and fed into LLM."""
    CATEGORY_CHOICES = [
        ('general', 'General College Info'),
        ('admissions', 'Admissions & Eligibility'),
        ('courses', 'Courses & Curriculum'),
        ('fees', 'Fees & Scholarships'),
        ('departments', 'Academic Departments'),
        ('faculty', 'Faculty & Staff'),
        ('facilities', 'Campus Facilities & Labs'),
        ('events', 'Events & Cultural Fests'),
        ('placements', 'Placements & Career Cell'),
        ('hostel', 'Hostel & Dining'),
        ('timetable', 'Timetable & Academics'),
        ('contact', 'Contact & Office Hours'),
    ]
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    title = models.CharField(max_length=255)
    content = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "College Information"
        ordering = ['category', 'title']

    def __str__(self):
        return f"[{self.category}] {self.title}"


class Department(models.Model):
    """College academic departments."""
    name = models.CharField(max_length=150)
    code = models.CharField(max_length=20, unique=True)
    hod = models.CharField(max_length=150)
    description = models.TextField()
    courses_offered = models.TextField(help_text="Comma-separated or list of courses")
    icon = models.CharField(max_length=50, default='laptop')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.name} ({self.code})"


class Notice(models.Model):
    """College announcements and official notices."""
    title = models.CharField(max_length=255)
    date = models.CharField(max_length=50)
    category = models.CharField(max_length=100, default='General')
    description = models.TextField(blank=True, default='')
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', '-id']

    def __str__(self):
        return f"{self.date} - {self.title}"
