"""
SKASC College Management Website - Unified Server Launcher
Runs the Django REST backend and serves the compiled React single-page frontend.
"""
import os
import sys

# Ensure Python path includes backend/lib
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(current_dir, "backend")
lib_dir = os.path.join(backend_dir, "lib")

if lib_dir not in sys.path:
    sys.path.insert(0, lib_dir)
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'college_project.settings')

if __name__ == '__main__':
    from django.core.management import execute_from_command_line
    print("=" * 70)
    print("🎓 SKASC - Shree Kandhaswamy Arts & Science College Portal")
    print("🤖 Powered by Google Gemini 3.5 Flash & NEO Buddy Chatbot")
    print("=" * 70)
    print("🚀 Starting server at: http://127.0.0.1:8000")
    print("📂 Admin panel at:     http://127.0.0.1:8000/admin (admin / admin123)")
    print("💬 REST API at:        http://127.0.0.1:8000/api/")
    print("=" * 70)
    execute_from_command_line([sys.argv[0], 'runserver', '127.0.0.1:8000', '--noreload'])
