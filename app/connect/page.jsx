'use client';

import Link from 'next/link';

export default function ConnectPage() {
  const channels = [
    {
      icon: '📝',
      title: 'Apply / Submit Research',
      desc: 'Submit your manuscript, ongoing inquiry, or project proposal to be reviewed by our academic mentors.',
      linkText: 'Open Application Form',
      linkUrl: 'https://forms.gle/F9evDGJCJm1P4XRz5',
      primary: true
    },
    {
      icon: '🌐',
      title: 'Official Community Fanpage',
      desc: 'Follow updates, symposiums, student spotlight articles, and announcements on our active community page.',
      linkText: 'Visit Facebook Fanpage',
      linkUrl: 'https://www.facebook.com/profile.php?id=61593208479696',
      primary: false
    },
    {
      icon: '🔬',
      title: 'Academic Mentorship Guild',
      desc: 'Are you an experienced researcher or undergraduate interested in guiding student inquiry? Join our mentor network.',
      linkText: 'Connect with Mentors',
      linkUrl: 'mailto:aperio.res@gmail.com?subject=Mentorship%20Inquiry',
      primary: false
    },
    {
      icon: '🤝',
      title: 'Institutional Partnerships',
      desc: 'Collaborate with high schools, youth labs, and educational organizations to democratize scientific opportunities.',
      linkText: 'Partner with Us',
      linkUrl: 'mailto:aperio.res@gmail.com?subject=Partnership%20Proposal',
      primary: false
    }
  ];

  return (
    <div className="connect-page-container" style={{ minHeight: '100vh', padding: '40px 24px 100px 24px' }}>
      {/* Hero Header */}
      <header style={{ maxWidth: '960px', margin: '0 auto 60px auto', textAlign: 'center' }}>
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
          ✦ CONNECT &amp; COLLABORATE ✦
        </div>

        <h1 style={{
          fontFamily: 'var(--font-serif, serif)',
          fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
          fontWeight: '700',
          color: '#ffffff',
          letterSpacing: '2px',
          margin: '0 0 16px 0',
          textShadow: '0 2px 20px rgba(0, 0, 0, 0.7)'
        }}>
          Join The Inquiry
        </h1>

        <p style={{
          color: '#94a3b8',
          fontSize: '1.05rem',
          lineHeight: '1.8',
          maxWidth: '680px',
          margin: '0 auto'
        }}>
          Whether you are a student researcher with a spark of curiosity, a prospective mentor, or a school partner, we welcome your voice.
        </p>
      </header>

      {/* Channels Grid */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {channels.map((ch, idx) => (
          <div
            key={idx}
            className="cyber-card"
            style={{
              background: 'rgba(10, 18, 38, 0.92)',
              border: ch.primary ? '1px solid rgba(0, 240, 255, 0.45)' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: ch.primary ? '0 0 30px rgba(0, 240, 255, 0.15)' : 'none',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}
          >
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{ch.icon}</div>
              <h2 style={{
                fontFamily: 'var(--font-serif, serif)',
                fontSize: '1.35rem',
                color: '#ffffff',
                fontWeight: '700',
                margin: '0 0 12px 0'
              }}>
                {ch.title}
              </h2>
              <p style={{
                color: '#94a3b8',
                fontSize: '0.92rem',
                lineHeight: '1.7',
                margin: '0 0 24px 0'
              }}>
                {ch.desc}
              </p>
            </div>

            <a
              href={ch.linkUrl}
              target={ch.linkUrl.startsWith('http') ? '_blank' : undefined}
              rel={ch.linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '999px',
                background: ch.primary ? '#00f0ff' : 'rgba(255, 255, 255, 0.06)',
                color: ch.primary ? '#020612' : '#ffffff',
                border: ch.primary ? 'none' : '1px solid rgba(255, 255, 255, 0.18)',
                fontWeight: '700',
                fontSize: '0.88rem',
                letterSpacing: '0.5px',
                textDecoration: 'none',
                boxShadow: ch.primary ? '0 0 18px rgba(0, 240, 255, 0.35)' : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              <span>{ch.linkText}</span>
              <span>&rarr;</span>
            </a>
          </div>
        ))}
      </main>

      {/* Direct Contact Card */}
      <section style={{ maxWidth: '800px', margin: '60px auto 0 auto', padding: '36px', borderRadius: '20px', background: 'rgba(6, 16, 38, 0.8)', border: '1px solid rgba(56, 189, 248, 0.25)', textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.5rem', color: '#ffffff', margin: '0 0 12px 0' }}>
          Direct Inquiries &amp; Press
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: '0 0 20px 0' }}>
          Have general inquiries or interested in an academic spotlight? Reach out directly to our communications secretariat.
        </p>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', color: '#00f0ff', fontSize: '0.95rem', fontWeight: '600' }}>
          <span>📧 aperio.res@gmail.com</span>
          <span>📞 090 934 8508</span>
          <span>📍 Ho Chi Minh City, Vietnam</span>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ marginTop: '80px' }}>
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
