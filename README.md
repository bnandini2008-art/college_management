# SKASC - Shree Kandhaswamy Arts & Science College Management System

A full-stack, enterprise-grade College Management Web Application with **Google Gemini 3.5 Flash**-powered AI student companion **NEO Buddy**, built strictly in compliance with the **Software Requirements Specification (SRS)** and the provided visual design mockups.

---

## 🌟 Key Highlights & Architecture

- **Frontend**: Single Page Application built with **React JS**, modern responsive components, Lucide icons, Google Fonts (`Plus Jakarta Sans`, `Playfair Display`, `Caveat`), and high-fidelity custom CSS adhering strictly to the uploaded reference mockups.
- **Backend**: **Python Django & Django REST Framework (DRF)** with SQLite database and CORS headers.
- **LLM Core**: **Google Gemini 3.5 Flash** API (`AQ.Ab8RN6JU0A4YfYz0mp9G3NF72RmJPXMGIsWZB6Pw00fWdy-YLw`).
- **Conversational AI**: **NEO Buddy**, featuring session-persistent conversation history, cheerful & polite in-persona responses, strict college-scope enforcement, and intelligent local knowledge base fallback ensuring 100% uptime.
- **Imaginary College Knowledge Base**: Comprehensive, richly detailed records for **SKASC (Shree Kandhaswamy Arts & Science College)**, covering 25+ years of legacy, 5 major academic departments, UG/PG courses, fee structures, merit scholarships, timetables, exam notifications, cultural fests (*Zenith 2K26*), placements (100% support, 120+ recruiters), hostel life, and contact details.

---

## 📸 Visual Design Adherence

The UI strictly follows the two uploaded reference images:

1. **College Homepage (`media_1794979871060_7c6fa8e1.jpg`)**:
   - **Top Contact Bar**: Phone (`+91 422 2679 901`), Email (`info@skasc.ac.in`), Student Portal / ERP Login link, Search icon.
   - **Main Navbar**: Custom SVG SKASC Crest emblem, bold serif typography, interactive dropdown navigation (`Home`, `About`, `Departments`, `Academics`, `Campus Life`, `Notices`), and navy blue pill `Contact` button.
   - **Hero Section**: Elegant display typography (*"Welcome to SKASC"*, *"Learn • Innovate • Excel"*, *"Empowering young minds with quality education..."*), *"Explore Our College →"* CTA button, carousel pagination dots with `<` and `>` controls, and the high-resolution SKASC building facade photo.
   - **About SKASC**: Underlined heading with *"Know More →"* button and 3 statistics badges (*25+ Years of Excellence*, *5K+ Happy Students*, *100% Placement Support*).
   - **Our Departments**: Horizontal department cards for **Computer Applications**, **Science**, **Mathematics**, **Commerce**, and **Arts**.
   - **Campus Life & Latest Notices**: Real student lawn study photo with dark blue callout overlay (*"Events, Clubs and Activities that inspire you"*), paired with official notices (*End Semester Exam Schedule Released*, *Cultural Fest – Zenith 2K26*, *Sports Meet Registrations Open*).
   - **Floating Chat Widget**: Glowing *"Chat with NEO Buddy"* badge and launcher at bottom-right.
   - **Footer**: Deep navy background with SKASC crest, quick links, social media icons, and calligraphy tagline: *"Dream Big... Achieve More..."*.

2. **NEO Buddy Dedicated Chat View (`media_1794979871012_161e52d1.jpg`)**:
   - **Luminous Navy Left Sidebar**: SKASC crest, active glowing pill for `Chat`, `Home` link, `Quick Links` (*Admissions*, *Departments*, *Exam Info*, *College Events*), and the glowing neon card *"Together Towards a Better Future"* with architectural building sketch.
   - **Top Bar**: *"← Back to Home"* navigation, theme toggle (Sun icon), and student profile avatar.
   - **Character Orb Header**: Concentric glowing blue backdrop with NEO Buddy's 3D character avatar and green online status dot, titled **"NEO Buddy - Your Campus Companion 💙"**.
   - **Welcome Message Bubble**: Exact welcome text and timestamp (*10:24 AM*).
   - **6 Quick Action Buttons**: *Admissions*, *Departments*, *Exam Information*, *College Events*, *Timetable*, *Campus Facilities*.
   - **Pill Input Container**: Paperclip attachment icon, input field, and circular dark blue paper plane send button.
   - **Audio Controls**: Microphone button for speech-to-text voice input and Speaker button for text-to-speech voice narration!

---

## 📋 SRS Functional Requirements Compliance Matrix

| ID | Requirement | Implementation Status |
| :--- | :--- | :--- |
| **FR-1** | Pages for Home, About, Courses, Admissions, Departments, Placements, Events, Contact | ✅ Complete with dedicated sections & interactive modals |
| **FR-2** | Floating chat widget appearing on every page | ✅ Implemented with glowing tooltip & circular launcher |
| **FR-3** | User types message, typing indicator, bot reply in same window | ✅ Real-time message stream with pulsating typing indicator |
| **FR-4** | Frontend sends message to Django API, never directly to Gemini | ✅ Strict client-to-Django architecture (`/api/chat/`) |
| **FR-5** | Backend calls Gemini with system prompt, college context, & history | ✅ `gemini_service.py` with injected `CollegeInfo` & last 10 messages |
| **FR-6** | Backend saves every user message & bot reply with session ID & timestamp | ✅ `ChatSession` and `ChatMessage` models in SQLite |
| **FR-7** | On reload, chat reloads session's previous messages | ✅ LocalStorage session persistence + `/api/chat/history/` |
| **FR-8** | User can start a new chat (new session) | ✅ `+ New Chat` button calling `/api/chat/new/` |
| **FR-9** | Bot answers ONLY college-related questions and politely declines others | ✅ Tested & verified against SRS Acceptance Examples |
| **FR-10**| Bot shall not reveal its identity, model or provider | ✅ Identifies strictly as SKASC's virtual assistant NEO Buddy |
| **FR-11**| Bot replies in warm, polite, cheerful persona | ✅ Warm tone with emojis and positive encouragement |
| **FR-12**| User can clear their own chat history | ✅ Clear History button calling `/api/chat/clear/` |
| **FR-13**| Admin edits college knowledge base & views chat logs | ✅ Django admin registered at `/admin/` |
| **FR-14**| Friendly fallback message if Gemini API fails or times out | ✅ Comprehensive local knowledge engine fallback |
| **FR-15**| Rate limit of 20 msgs/min per session & 500 chars per message | ✅ Enforced on backend with HTTP 400 & 429 status codes |

---

## 🚀 How to Run the Application

### 1. Launch the Server

Run the unified launcher from the project root:

```powershell
python run_server.py
```
*(Or double-click `start.bat` on Windows)*

### 2. Open the Website

Open your web browser and navigate to:
👉 **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

### 3. Access Admin Panel

To edit the knowledge base or inspect chat logs:
👉 **[http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)**
- **Username**: `admin`
- **Password**: `admin123`

---

## 📡 REST API Endpoints

- `POST /api/chat/` — Send a message `{ "session_id": "...", "message": "..." }`
- `GET  /api/chat/history/?session_id=<UUID>` — Retrieve session chat history
- `POST /api/chat/new/` — Initialize a new chat session with welcome greeting
- `DELETE /api/chat/clear/?session_id=<UUID>` — Clear conversation history
- `GET  /api/departments/` — List all academic departments and courses
- `GET  /api/notices/` — Fetch active notices and announcements
- `GET  /api/college-info/` — Access the complete college knowledge base
