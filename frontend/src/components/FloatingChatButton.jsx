import React from 'react';
import { Bot, MessageCircle } from 'lucide-react';

export default function FloatingChatButton({ onClick }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px',
      }}
    >
      {/* Tooltip Badge matching reference image strictly */}
      <div
        onClick={onClick}
        style={{
          backgroundColor: '#070f2b',
          color: '#ffffff',
          fontSize: '12px',
          fontWeight: 600,
          padding: '6px 14px',
          borderRadius: '16px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          border: '1px solid rgba(59, 130, 246, 0.4)',
          position: 'relative',
        }}
      >
        <span>Chat with</span>
        <span style={{ color: '#60a5fa', fontWeight: 700 }}>NEO Buddy</span>
        {/* Tiny pointer triangle */}
        <div
          style={{
            position: 'absolute',
            bottom: '-5px',
            right: '24px',
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid #070f2b',
          }}
        />
      </div>

      {/* Circular Floating Chat Launcher */}
      <button
        onClick={onClick}
        aria-label="Open NEO Buddy Chat"
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#0b1d4d',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 25px rgba(11, 29, 77, 0.4), 0 0 15px rgba(59, 130, 246, 0.5)',
          border: '2.5px solid rgba(147, 197, 253, 0.8)',
          cursor: 'pointer',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          padding: 0,
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08) translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(11, 29, 77, 0.5), 0 0 25px rgba(59, 130, 246, 0.8)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(11, 29, 77, 0.4), 0 0 15px rgba(59, 130, 246, 0.5)';
        }}
      >
        <img
          src="/assets/neo_buddy_avatar.png"
          alt="NEO Buddy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </button>
    </div>
  );
}
