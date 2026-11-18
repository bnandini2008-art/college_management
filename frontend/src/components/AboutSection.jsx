import React from 'react';
import { ArrowRight, GraduationCap, Users, Trophy } from 'lucide-react';

export default function AboutSection({ onKnowMore }) {
  const stats = [
    {
      icon: <GraduationCap size={28} color="#0b1d4d" />,
      value: "25+",
      label: "Years of Excellence",
    },
    {
      icon: <Users size={28} color="#0b1d4d" />,
      value: "5K+",
      label: "Happy Students",
    },
    {
      icon: <Trophy size={28} color="#0b1d4d" />,
      value: "100%",
      label: "Placement Support",
    },
  ];

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '60px 24px', borderBottom: '1px solid #f1f5f9' }}>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: '48px',
          alignItems: 'center',
        }}
        className="about-grid"
      >
        {/* Left column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '28px', height: '3px', backgroundColor: '#1d4ed8', borderRadius: '2px' }} />
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '32px',
                fontWeight: 700,
                color: '#0b1d4d',
                letterSpacing: '-0.5px',
              }}
            >
              About SKASC
            </h2>
          </div>

          <p
            style={{
              fontSize: '16px',
              color: '#334155',
              lineHeight: 1.6,
              marginBottom: '24px',
              maxWidth: '460px',
            }}
          >
            SKASC is a premier institution committed to academic excellence, innovation and value-based education.
          </p>

          <button
            onClick={onKnowMore}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1.5px solid #0b1d4d',
              padding: '10px 24px',
              borderRadius: '24px',
              fontSize: '14.5px',
              fontWeight: 600,
              color: '#0b1d4d',
              backgroundColor: 'transparent',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0b1d4d';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#0b1d4d';
            }}
          >
            <span>Know More</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Right column: 3 Stats Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}
          className="stats-grid"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '24px 16px',
                borderRadius: '16px',
                backgroundColor: '#ffffff',
                border: '1px solid #eef2f6',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(11, 29, 77, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.03)';
              }}
            >
              <div style={{ marginBottom: '12px' }}>
                {stat.icon}
              </div>
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#0b1d4d',
                  lineHeight: 1.1,
                  marginBottom: '4px',
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: '13.5px',
                  fontWeight: 500,
                  color: '#475569',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 868px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 600px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
