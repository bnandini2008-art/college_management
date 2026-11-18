import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSection({ onExplore, onOpenAdmissions }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      welcome: "Welcome to",
      title: "SKASC",
      motto: "Learn • Innovate • Excel",
      desc: "Empowering young minds with quality education, modern infrastructure and holistic development.",
      badge: "NAAC 'A+' Grade Autonomous Institution",
    },
    {
      welcome: "Excellence in",
      title: "ACADEMICS",
      motto: "Knowledge • Discovery • Leadership",
      desc: "Offering world-class degree programs with modern laboratory facilities and industry tie-ups.",
      badge: "Affiliated to Bharathiar University",
    },
    {
      welcome: "Shape Your",
      title: "CAREER",
      motto: "100% Placement Support",
      desc: "Top recruiters including TCS, Infosys, Zoho, Cognizant, and Deloitte actively recruit our graduates.",
      badge: "Highest CTC: ₹14.5 LPA",
    }
  ];

  const slide = slides[currentSlide];

  return (
    <section
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #f0f6ff 0%, #e2ecfd 60%, #ebf2fe 100%)',
        padding: '50px 24px 60px',
        overflow: 'hidden',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      {/* Decorative subtle wavy lines in background matching reference image */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.5,
        }}
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 120 C 320 180, 720 40, 1440 220 L 1440 600 L 0 600 Z"
          fill="rgba(255, 255, 255, 0.45)"
        />
        <path
          d="M0 240 C 480 320, 960 120, 1440 280 L 1440 600 L 0 600 Z"
          fill="rgba(255, 255, 255, 0.65)"
        />
      </svg>

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.05fr 1fr',
          gap: '40px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
        className="hero-grid"
      >
        {/* Left Column: Text Content strictly matching UI */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '28px',
              fontWeight: 600,
              color: '#1e293b',
              marginBottom: '-6px',
              fontStyle: 'italic',
            }}
          >
            {slide.welcome}
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(52px, 7vw, 76px)',
              fontWeight: 800,
              color: '#0b1d4d',
              letterSpacing: '-1.5px',
              lineHeight: 1.05,
              marginBottom: '12px',
            }}
          >
            {slide.title}
          </h1>

          <p
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#0f172a',
              letterSpacing: '0.4px',
              marginBottom: '14px',
            }}
          >
            {slide.motto}
          </p>

          <p
            style={{
              fontSize: '15.5px',
              color: '#475569',
              maxWidth: '480px',
              lineHeight: 1.6,
              marginBottom: '28px',
            }}
          >
            {slide.desc}
          </p>

          {/* Explore Our College Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <button
              onClick={onExplore}
              style={{
                backgroundColor: '#0b1d4d',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: 600,
                padding: '12px 28px',
                borderRadius: '30px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 14px rgba(11, 29, 77, 0.25)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0b1d4d';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Explore Our College</span>
              <ArrowRight size={17} />
            </button>

            <button
              onClick={onOpenAdmissions}
              style={{
                backgroundColor: '#ffffff',
                color: '#0b1d4d',
                fontSize: '14.5px',
                fontWeight: 600,
                padding: '11px 22px',
                borderRadius: '30px',
                border: '1.5px solid #cbd5e1',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1d4ed8';
                e.currentTarget.style.color = '#1d4ed8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.color = '#0b1d4d';
              }}
            >
              Admissions 2026-27
            </button>
          </div>

          {/* Carousel dots and arrow controls matching reference */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* 3 Pagination dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  style={{
                    width: idx === currentSlide ? '10px' : '8px',
                    height: idx === currentSlide ? '10px' : '8px',
                    borderRadius: '50%',
                    backgroundColor: idx === currentSlide ? '#0b1d4d' : '#94a3b8',
                    opacity: idx === currentSlide ? 1 : 0.45,
                    transition: 'all 0.2s',
                  }}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Carousel navigation arrows < and > */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  color: '#0b1d4d',
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  color: '#0b1d4d',
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: High Quality Building Photo strictly matching UI */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 16px 35px rgba(11, 29, 77, 0.15)',
              border: '4px solid #ffffff',
              height: '340px',
              background: '#0d1f51',
            }}
          >
            {/* Cropped Campus photo directly from reference image */}
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: "url('/assets/home_ui_reference.jpg')",
                backgroundSize: '215%',
                backgroundPosition: '98% 18%',
                backgroundRepeat: 'no-repeat',
              }}
            />

            {/* Subtle overlay gradient at the bottom */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '80px',
                background: 'linear-gradient(to top, rgba(11, 29, 77, 0.4), transparent)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Floating Campus Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '-14px',
              right: '24px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '8px 16px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 8px #10b981',
              }}
            />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#0b1d4d' }}>
              Campus Open • Admissions Active
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 868px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>
    </section>
  );
}
