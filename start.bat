@echo off
title SKASC College Management System Launcher
echo ======================================================================
echo 🎓 Starting SKASC College Management System
echo 🤖 Google Gemini 3.5 Flash Core + NEO Buddy Chatbot
echo ======================================================================

echo [1/3] Starting Django REST Backend on Port 8000...
start "SKASC Django Backend" cmd /k "C:\app\WINDOWS.X64_213000_db_home\python\bin\python.exe run_server.py"

echo [2/3] Starting React Frontend Dev Server on Port 3000...
start "SKASC React Frontend" cmd /k "cd frontend && \"C:\Program Files\nodejs\npm.cmd\" run dev"

echo [3/3] Opening Browser...
timeout /t 3 >nul
start http://localhost:3000

echo ======================================================================
echo 🚀 Both servers are running!
echo 👉 React App:      http://localhost:3000
echo 👉 Django Backend: http://127.0.0.1:8000
echo 👉 Admin Panel:    http://127admin.0.0.1:8000/ (admin / admin123)
echo ======================================================================
pause
