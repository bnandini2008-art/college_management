import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Sun, 
  Moon, 
  User, 
  MessageSquare, 
  Home, 
  GraduationCap, 
  Landmark, 
  Calendar, 
  Clock, 
  MapPin, 
  Paperclip, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  BookOpen,
  Sparkles,
  Building
} from 'lucide-react';
import CrestLogo from './CrestLogo';

export default function NeoBuddyChatPage({ onBackToHome, onNavigateSection }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState('chat');
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initial greeting matching reference UI image
  const defaultGreeting = {
    role: 'assistant',
    content: `Hey, Student! 👋\nWelcome to SKASC!\nI'm NEO Buddy, your AI student companion.\n\nHow can I help you today?`,
    timestamp: '10:24 AM'
  };

  // Initialize or reload chat session (FR-6, FR-7, FR-8)
  useEffect(() => {
    const savedSessionId = localStorage.getItem('skasc_chat_session_id');
    if (savedSessionId) {
      setSessionId(savedSessionId);
      loadHistory(savedSessionId);
    } else {
      startNewSession();
    }

    // Setup speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const loadHistory = async (id) => {
    try {
      const res = await fetch(`/api/chat/history/?session_id=${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages);
        } else {
          setMessages([defaultGreeting]);
        }
      } else {
        setMessages([defaultGreeting]);
      }
    } catch (err) {
      console.warn("Could not load history, using default greeting:", err);
      setMessages([defaultGreeting]);
    }
  };

  const startNewSession = async () => {
    try {
      const res = await fetch('/api/chat/new/', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setSessionId(data.session_id);
        localStorage.setItem('skasc_chat_session_id', data.session_id);
        setMessages([{
          role: 'assistant',
          content: data.greeting || defaultGreeting.content,
          timestamp: data.timestamp || defaultGreeting.timestamp
        }]);
      } else {
        fallbackNewSession();
      }
    } catch (err) {
      fallbackNewSession();
    }
  };

  const fallbackNewSession = () => {
    const newId = 'session-' + Date.now();
    setSessionId(newId);
    localStorage.setItem('skasc_chat_session_id', newId);
    setMessages([defaultGreeting]);
  };

  const clearHistory = async () => {
    if (!sessionId) return;
    try {
      await fetch(`/api/chat/clear/?session_id=${sessionId}`, { method: 'DELETE' });
    } catch (e) {
      console.warn(e);
    }
    setMessages([defaultGreeting]);
  };

  const handleSendMessage = async (textToSend = null) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { role: 'user', content: text, timestamp: currentTime };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          message: text,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.session_id && data.session_id !== sessionId) {
          setSessionId(data.session_id);
          localStorage.setItem('skasc_chat_session_id', data.session_id);
        }

        const botReply = {
          role: 'assistant',
          content: data.reply,
          timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, botReply]);

        // Text-to-speech if enabled
        if (isSpeakingEnabled && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const cleanText = data.reply.replace(/[*#_~]/g, '');
          const utterance = new SpeechSynthesisUtterance(cleanText);
          utterance.rate = 1.05;
          window.speechSynthesis.speak(utterance);
        }
      } else {
        const errData = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: errData.error || "I'm having a brief connection hitch! 💙 Please ask me again or call +91 422 2679 901.",
            timestamp: currentTime,
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having a brief connection hitch! 💙 Please ask me again or call +91 422 2679 901.",
          timestamp: currentTime,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceToggle = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  // Quick Action cards strictly matching UI Image 1
  const quickActions = [
    { label: 'Admissions', icon: <GraduationCap size={22} color="#1d4ed8" />, query: 'Tell me about SKASC admissions, eligibility, and the application process for 2026-2027.' },
    { label: 'Departments', icon: <BookOpen size={22} color="#1d4ed8" />, query: 'What academic departments and degree programs are available at SKASC?' },
    { label: 'Exam Information', icon: <Calendar size={22} color="#1d4ed8" />, query: 'What is the latest exam schedule and end-semester examination details?' },
    { label: 'College Events', icon: <Calendar size={22} color="#1d4ed8" />, query: 'Tell me about upcoming college events, Zenith 2K26 cultural fest, and sports meet.' },
    { label: 'Timetable', icon: <Clock size={22} color="#1d4ed8" />, query: 'What are the college class timings and academic shift timetables?' },
    { label: 'Campus Facilities', icon: <MapPin size={22} color="#1d4ed8" />, query: 'What campus facilities, digital libraries, and sports infrastructure does SKASC have?' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        backgroundColor: isDarkMode ? '#0a0f1d' : '#f0f5ff',
        color: isDarkMode ? '#f8fafc' : '#0f172a',
        overflow: 'hidden',
        fontFamily: 'var(--font-main)',
      }}
    >
      {/* 1. Left Sidebar strictly matching Image 1 */}
      <aside
        style={{
          width: '240px',
          backgroundColor: '#070f2b',
          borderRight: '1px solid rgba(59, 130, 246, 0.25)',
          boxShadow: '4px 0 25px rgba(11, 29, 77, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '28px 16px',
          flexShrink: 0,
          zIndex: 20,
        }}
        className="chat-sidebar"
      >
        <div>
          {/* SKASC Logo & Crest at top of sidebar */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              marginBottom: '32px',
              cursor: 'pointer',
            }}
            onClick={onBackToHome}
          >
            <CrestLogo variant="white" size="large" showText={false} />
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '22px',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '1.5px',
                marginTop: '6px',
              }}
            >
              SKASC
            </span>
          </div>

          {/* Navigation Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Chat (Active Glowing Pill) */}
            <button
              onClick={() => setSelectedTopic('chat')}
              className="chat-nav-pill-active"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 18px',
                width: '100%',
                fontSize: '14.5px',
                fontWeight: 600,
              }}
            >
              <MessageSquare size={18} />
              <span>Chat</span>
            </button>

            {/* Home link */}
            <button
              onClick={onBackToHome}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 18px',
                width: '100%',
                fontSize: '14.5px',
                fontWeight: 500,
                color: '#94a3b8',
                borderRadius: '12px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Home size={18} />
              <span>Home</span>
            </button>

            {/* Quick Links Header */}
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#64748b',
                letterSpacing: '0.6px',
                padding: '16px 18px 4px',
              }}
            >
              Quick Links
            </div>

            {/* Admissions */}
            <button
              onClick={() => handleSendMessage('Tell me about SKASC Admissions and eligibility.')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 18px',
                width: '100%',
                fontSize: '13.5px',
                fontWeight: 500,
                color: '#cbd5e1',
                borderRadius: '10px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#60a5fa';
                e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#cbd5e1';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <GraduationCap size={16} />
              <span>Admissions</span>
            </button>

            {/* Departments */}
            <button
              onClick={() => handleSendMessage('What departments and courses does SKASC have?')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 18px',
                width: '100%',
                fontSize: '13.5px',
                fontWeight: 500,
                color: '#cbd5e1',
                borderRadius: '10px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#60a5fa';
                e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#cbd5e1';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Landmark size={16} />
              <span>Departments</span>
            </button>

            {/* Exam Info */}
            <button
              onClick={() => handleSendMessage('What are the upcoming exam dates and timetables?')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 18px',
                width: '100%',
                fontSize: '13.5px',
                fontWeight: 500,
                color: '#cbd5e1',
                borderRadius: '10px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#60a5fa';
                e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#cbd5e1';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Calendar size={16} />
              <span>Exam Info</span>
            </button>

            {/* College Events */}
            <button
              onClick={() => handleSendMessage('What college events and cultural fests are happening?')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 18px',
                width: '100%',
                fontSize: '13.5px',
                fontWeight: 500,
                color: '#cbd5e1',
                borderRadius: '10px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#60a5fa';
                e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#cbd5e1';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Sparkles size={16} />
              <span>College Events</span>
            </button>
          </div>
        </div>

        {/* Bottom Glowing Card strictly matching UI Image 1 */}
        <div
          className="future-card-glow"
          style={{
            borderRadius: '18px',
            padding: '16px 14px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: '19px',
              color: '#ffffff',
              lineHeight: 1.2,
              marginBottom: '10px',
              textShadow: '0 0 10px rgba(96, 165, 250, 0.5)',
            }}
          >
            Together<br />
            Towards a<br />
            Better Future
          </p>

          {/* Architectural campus building illustration sketch */}
          <div
            style={{
              width: '100%',
              height: '75px',
              opacity: 0.85,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <svg viewBox="0 0 160 80" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 75 L150 75" stroke="#60a5fa" strokeWidth="1.5" />
              {/* Main Building Frame */}
              <rect x="25" y="25" width="110" height="50" stroke="#93c5fd" strokeWidth="1.5" fill="rgba(147, 197, 253, 0.05)" />
              {/* Classical Pillars */}
              <line x1="40" y1="25" x2="40" y2="75" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 2" />
              <line x1="55" y1="25" x2="55" y2="75" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 2" />
              <line x1="70" y1="25" x2="70" y2="75" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 2" />
              <line x1="90" y1="25" x2="90" y2="75" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 2" />
              <line x1="105" y1="25" x2="105" y2="75" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 2" />
              <line x1="120" y1="25" x2="120" y2="75" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 2" />
              {/* Pediment / Roof */}
              <polygon points="20,25 80,8 140,25" stroke="#60a5fa" strokeWidth="1.5" fill="rgba(96, 165, 250, 0.1)" />
              {/* Dome */}
              <path d="M68 8 C68 2 92 2 92 8 Z" stroke="#93c5fa" strokeWidth="1.5" fill="#3b82f6" />
              {/* Windows */}
              <rect x="44" y="35" width="8" height="12" stroke="#60a5fa" strokeWidth="1" />
              <rect x="74" y="35" width="12" height="18" stroke="#60a5fa" strokeWidth="1" />
              <rect x="108" y="35" width="8" height="12" stroke="#60a5fa" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </aside>

      {/* 2. Main Chat Area */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
          background: isDarkMode 
            ? 'linear-gradient(135deg, #090e1f 0%, #0d1633 100%)' 
            : 'linear-gradient(135deg, #f0f6ff 0%, #e2ecfd 60%, #ebf2fe 100%)',
        }}
      >
        {/* Soft flowing blue wave backdrop matching Image 1 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            opacity: isDarkMode ? 0.2 : 0.65,
            zIndex: 1,
          }}
        >
          <svg viewBox="0 0 1000 800" width="100%" height="100%" preserveAspectRatio="none">
            <path
              d="M0,0 C300,100 600,50 1000,180 L1000,0 Z"
              fill="rgba(219, 234, 254, 0.5)"
            />
            <path
              d="M0,300 C400,200 700,450 1000,320 L1000,800 L0,800 Z"
              fill="rgba(239, 246, 255, 0.6)"
            />
          </svg>
        </div>

        {/* Top Header Bar strictly matching Image 1 */}
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 28px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Back to Home Button */}
          <button
            onClick={onBackToHome}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14.5px',
              fontWeight: 600,
              color: isDarkMode ? '#cbd5e1' : '#1e293b',
              padding: '6px 12px',
              borderRadius: '20px',
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              transition: 'all 0.2s',
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>

          {/* Right Action Icons: Sun/Theme toggle & Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isDarkMode ? '#f8fafc' : '#0b1d4d',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              }}
            >
              {isDarkMode ? <Sun size={18} /> : <Sun size={18} />}
            </button>

            <button
              title="Student Profile"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isDarkMode ? '#f8fafc' : '#0b1d4d',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              }}
            >
              <User size={18} />
            </button>
          </div>
        </header>

        {/* Scrollable Chat Content Area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '10px 28px 20px',
            position: 'relative',
            zIndex: 10,
            maxWidth: '860px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          {/* NEO Buddy Header with 3D Character Avatar strictly matching Image 1 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              marginBottom: '28px',
              paddingLeft: '10px',
            }}
          >
            {/* Avatar Orb with Concentric Glow and Green Dot */}
            <div style={{ position: 'relative' }}>
              {/* Outer soft blue glowing ring */}
              <div
                style={{
                  width: '136px',
                  height: '136px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(147, 197, 253, 0.5) 0%, rgba(191, 219, 254, 0.2) 65%, transparent 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Crystal clear high-resolution NEO Buddy Avatar */}
                <img
                  src="/assets/neo_buddy_avatar.png"
                  alt="NEO Buddy Profile"
                  style={{
                    width: '106px',
                    height: '106px',
                    borderRadius: '50%',
                    border: '3px solid #ffffff',
                    boxShadow: '0 8px 24px rgba(37, 99, 235, 0.25)',
                    backgroundColor: '#ffffff',
                    display: 'block',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Green Active Dot strictly matching Image 1 */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '14px',
                  right: '14px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                  border: '3px solid #ffffff',
                  boxShadow: '0 0 10px rgba(34, 197, 94, 0.8)',
                }}
              />
            </div>

            {/* Buddy Title & Subtitle */}
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-main)',
                  fontSize: '34px',
                  fontWeight: 800,
                  color: isDarkMode ? '#ffffff' : '#0b1d4d',
                  lineHeight: 1.1,
                  letterSpacing: '-0.5px',
                  marginBottom: '4px',
                }}
              >
                NEO Buddy
              </h1>
              <p
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: isDarkMode ? '#93c5fd' : '#1e3a8a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>Your Campus Companion</span>
                <span>💙</span>
              </p>
            </div>
          </div>

          {/* Conversation History / Message Stream */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isUser ? 'flex-end' : 'flex-start',
                    maxWidth: '100%',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '82%',
                      padding: '18px 22px',
                      borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                      backgroundColor: isUser
                        ? '#0b1d4d'
                        : isDarkMode ? '#1e293b' : '#ffffff',
                      color: isUser
                        ? '#ffffff'
                        : isDarkMode ? '#f8fafc' : '#0f172a',
                      boxShadow: isUser
                        ? '0 4px 14px rgba(11, 29, 77, 0.25)'
                        : '0 4px 18px rgba(0, 0, 0, 0.05)',
                      border: isUser
                        ? 'none'
                        : isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #f1f5f9',
                      fontSize: '15px',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {msg.content}

                    {/* Timestamp strictly matching UI bubble */}
                    <div
                      style={{
                        textAlign: 'right',
                        fontSize: '11px',
                        color: isUser ? '#93c5fd' : '#94a3b8',
                        marginTop: '8px',
                        fontWeight: 500,
                      }}
                    >
                      {msg.timestamp || '10:24 AM'}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator (FR-3) */}
            {isLoading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 18px', backgroundColor: '#ffffff', borderRadius: '20px', width: 'fit-content', boxShadow: '0 4px 14px rgba(0,0,0,0.04)' }}>
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
                <span style={{ fontSize: '13px', color: '#64748b', marginLeft: '6px' }}>NEO Buddy is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 6 Quick Action Cards strictly matching Image 1 */}
          {messages.length <= 2 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '14px',
                marginBottom: '24px',
              }}
              className="quick-actions-grid"
            >
              {quickActions.map((qa, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(qa.query)}
                  className="quick-action-btn"
                  style={{
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '18px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    textAlign: 'center',
                  }}
                >
                  <div>{qa.icon}</div>
                  <span
                    style={{
                      fontSize: '13.5px',
                      fontWeight: 700,
                      color: isDarkMode ? '#ffffff' : '#0b1d4d',
                    }}
                  >
                    {qa.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. Bottom Input Bar strictly matching Image 1 */}
        <div
          style={{
            padding: '12px 28px 24px',
            position: 'relative',
            zIndex: 20,
            maxWidth: '860px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          {/* Pill Container */}
          <div
            style={{
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
              borderRadius: '32px',
              padding: '6px 10px 6px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 6px 24px rgba(11, 29, 77, 0.08)',
              border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
            }}
          >
            {/* Attachment Paperclip Icon */}
            <button
              title="Attach Document"
              style={{ color: '#94a3b8', display: 'flex', alignItems: 'center' }}
              onClick={() => alert("Document upload module: You can upload syllabus or exam queries.")}
            >
              <Paperclip size={19} />
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about SKASC..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '15px',
                color: isDarkMode ? '#ffffff' : '#0f172a',
                backgroundColor: 'transparent',
                fontFamily: 'inherit',
              }}
            />

            {/* Circular Navy Send Button strictly matching Image 1 */}
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputText.trim()}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#0b1d4d',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                opacity: inputText.trim() ? 1 : 0.65,
                boxShadow: '0 2px 8px rgba(11, 29, 77, 0.3)',
              }}
            >
              <Send size={18} style={{ transform: 'translateX(1px)' }} />
            </button>
          </div>

          {/* Under-bar controls strictly matching UI Image 1: Mic and Speaker buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '12px',
              padding: '0 8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Mic button strictly matching UI */}
              <button
                onClick={handleVoiceToggle}
                title={isListening ? 'Stop Listening' : 'Voice Input'}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: isListening ? '#ef4444' : isDarkMode ? '#1e293b' : '#ffffff',
                  color: isListening ? '#ffffff' : '#0b1d4d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                  transition: 'all 0.2s',
                }}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>

              {/* Speaker button strictly matching UI */}
              <button
                onClick={() => setIsSpeakingEnabled(!isSpeakingEnabled)}
                title={isSpeakingEnabled ? 'Voice Output ON' : 'Voice Output Muted'}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                  color: isSpeakingEnabled ? '#2563eb' : '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                  transition: 'all 0.2s',
                }}
              >
                {isSpeakingEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
            </div>

            {/* Clear History & New Chat Buttons (FR-8, FR-12) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={clearHistory}
                style={{
                  fontSize: '12.5px',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 8px',
                  borderRadius: '6px',
                }}
                title="Clear current conversation"
              >
                <RotateCcw size={13} />
                <span>Clear History</span>
              </button>

              <button
                onClick={startNewSession}
                style={{
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: '#1d4ed8',
                  backgroundColor: 'rgba(37, 99, 235, 0.08)',
                  padding: '4px 10px',
                  borderRadius: '12px',
                }}
              >
                + New Chat
              </button>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .chat-sidebar {
            display: none !important;
          }
          .quick-actions-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
