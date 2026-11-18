import React from 'react';
import { Monitor, Atom, Calculator, Briefcase, Palette, ArrowRight } from 'lucide-react';

export default function DepartmentsSection({ onSelectDepartment, onViewAll }) {
  const departments = [
    {
      id: 'CA',
      name: 'Computer Applications',
      icon: <Monitor size={28} color="#0b1d4d" />,
      desc: 'BCA, B.Sc CS, B.Sc AI & Data Science, MCA with cloud & GPU computing labs.',
      count: '4 Programs',
    },
    {
      id: 'SCI',
      name: 'Science',
      icon: <Atom size={28} color="#0b1d4d" />,
      desc: 'B.Sc Biotechnology, Microbiology, Physics & Chemistry with research facilities.',
      count: '5 Programs',
    },
    {
      id: 'MATH',
      name: 'Mathematics',
      icon: <Calculator size={28} color="#0b1d4d" />,
      desc: 'Pure & Applied Mathematics, Statistics, Data Modeling & M.Sc programs.',
      count: '3 Programs',
    },
    {
      id: 'COMM',
      name: 'Commerce',
      icon: <Briefcase size={28} color="#0b1d4d" />,
      desc: 'B.Com General, Computer Applications, Professional Accounting & M.Com.',
      count: '4 Programs',
    },
    {
      id: 'ARTS',
      name: 'Arts',
      icon: <Palette size={28} color="#0b1d4d" />,
      desc: 'B.A. English Literature, Economics, and M.A. English with Digital Language Lab.',
      count: '3 Programs',
    },
  ];

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '60px 24px', borderBottom: '1px solid #f1f5f9' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section Header strictly matching reference UI */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
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
                Our Departments
              </h2>
            </div>
            <p style={{ fontSize: '15px', color: '#475569' }}>
              Explore a wide range of academic departments
            </p>
          </div>

          <button
            onClick={onViewAll}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14.5px',
              fontWeight: 600,
              color: '#0b1d4d',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#1d4ed8')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#0b1d4d')}
          >
            <span>View All Departments</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* 5 Departments Row Cards strictly matching reference UI */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '18px',
          }}
          className="dept-grid"
        >
          {departments.map((dept) => (
            <div
              key={dept.id}
              onClick={() => onSelectDepartment(dept)}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '30px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#93c5fd';
                e.currentTarget.style.boxShadow = '0 10px 24px rgba(37, 99, 235, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)';
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '12px',
                  backgroundColor: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  transition: 'background-color 0.2s',
                }}
              >
                {dept.icon}
              </div>

              <h3
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#0b1d4d',
                  marginBottom: '6px',
                  lineHeight: 1.3,
                }}
              >
                {dept.name}
              </h3>

              <span
                style={{
                  fontSize: '12px',
                  color: '#64748b',
                  fontWeight: 500,
                }}
              >
                {dept.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .dept-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .dept-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
