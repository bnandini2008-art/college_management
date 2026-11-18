import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import DepartmentsSection from './components/DepartmentsSection';
import CampusLifeAndNotices from './components/CampusLifeAndNotices';
import Footer from './components/Footer';
import FloatingChatButton from './components/FloatingChatButton';
import NeoBuddyChatPage from './components/NeoBuddyChatPage';
import { ErpModal, DepartmentDetailModal, ContactModal, NoticeDetailModal } from './components/Modals';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'chat'
  const [erpModalOpen, setErpModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [prefilledChatQuery, setPrefilledChatQuery] = useState(null);

  // Switch to chat view with optional initial prompt
  const handleOpenChat = (query = null) => {
    setPrefilledChatQuery(query);
    setCurrentView('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {currentView === 'chat' ? (
        // Dedicated NEO Buddy Chat View strictly matching Image 1
        <NeoBuddyChatPage
          onBackToHome={handleBackToHome}
          onNavigateSection={(sec) => {
            setCurrentView('home');
            setTimeout(() => {
              const el = document.getElementById(sec);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
        />
      ) : (
        // College Management Website strictly matching Image 2
        <>
          <Navbar
            onNavigate={(pageId) => {
              if (pageId === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else if (pageId === 'departments') {
                const el = document.getElementById('departments-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              } else if (pageId === 'about') {
                const el = document.getElementById('about-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              } else if (pageId === 'notices') {
                const el = document.getElementById('notices-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              } else if (pageId === 'campus-life') {
                const el = document.getElementById('notices-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              } else if (pageId === 'academics') {
                handleOpenChat('Tell me about Academic Programs and Curriculum at SKASC.');
              }
            }}
            currentPage="home"
            onOpenErpModal={() => setErpModalOpen(true)}
            onOpenContactModal={() => setContactModalOpen(true)}
          />

          <main style={{ flex: 1 }}>
            <HeroSection
              onExplore={() => {
                const el = document.getElementById('about-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenAdmissions={() => handleOpenChat('Tell me about Admissions 2026-2027 at SKASC.')}
            />

            <div id="about-section">
              <AboutSection
                onKnowMore={() => handleOpenChat('Give me a detailed overview of SKASC history, legacy, and accreditations.')}
              />
            </div>

            <div id="departments-section">
              <DepartmentsSection
                onSelectDepartment={(dept) => setSelectedDepartment(dept)}
                onViewAll={() => handleOpenChat('List all departments, degree programs, and courses offered at SKASC.')}
              />
            </div>

            <div id="notices-section">
              <CampusLifeAndNotices
                onExploreCampusLife={() => handleOpenChat('Tell me about campus life, clubs, sports facilities, and cultural fests at SKASC.')}
                onSelectNotice={(notice) => setSelectedNotice(notice)}
                onViewAllNotices={() => handleOpenChat('What are the latest announcements, examination schedules, and events at SKASC?')}
              />
            </div>
          </main>

          <Footer
            onNavigate={(pageId) => {
              if (pageId === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
              else if (pageId === 'departments') {
                const el = document.getElementById('departments-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              } else if (pageId === 'about') {
                const el = document.getElementById('about-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              } else {
                handleOpenChat(`Tell me about ${pageId} at SKASC.`);
              }
            }}
            onOpenContactModal={() => setContactModalOpen(true)}
          />

          {/* Floating Chat Launcher Button strictly matching reference image */}
          <FloatingChatButton onClick={() => handleOpenChat()} />
        </>
      )}

      {/* Interactive Modals */}
      <ErpModal
        isOpen={erpModalOpen}
        onClose={() => setErpModalOpen(false)}
      />

      <DepartmentDetailModal
        department={selectedDepartment}
        isOpen={!!selectedDepartment}
        onClose={() => setSelectedDepartment(null)}
        onAskNeoBuddy={(q) => handleOpenChat(q)}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        onAskNeoBuddy={(q) => handleOpenChat(q)}
      />

      <NoticeDetailModal
        notice={selectedNotice}
        isOpen={!!selectedNotice}
        onClose={() => setSelectedNotice(null)}
      />
    </div>
  );
}
