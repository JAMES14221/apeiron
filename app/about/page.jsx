'use client';

import Link from 'next/link';

export default function AboutPage() {
  const pillars = [
    {
      symbol: '🌐',
      title: 'Democratizing Research',
      desc: 'Breaking the barriers of elite laboratories and exclusive institutions. Every curious student deserves the opportunity to formulate and publish rigorous scientific work.',
      color: '#00f0ff'
    },
    {
      symbol: '⚖️',
      title: 'Zero Fees & Open Access',
      desc: 'No submission fees, no APCs, no paywalled journals. All student publications and methodology guides are permanently free and open to everyone.',
      color: '#34d399'
    },
    {
      symbol: '🔬',
      title: 'Methodology & Ethics',
      desc: 'We cultivate proper research foundations: from hypothesis formulation and literature matrix design to ethical peer review and reproducible data analysis.',
      color: '#c084fc'
    },
    {
      symbol: '🤝',
      title: 'Interdisciplinary Guild',
      desc: 'Connecting young researchers across Natural Sciences, AI & Computing, Chronobiology, Behavioral Psychology, and Environmental Ecology.',
      color: '#fbbf24'
    }
  ];

  const milestones = [
    {
      year: 'Vision',
      title: 'The Seed Idea',
      desc: 'Founded on the conviction that high-impact scientific inquiry shouldn’t be limited by age, geography, or institutional privilege.'
    },
    {
      year: 'Method',
      title: 'Methodology First',
      desc: 'Developing open frameworks to guide high school and undergraduate researchers through literature review, empirical design, and academic ethics.'
    },
    {
      year: 'Community',
      title: 'Research Ecosystem',
      desc: 'Curating student manuscripts, hosting symposiums, and building mentorship networks between young scholars and academic mentors.'
    }
  ];

  return (
    <div className="about-page-container" style={{ minHeight: '100vh', padding: '40px 24px 100px 24px' }}>
      {/* About Hero Header */}
      <header style={{ maxWidth: '980px', margin: '0 auto 60px auto', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 18px',
          borderRadius: '999px',
          background: 'rgba(0, 240, 255, 0.08)',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          color: '#00f0ff',
          fontSize: '0.8rem',
          letterSpacing: '2px',
          fontWeight: '700',
          textTransform: 'uppercase',
          marginBottom: '20px'
        }}>
          ✦ ABOUT APERIO RESEARCH ✦
        </div>

        <h1 style={{
          fontFamily: 'var(--font-serif, serif)',
          fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
          fontWeight: '700',
          color: '#ffffff',
          letterSpacing: '2px',
          lineHeight: '1.15',
          margin: '0 0 20px 0',
          textShadow: '0 4px 30px rgba(0, 0, 0, 0.7)'
        }}>
          Democratizing Scientific Inquiry
        </h1>

        <p style={{
          color: '#94a3b8',
          fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
          lineHeight: '1.8',
          maxWidth: '720px',
          margin: '0 auto'
        }}>
          A student-initiated research platform designed to cultivate genuine scientific curiosity,
          equip students with rigorous methodology, and illuminate the frontiers of youth scholarship.
        </p>
      </header>

      {/* Core Mission & Story Dossier */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 80px auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        <div style={{
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          borderRadius: '24px',
          padding: '40px 32px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ color: '#00f0ff', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
            — OUR STORY —
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.85rem', color: '#ffffff', margin: '0 0 16px 0' }}>
            About Aperio
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.98rem', lineHeight: '1.8', margin: '0 0 16px 0' }}>
            Aperio Research was born from a simple yet radical realization: immense intellectual curiosity exists within students, yet traditional scientific publishing and mentorship remain gatekept by elite laboratories, expensive fees, and restrictive access.
          </p>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.8', margin: 0 }}>
            We serve as a springboard where young thinkers learn to transform raw questions into disciplined research, undergo constructive peer review, and publish their findings for the world to explore freely.
          </p>
        </div>

        <div style={{
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '40px 32px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
            — OUR PURPOSE —
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.85rem', color: '#ffffff', margin: '0 0 16px 0' }}>
            Our Mission
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              'Open the entry point for students beyond elite schools and specialized labs.',
              'Provide free workshops on research methods, scientific writing, and academic ethics.',
              'Build a thriving student research community where selected works inspire and educate others.',
              'Ensure total accessibility: no submission fees, no publication charges, ever.'
            ].map((item, idx) => (
              <li key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6' }}>
                <span style={{ color: '#00f0ff', fontSize: '1.1rem', lineHeight: '1.2' }}>◈</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Core Pillars Grid */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 80px auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div style={{ color: '#00f0ff', fontSize: '0.82rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
            — GUIDING VALUES —
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.2rem', color: '#ffffff', margin: 0 }}>
            Pillars of Aperio
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {pillars.map((p, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(15, 23, 42, 0.55)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '18px',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ fontSize: '2.2rem', color: p.color }}>{p.symbol}</div>
              <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>
                {p.title}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.7', margin: 0 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Evolution Journey */}
      <section style={{ maxWidth: '980px', margin: '0 auto 90px auto', padding: '40px 32px', borderRadius: '24px', background: 'rgba(6, 16, 38, 0.75)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2rem', color: '#ffffff', margin: '0 0 10px 0' }}>
            Our Evolution
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
            From an embryonic idea to an open intellectual sanctuary.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {milestones.map((m, idx) => (
            <div key={idx} style={{ padding: '20px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ color: '#00f0ff', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
                {m.year}
              </div>
              <h4 style={{ color: '#ffffff', fontSize: '1.1rem', margin: '0 0 8px 0' }}>{m.title}</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section style={{ maxWidth: '980px', margin: '0 auto 80px auto', textAlign: 'center', padding: '48px 32px', borderRadius: '24px', background: 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.12) 0%, rgba(15, 23, 42, 0.7) 70%)', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
        <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.2rem', color: '#ffffff', margin: '0 0 14px 0' }}>
          Ready to Begin Your Inquiry?
        </h2>
        <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 28px auto', lineHeight: '1.7' }}>
          Submit your proposal, read peer publications, or connect with academic mentors in our guild.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="https://forms.gle/F9evDGJCJm1P4XRz5"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '12px 30px',
              borderRadius: '999px',
              background: '#00f0ff',
              color: '#020612',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '0.92rem',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)'
            }}
          >
            Apply / Submit Research
          </a>
          <Link
            href="/research"
            style={{
              padding: '12px 30px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.92rem'
            }}
          >
            Browse Archive
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <h3>Contact Us</h3>
          <div className="footer-links-row">
            <div className="footer-item">
              <span>Fanpage:</span>
              <a href="https://www.facebook.com/profile.php?id=61593208479696" target="_blank" rel="noopener noreferrer" className="footer-icon-link" aria-label="Facebook Fanpage">
                <svg className="footer-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
            <div className="footer-item">
              <span>Apply Research:</span>
              <a href="https://forms.gle/F9evDGJCJm1P4XRz5" target="_blank" rel="noopener noreferrer" className="footer-icon-link" aria-label="Apply Research">
                <svg className="footer-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
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
