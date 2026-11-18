import React from 'react';

export default function CrestLogo({ variant = 'dark', size = 'normal', showText = true }) {
  const isWhite = variant === 'white';
  const primaryColor = isWhite ? '#ffffff' : '#0b1d4d';
  const accentColor = isWhite ? '#93c5fd' : '#2563eb';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {/* SVG Emblem matching the SKASC crest */}
      <svg
        width={size === 'large' ? 48 : size === 'small' ? 32 : 40}
        height={size === 'large' ? 48 : size === 'small' ? 32 : 40}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shield Frame */}
        <path
          d="M50 8 C68 8 85 16 88 32 C88 56 68 82 50 92 C32 82 12 56 12 32 C15 16 32 8 50 8 Z"
          stroke={primaryColor}
          strokeWidth="3.5"
          fill={isWhite ? 'rgba(255, 255, 255, 0.05)' : 'rgba(37, 99, 235, 0.04)'}
        />
        {/* Inner Laurel / Flourish */}
        <path
          d="M50 14 C64 14 78 21 80 34 C80 52 64 74 50 82 C36 74 20 52 20 34 C22 21 36 14 50 14 Z"
          stroke={accentColor}
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
        {/* Flaming Torch */}
        <path
          d="M50 20 Q54 28 50 36 Q46 28 50 20 Z"
          fill="#f59e0b"
        />
        <path
          d="M50 24 Q52 29 50 34 Q48 29 50 24 Z"
          fill="#fef08a"
        />
        <line x1="50" y1="36" x2="50" y2="44" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" />
        
        {/* Open Book */}
        <path
          d="M32 48 C40 45 48 46 50 49 C52 46 60 45 68 48 L68 64 C60 61 52 62 50 65 C48 62 40 61 32 64 Z"
          fill={isWhite ? 'rgba(255, 255, 255, 0.9)' : '#ffffff'}
          stroke={primaryColor}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Book Spine Center Line */}
        <line x1="50" y1="49" x2="50" y2="65" stroke={primaryColor} strokeWidth="2" />
        {/* Book Page Lines */}
        <line x1="36" y1="53" x2="46" y2="52" stroke={accentColor} strokeWidth="1" />
        <line x1="36" y1="57" x2="46" y2="56" stroke={accentColor} strokeWidth="1" />
        <line x1="54" y1="52" x2="64" y2="53" stroke={accentColor} strokeWidth="1" />
        <line x1="54" y1="56" x2="64" y2="57" stroke={accentColor} strokeWidth="1" />

        {/* Small Ribbon / Base */}
        <path
          d="M30 70 Q50 75 70 70 L66 76 Q50 80 34 76 Z"
          fill={primaryColor}
        />
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 800,
              fontSize: size === 'large' ? '24px' : '20px',
              letterSpacing: '1px',
              color: primaryColor,
              lineHeight: 1.1,
            }}
          >
            SKASC
          </span>
          <span
            style={{
              fontSize: size === 'large' ? '12px' : '10.5px',
              fontWeight: 500,
              color: isWhite ? '#cbd5e1' : '#4b5563',
              letterSpacing: '0.2px',
              lineHeight: 1.2,
            }}
          >
            Shree Kandhaswamy Arts & Science College
          </span>
        </div>
      )}
    </div>
  );
}
