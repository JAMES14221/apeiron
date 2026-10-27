'use client';

import Link from 'next/link';
import HeroCanvas from '../components/HeroCanvas';
import FeaturedShowcase from '../components/FeaturedShowcase';

export default function HomePage() {
  const metrics = [
    { value: '32+', label: 'Scholars & Mentors' },
    { value: '7', label: 'Research Tracks' },
    { value: '100%', label: 'Student-Driven' },
    { value: '0 VND', label: 'Free & Open Access' }
  ];

  const domains = [
    {
      symbol: '⚛',
      title: 'Natural Sciences',
      desc: 'Physics, chemistry, and biology inquiries delving into the mechanics of the natural universe.',
      color: '#38bdf8'
    },
    {
      symbol: '🧠',
      title: 'Cognitive & Behavioral',
      desc: 'Psychology, social dynamics, and neuroscientific inquiry in modern youth culture.',
      color: '#c084fc'
    },
    {
      symbol: '⚡',
      title: 'Computing & Tech',
      desc: 'Algorithmic systems, AI applications, and computational models for real-world impact.',
      color: '#00f0ff'
    },
    {
      symbol: '🌿',
      title: 'Environmental Ecology',
      desc: 'Biodiversity conservation, climate resilience, and sustainable development.',
      color: '#34d399'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Spark & Formulate',
      desc: 'Identify meaningful questions and structure raw curiosities into rigorous hypotheses.'
    },
    {
      num: '02',
      title: 'Methodology & Data',
      desc: 'Design experiments, gather ethical data, and apply sound statistical principles.'
    },
    {
      num: '03',
      title: 'Review & Refine',
      desc: 'Collaborate with scholar peers and mentors to elevate clarity and intellectual depth.'
    },
    {
      num: '04',
      title: 'Open Dissemination',
      desc: 'Share verified discoveries freely to inspire students and future researchers worldwide.'
    }
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-container">
      {/* Authentic Lightweight Hero with scoped canvas */}
      <header
        className="hero"
        id="hero"
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '60px 24px 30px 24px',
          background: 'radial-gradient(ellipse at 50% 25%, #0a1b38 0%, #020612 80%)'
        }}
      >
        <HeroCanvas />

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '980px',
          margin: 'auto',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          
          {/* Pulsating Beacon Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 22px',
            borderRadius: '999px',
            background: 'rgba(0, 240, 255, 0.08)',
            border: '1px solid rgba(0, 240, 255, 0.35)',
            color: '#00f0ff',
            fontSize: '0.82rem',
            letterSpacing: '2px',
            fontWeight: '600',
            textTransform: 'uppercase',
            marginBottom: '28px',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.15)'
          }}>
            <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 10px #00f0ff' }}></span>
            <span>SCIENCE BUILDS A BRIGHTER TOMORROW</span>
            <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 10px #00f0ff' }}></span>
          </div>

          {/* Main Title with Celestial Glow */}
          <h1 style={{
            fontFamily: 'var(--font-serif, serif)',
            fontSize: 'clamp(3rem, 7.5vw, 5.8rem)',
            fontWeight: '700',
            letterSpacing: '4px',
            lineHeight: '1.08',
            color: '#ffffff',
            margin: '0 0 24px 0',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.7), 0 0 50px rgba(56, 189, 248, 0.4)'
          }}>
            APERIO RESEARCH
          </h1>

          {/* Subtitle */}
          <p style={{
            color: '#94a3b8',
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            lineHeight: '1.8',
            maxWidth: '720px',
            margin: '0 0 40px 0'
          }}>
            Democratizing the scientific research experience for students beyond elite institutions.
            Cultivating genuine academic curiosity, methodology, and verified student-led publications.
          </p>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '50px' }}>
            <Link
              href="/about"
              className="hero-explore-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 34px',
                borderRadius: '999px',
                background: 'rgba(6, 16, 38, 0.92)',
                border: '1px solid rgba(0, 240, 255, 0.55)',
                boxShadow: '0 0 30px rgba(0, 240, 255, 0.35)',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '0.92rem',
                letterSpacing: '1.5px',
                fontWeight: '600',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              <span>ABOUT APERIO</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>

            <a
              href="https://forms.gle/F9evDGJCJm1P4XRz5"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 34px',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '0.92rem',
                letterSpacing: '1px',
                fontWeight: '500'
              }}
            >
              <span>APPLY RESEARCH</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '24px',
            width: '100%',
            maxWidth: '840px',
            padding: '24px 32px',
            borderRadius: '20px',
            background: 'rgba(10, 18, 38, 0.92)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5)'
          }}>
            {metrics.map((m, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-serif, serif)',
                  fontSize: '1.9rem',
                  fontWeight: '700',
                  color: '#00f0ff',
                  letterSpacing: '1px',
                  marginBottom: '4px'
                }}>
                  {m.value}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Scroll Indicator bouncing to featured section */}
        <div
          onClick={() => scrollToSection('featured')}
          style={{
            position: 'relative',
            zIndex: 10,
            cursor: 'pointer',
            padding: '10px',
            color: '#38bdf8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            opacity: 0.85
          }}
          title="Explore Featured Publications"
        >
          <span style={{ fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase' }}>EXPLORE</span>
          <span className="scroll-indicator-arrow" style={{ fontSize: '1.4rem', lineHeight: '1' }}>⌄</span>
        </div>
      </header>

      {/* Featured Explorations Showcase (Interactive Carousel & Reader) */}
      <div id="featured" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(10, 30, 68, 0.3) 0%, transparent 70%)' }}>
        <FeaturedShowcase />
      </div>

      {/* Research Domains Section */}
      <section style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '60px 24px 80px 24px',
        position: 'relative'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', color: '#00f0ff', fontSize: '0.82rem', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
            — RESEARCH FRONTIERS —
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.4rem', color: '#ffffff', letterSpacing: '2px', margin: 0 }}>
            Inquiry Domains
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {domains.map((d, i) => (
            <div
              key={i}
              className="cyber-card"
              style={{
                background: 'rgba(10, 18, 38, 0.90)',
                border: '1px solid rgba(56, 189, 248, 0.16)',
                borderRadius: '16px',
                padding: '32px 24px',
                cursor: 'default'
              }}
            >
              <div style={{ fontSize: '2.2rem', marginBottom: '16px', color: d.color }}>{d.symbol}</div>
              <h3 style={{ color: '#ffffff', fontSize: '1.25rem', margin: '0 0 10px 0', fontFamily: 'var(--font-serif, serif)' }}>
                {d.title}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: '1.7', margin: 0 }}>
                {d.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Research Journey Process */}
      <section style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '20px 24px 100px 24px',
        background: 'radial-gradient(ellipse at 80% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 60%)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', color: '#38bdf8', fontSize: '0.82rem', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
            — THE METHODOLOGY —
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.4rem', color: '#ffffff', letterSpacing: '2px', margin: 0 }}>
            Student Research Pathway
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="cyber-card"
              style={{
                background: 'rgba(10, 18, 38, 0.88)',
                border: '1px solid rgba(0, 240, 255, 0.14)',
                borderRadius: '14px',
                padding: '28px 20px',
                position: 'relative'
              }}
            >
              <div style={{ color: '#00f0ff', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '12px' }}>
                STEP {s.num}
              </div>
              <h4 style={{ color: '#ffffff', fontSize: '1.1rem', margin: '0 0 8px 0' }}>{s.title}</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <h3>Contact Us</h3>
          <div className="footer-links-row">
            <div className="footer-item">
              <span>Fanpage:</span>
              <a
                href="https://www.facebook.com/profile.php?id=61593208479696"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-link"
                aria-label="Facebook Fanpage"
              >
                <svg className="footer-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
            <div className="footer-item">
              <span>Apply Research:</span>
              <a
                href="https://forms.gle/F9evDGJCJm1P4XRz5"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-link"
                aria-label="Apply Research"
              >
                <svg className="footer-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </a>
            </div>
          </div>
          <p className="footer-contact-info">Phone: 090 934 8508 | Email: aperio.res@gmail.com</p>
          <p className="footer-copyright">© 2026 AperioResearch. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
