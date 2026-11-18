import React from 'react';
import { Megaphone, ArrowRight, Calendar } from 'lucide-react';

export default function CampusLifeAndNotices({ onExploreCampusLife, onSelectNotice, onViewAllNotices }) {
  const notices = [
    {
      date: 'Nov 17',
      title: 'End Semester Exam Schedule Released',
      category: 'Examinations',
      desc: 'The complete schedule for Odd Semester November/December 2026 UG/PG theory and lab examinations has been released on the Student Portal.'
    },
    {
      date: 'Nov 14',
      title: 'Cultural Fest – Zenith 2K26',
      category: 'Events',
      desc: 'Annual mega inter-collegiate cultural fiesta Zenith 2K26 registrations are live! Dance, music, dramatics, fashion, and photography competitions.'
    },
    {
      date: 'Nov 10',
      title: 'Sports Meet Registrations Open',
      category: 'Sports',
      desc: 'Intra-college athletics and games tournament registrations are now open for track & field, basketball, badminton, cricket and football.'
    },
  ];

  return (
    <section style={{ backgroundColor: '#f8fafc', padding: '60px 24px', borderBottom: '1px solid #e2e8f0' }}>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.25fr 1fr',
          gap: '24px',
          alignItems: 'stretch',
        }}
        className="bottom-grid"
      >
        {/* Left Card: Campus Life strictly matching UI */}
        <div
          onClick={onExploreCampusLife}
          style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
            cursor: 'pointer',
            minHeight: '260px',
            display: 'flex',
            border: '1px solid #e2e8f0',
            backgroundColor: '#0a1435',
          }}
          className="campus-life-card"
        >
          {/* Real students photo cropped from home_ui_reference.jpg */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '60%',
              height: '100%',
              backgroundImage: "url('/assets/home_ui_reference.jpg')",
              backgroundSize: '240%',
              backgroundPosition: '14% 96%',
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* Deep blue gradient card over right half */}
          <div
            style={{
              position: 'relative',
              marginLeft: '45%',
              width: '55%',
              background: 'linear-gradient(135deg, rgba(8, 20, 58, 0.96) 0%, rgba(13, 31, 81, 0.98) 100%)',
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              color: '#ffffff',
              zIndex: 2,
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '26px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '8px',
              }}
            >
              Campus Life
            </h3>

            <p
              style={{
                fontSize: '14px',
                color: '#cbd5e1',
                lineHeight: 1.5,
                marginBottom: '20px',
              }}
            >
              Events, Clubs and Activities that inspire you.
            </p>

            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#93c5fd',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'gap 0.2s',
              }}
            >
              <span>— Explore More</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Right Card: Latest Notices strictly matching UI */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '24px 28px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              borderBottom: '1px solid #f1f5f9',
              paddingBottom: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Megaphone size={20} color="#0b1d4d" />
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0b1d4d',
                }}
              >
                Latest Notices
              </h3>
            </div>

            <button
              onClick={onViewAllNotices}
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#0b1d4d',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Notices list strictly matching reference */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {notices.map((notice, idx) => (
              <div
                key={idx}
                onClick={() => onSelectNotice(notice)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '8px 4px',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  transition: 'background-color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div
                  style={{
                    fontSize: '13.5px',
                    fontWeight: 700,
                    color: '#0b1d4d',
                    whiteSpace: 'nowrap',
                    minWidth: '60px',
                  }}
                >
                  {notice.date}
                </div>
                <div style={{ color: '#cbd5e1' }}>|</div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#1e293b',
                    lineHeight: 1.4,
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#1d4ed8')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#1e293b')}
                >
                  {notice.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .bottom-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
