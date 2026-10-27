'use client';

import Link from 'next/link';

export default function HomePage() {
  const domains = [
    {
      symbol: '⚛',
      title: 'Natural Sciences',
      desc: 'Physics, chemistry, and biology inquiries delving into the mechanics of nature.',
      color: '#38bdf8'
    },
    {
      symbol: '🧠',
      title: 'Cognitive & Behavioral',
      desc: 'Psychology, social dynamics, and neuroscientific inquiry in youth culture.',
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

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero" id="hero">
        <div className="hero-floor-reflection"></div>
        <div className="hero-layout">
          <div className="hero-left">
            <div className="hero-tagline">
              <span className="hero-dash">—</span>
              <span>SCIENCE BUILDS A BRIGHTER TOMORROW</span>
            </div>
            <h1 className="hero-title">
              APERIO<br />
              <span className="hero-title-sub">RESEARCH</span>
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.8', maxWidth: '520px', margin: '20px 0 32px 0' }}>
              Democratizing the scientific research experience for students beyond elite institutions.
              Cultivating curiosity, methodology, and impactful publications.
            </p>
            <div className="hero-actions">
              <Link href="/about" className="hero-explore-btn">
                <span>MEET OUR TEAM</span>
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
                  padding: '12px 24px',
                  borderRadius: '999px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  letterSpacing: '1px',
                  fontWeight: '500'
                }}
              >
                <span>APPLY RESEARCH</span>
              </a>
            </div>
          </div>

          {/* Hero Emblem / Monument in Pure SVG */}
          <div className="hero-centerpiece" id="heroCenterpiece">
            <div className="monument-container" id="monumentContainer" style={{ position: 'relative', width: '340px', height: '340px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="orbit-ring orbit-ring-1"></div>
              <div className="orbit-ring orbit-ring-2"></div>
              <div className="orbit-ring orbit-ring-3"></div>

              {/* Pure SVG Monument Prism */}
              <div className="hero-monument-svg-wrap" style={{ position: 'relative', zIndex: 10, animation: 'floatBob 6s ease-in-out infinite' }}>
                <svg viewBox="0 0 240 280" width="220" height="260" style={{ filter: 'drop-shadow(0 0 35px rgba(0, 240, 255, 0.55)) drop-shadow(0 0 65px rgba(168, 85, 247, 0.4))' }}>
                  <defs>
                    <linearGradient id="heroPrismGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#818cf8" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0.95" />
                    </linearGradient>
                    <linearGradient id="heroInnerGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.25" />
                    </linearGradient>
                  </defs>

                  {/* Sacred Octahedron Silhouette */}
                  <polygon points="120,20 200,95 120,260 40,95" fill="url(#heroPrismGrad1)" stroke="#00f0ff" strokeWidth="2.2" />
                  <polygon points="120,20 120,260 40,95" fill="rgba(0, 240, 255, 0.32)" />
                  <polygon points="120,20 200,95 120,260" fill="rgba(192, 132, 252, 0.38)" />
                  <polygon points="120,55 170,110 120,225 70,110" fill="url(#heroInnerGrad)" opacity="0.65" />

                  {/* Core Energy Seam */}
                  <line x1="120" y1="20" x2="120" y2="260" stroke="#ffffff" strokeWidth="2.5" />
                  <line x1="40" y1="95" x2="200" y2="95" stroke="rgba(255,255,255,0.75)" strokeWidth="1.2" strokeDasharray="3,4" />

                  {/* Center Star Core */}
                  <circle cx="120" cy="110" r="8" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 10px #00f0ff)' }} />
                </svg>
              </div>

              <div className="spark-point sp-1">✦</div>
              <div className="spark-point sp-2">✦</div>
              <div className="spark-point sp-3">✦</div>
            </div>
          </div>
        </div>
      </header>

      {/* Research Domains Section */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', color: '#00f0ff', fontSize: '0.82rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
            — RESEARCH FRONTIERS —
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.5rem', color: '#ffffff', letterSpacing: '2px', margin: 0 }}>
            Inquiry Domains
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {domains.map((d, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(15, 23, 42, 0.65)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '32px 24px',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
                cursor: 'default'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '16px', color: d.color }}>{d.symbol}</div>
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
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px 100px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', color: '#38bdf8', fontSize: '0.82rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
            — THE METHODOLOGY —
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.5rem', color: '#ffffff', letterSpacing: '2px', margin: 0 }}>
            Student Research Pathway
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {steps.map((s, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(0, 240, 255, 0.12)',
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
