import React, { useState } from 'react';
import { Phone, Mail, Search, ChevronDown, Menu, X, ExternalLink, User } from 'lucide-react';
import CrestLogo from './CrestLogo';

export default function Navbar({ onNavigate, currentPage, onOpenErpModal, onOpenContactModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { 
      id: 'about', 
      label: 'About', 
      hasDropdown: true,
      items: ['Our Legacy (25+ Years)', 'Vision & Mission', 'Principal Message', 'Accreditations & NAAC A+'] 
    },
    { 
      id: 'departments', 
      label: 'Departments', 
      hasDropdown: true,
      items: ['Computer Applications', 'Science', 'Mathematics', 'Commerce', 'Arts & Humanities'] 
    },
    { 
      id: 'academics', 
      label: 'Academics', 
      hasDropdown: true,
      items: ['Undergraduate Programs', 'Postgraduate Programs', 'Academic Calendar', 'Syllabus & Regulations'] 
    },
    { 
      id: 'campus-life', 
      label: 'Campus Life', 
      hasDropdown: true,
      items: ['Student Clubs & Fests', 'Sports & Gymnasium', 'Hostel & Dining', 'Central Digital Library'] 
    },
    { id: 'notices', label: 'Notices' },
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
      {/* Top Banner (Dark Navy) */}
      <div
        style={{
          backgroundColor: '#0a1435',
          color: '#ffffff',
          fontSize: '12.5px',
          padding: '6px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        {/* Left contacts */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <a
            href="tel:+914222679901"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e2e8f0', opacity: 0.9 }}
          >
            <Phone size={13} color="#93c5fd" />
            <span>+91 422 2679 901</span>
          </a>
          <a
            href="mailto:info@skasc.ac.in"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e2e8f0', opacity: 0.9 }}
          >
            <Mail size={13} color="#93c5fd" />
            <span>info@skasc.ac.in</span>
          </a>
        </div>

        {/* Right Portal & Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <button
            onClick={onOpenErpModal}
            style={{
              color: '#ffffff',
              fontSize: '12.5px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255,255,255,0.1)',
              padding: '3px 10px',
              borderRadius: '6px',
              transition: 'background 0.2s',
            }}
          >
            <User size={12} color="#93c5fd" />
            <span>Student Portal | ERP Login</span>
          </button>

          <button
            title="Search SKASC"
            style={{ color: '#ffffff', display: 'flex', alignItems: 'center', opacity: 0.85 }}
          >
            <Search size={15} />
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* SKASC Logo */}
        <div
          onClick={() => onNavigate('home')}
          style={{ cursor: 'pointer' }}
        >
          <CrestLogo variant="dark" size="normal" />
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '28px', '@media (min-width: 900px)': { display: 'flex' } }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <div
                key={link.id}
                style={{ position: 'relative' }}
                onMouseEnter={() => link.hasDropdown && setDropdownOpen(link.id)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <button
                  onClick={() => onNavigate(link.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '14.5px',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#0d1f51' : '#334155',
                    padding: '8px 4px',
                    borderBottom: isActive ? '2px solid #1d4ed8' : '2px solid transparent',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && <ChevronDown size={14} color="#64748b" />}
                </button>

                {/* Dropdown Menu */}
                {link.hasDropdown && dropdownOpen === link.id && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      backgroundColor: '#ffffff',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      padding: '8px 0',
                      minWidth: '220px',
                      border: '1px solid #f1f5f9',
                      zIndex: 100,
                    }}
                  >
                    {link.items.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          onNavigate(link.id);
                          setDropdownOpen(null);
                        }}
                        style={{
                          padding: '8px 16px',
                          fontSize: '13.5px',
                          color: '#334155',
                          cursor: 'pointer',
                          transition: 'background 0.15s, color 0.15s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f0f7ff';
                          e.currentTarget.style.color = '#1d4ed8';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#334155';
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Contact Navy Pill Button */}
          <button
            onClick={onOpenContactModal}
            style={{
              backgroundColor: '#0d1f51',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 600,
              padding: '8px 24px',
              borderRadius: '24px',
              transition: 'background-color 0.2s, transform 0.15s',
              boxShadow: '0 2px 6px rgba(13, 31, 81, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1d4ed8';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#0d1f51';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Contact
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-toggle"
          style={{ color: '#0d1f51', padding: '6px' }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderTop: '1px solid #e2e8f0',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              style={{
                textAlign: 'left',
                fontSize: '15px',
                fontWeight: currentPage === link.id ? 700 : 500,
                color: currentPage === link.id ? '#1d4ed8' : '#334155',
                padding: '8px 0',
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onOpenContactModal();
              setMobileMenuOpen(false);
            }}
            style={{
              backgroundColor: '#0d1f51',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 600,
              padding: '10px 20px',
              borderRadius: '20px',
              marginTop: '6px',
            }}
          >
            Contact Us
          </button>
        </div>
      )}

      {/* Responsive CSS for desktop-nav */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
