import React from 'react';
import CrestLogo from './CrestLogo';

export default function Footer({ onNavigate, onOpenContactModal }) {
  return (
    <footer style={{ backgroundColor: '#070f2b', color: '#ffffff', padding: '40px 24px 30px' }}>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '30px',
        }}
        className="footer-content"
      >
        {/* Left: SKASC Crest */}
        <div style={{ cursor: 'pointer' }} onClick={() => onNavigate('home')}>
          <CrestLogo variant="white" size="normal" />
        </div>

        {/* Middle: Quick Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>
            Quick Links:
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#e2e8f0', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('home')} style={{ color: '#e2e8f0', fontSize: '13.5px' }}>Home</button>
            <span style={{ color: '#475569' }}>|</span>
            <button onClick={() => onNavigate('about')} style={{ color: '#e2e8f0', fontSize: '13.5px' }}>About</button>
            <span style={{ color: '#475569' }}>|</span>
            <button onClick={() => onNavigate('departments')} style={{ color: '#e2e8f0', fontSize: '13.5px' }}>Departments</button>
            <span style={{ color: '#475569' }}>|</span>
            <button onClick={() => onNavigate('academics')} style={{ color: '#e2e8f0', fontSize: '13.5px' }}>Academics</button>
            <span style={{ color: '#475569' }}>|</span>
            <button onClick={onOpenContactModal} style={{ color: '#e2e8f0', fontSize: '13.5px' }}>Contact</button>
          </div>
        </div>

        {/* Social Icons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>
            Follow Us:
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* YouTube */}
            <a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube" style={{ color: '#cbd5e1' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram" style={{ color: '#cbd5e1' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn" style={{ color: '#cbd5e1' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            {/* X / Twitter */}
            <a href="https://twitter.com" target="_blank" rel="noreferrer" title="X" style={{ color: '#cbd5e1' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Right Tagline strictly matching UI */}
        <div style={{ textAlign: 'right' }}>
          <p
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: '26px',
              color: '#f8fafc',
              letterSpacing: '0.5px',
              lineHeight: 1.2,
            }}
          >
            Dream Big...
          </p>
          <p
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: '28px',
              color: '#93c5fd',
              letterSpacing: '0.5px',
              lineHeight: 1.2,
            }}
          >
            Achieve More...
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1280px',
          margin: '24px auto 0',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          color: '#64748b',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <span>© 2026 Shree Kandhaswamy Arts & Science College (SKASC). All rights reserved.</span>
        <span>Powered by Gemini 3.5 Flash Core • Developed as per SRS Standards</span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
}
