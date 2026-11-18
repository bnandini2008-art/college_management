import React, { useState } from 'react';
import { X, CheckCircle, Phone, Mail, MapPin, Building, Calendar, Users, ExternalLink } from 'lucide-react';
import CrestLogo from './CrestLogo';

export function ErpModal({ isOpen, onClose }) {
  const [role, setRole] = useState('student');
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (regNo && password) {
      setIsLoggedIn(true);
      setTimeout(() => {
        setIsLoggedIn(false);
        onClose();
        alert(`Welcome back to SKASC ERP Portal!`);
      }, 1200);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 15, 43, 0.75)',
        backdropFilter: 'blur(5px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '440px',
          padding: '32px 28px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', color: '#64748b' }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-block', marginBottom: '8px' }}>
            <CrestLogo variant="dark" size="small" showText={false} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 800, color: '#0b1d4d' }}>
            SKASC ERP Portal
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Student Attendance, Marks, Fees & Timetables
          </p>
        </div>

        {/* Role Switcher */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', background: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
          {['student', 'staff', 'parent'].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              style={{
                flex: 1,
                padding: '8px 0',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                textTransform: 'capitalize',
                backgroundColor: role === r ? '#0b1d4d' : 'transparent',
                color: role === r ? '#ffffff' : '#475569',
                transition: 'all 0.2s',
              }}
            >
              {r}
            </button>
          ))}
        </div>

        {isLoggedIn ? (
          <div style={{ textAlign: 'center', padding: '30px 0', color: '#10b981' }}>
            <CheckCircle size={48} style={{ margin: '0 auto 12px' }} />
            <p style={{ fontSize: '16px', fontWeight: 600, color: '#0b1d4d' }}>Login Successful!</p>
            <p style={{ fontSize: '13px', color: '#64748b' }}>Redirecting to student dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                {role === 'student' ? 'Registration / Roll Number' : 'Staff Employee ID'}
              </label>
              <input
                type="text"
                required
                placeholder={role === 'student' ? 'e.g. 24BCA101' : 'e.g. EMP402'}
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                Password / DOB
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#1d4ed8' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked /> Remember Me
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Please contact SKASC ERP Admin: erp@skasc.ac.in"); }}>Forgot Password?</a>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#0b1d4d',
                color: '#ffffff',
                padding: '12px',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '14.5px',
                marginTop: '8px',
                boxShadow: '0 4px 12px rgba(11, 29, 77, 0.2)',
              }}
            >
              Sign In to ERP
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function DepartmentDetailModal({ department, isOpen, onClose, onAskNeoBuddy }) {
  if (!isOpen || !department) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 15, 43, 0.75)',
        backdropFilter: 'blur(5px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '560px',
          padding: '32px 28px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', color: '#64748b' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#e0ecff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {department.icon}
          </div>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase' }}>
              Dept Code: {department.id}
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 800, color: '#0b1d4d' }}>
              {department.name}
            </h2>
          </div>
        </div>

        <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
          {department.desc}
        </p>

        <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0b1d4d', marginBottom: '8px' }}>
            Degrees & Programs Offered:
          </h4>
          <ul style={{ fontSize: '14px', color: '#334155', paddingLeft: '20px', lineHeight: 1.6 }}>
            {department.id === 'CA' && (
              <>
                <li>BCA (Bachelor of Computer Applications - 3 Years)</li>
                <li>B.Sc Computer Science (Cloud Computing & Cyber Security)</li>
                <li>B.Sc Artificial Intelligence & Data Science</li>
                <li>MCA (Master of Computer Applications - 2 Years)</li>
              </>
            )}
            {department.id === 'SCI' && (
              <>
                <li>B.Sc Biotechnology (Molecular Biology Lab Access)</li>
                <li>B.Sc Microbiology (Bio-Safety Level 2 Facility)</li>
                <li>B.Sc Physics (Optics & Solid State Physics)</li>
                <li>B.Sc Chemistry (Organic & Analytical Labs)</li>
              </>
            )}
            {department.id === 'MATH' && (
              <>
                <li>B.Sc Mathematics with Computer Applications</li>
                <li>M.Sc Mathematics (Applied Topology & Fluid Dynamics)</li>
                <li>Certificate Course in Statistical Machine Learning</li>
              </>
            )}
            {department.id === 'COMM' && (
              <>
                <li>B.Com (General) - Auditing & Corporate Law</li>
                <li>B.Com (Computer Applications) - ERP & Tally Prime</li>
                <li>B.Com (Professional Accounting) - CA/CMA Foundation</li>
                <li>M.Com (Banking, Insurance & Financial Markets)</li>
              </>
            )}
            {department.id === 'ARTS' && (
              <>
                <li>B.A. English Literature (Digital Language Lab)</li>
                <li>B.A. Economics (Econometrics & Public Policy)</li>
                <li>M.A. English & Comparative Literature</li>
              </>
            )}
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => {
              onClose();
              onAskNeoBuddy(`Tell me in detail about the Department of ${department.name} at SKASC.`);
            }}
            style={{
              flex: 1,
              backgroundColor: '#0b1d4d',
              color: '#ffffff',
              padding: '12px',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <span>Ask NEO Buddy About This Dept</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function ContactModal({ isOpen, onClose, onAskNeoBuddy }) {
  const [submitted, setSubmitted] = useState(false);
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 15, 43, 0.75)',
        backdropFilter: 'blur(5px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '520px',
          padding: '32px 28px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', color: '#64748b' }}
        >
          <X size={20} />
        </button>

        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 800, color: '#0b1d4d', marginBottom: '8px' }}>
          Contact SKASC
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
          Shree Kandhaswamy Arts & Science College, Coimbatore
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#1e293b' }}>
            <Phone size={18} color="#1d4ed8" />
            <span>+91 422 2679 901 / +91 422 2679 902</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#1e293b' }}>
            <Mail size={18} color="#1d4ed8" />
            <span>info@skasc.ac.in | admissions@skasc.ac.in</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: '#1e293b' }}>
            <MapPin size={18} color="#1d4ed8" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>SKASC Campus, Coimbatore - 641 008, Tamil Nadu, India</span>
          </div>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#ecfdf5', borderRadius: '12px', color: '#065f46' }}>
            <CheckCircle size={32} style={{ margin: '0 auto 8px' }} />
            <p style={{ fontWeight: 600 }}>Thank you for reaching out!</p>
            <p style={{ fontSize: '13px' }}>Our admissions office will get in touch with you shortly.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <input
              type="text"
              required
              placeholder="Your Full Name"
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
            />
            <textarea
              required
              rows={3}
              placeholder="Your Enquiry / Message"
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '14px', resize: 'none' }}
            />
            <button
              type="submit"
              style={{ backgroundColor: '#0b1d4d', color: '#ffffff', padding: '12px', borderRadius: '8px', fontWeight: 600, fontSize: '14px' }}
            >
              Send Enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function NoticeDetailModal({ notice, isOpen, onClose }) {
  if (!isOpen || !notice) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 15, 43, 0.75)',
        backdropFilter: 'blur(5px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '500px',
          padding: '28px 24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', color: '#64748b' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Calendar size={16} color="#1d4ed8" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#1d4ed8' }}>{notice.date}, 2026</span>
          <span style={{ fontSize: '12px', backgroundColor: '#e2e8f0', padding: '2px 8px', borderRadius: '4px', color: '#334155' }}>
            {notice.category}
          </span>
        </div>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: '#0b1d4d', marginBottom: '12px' }}>
          {notice.title}
        </h3>

        <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>
          {notice.desc}
        </p>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            backgroundColor: '#0b1d4d',
            color: '#ffffff',
            padding: '10px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '14px',
          }}
        >
          Close Notice
        </button>
      </div>
    </div>
  );
}
