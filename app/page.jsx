'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="home-hero-wrap" style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
      <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(0, 240, 255, 0.1)', border: '1px solid rgba(0, 240, 255, 0.3)', color: '#00f0ff', fontSize: '0.82rem', letterSpacing: '1.5px', marginBottom: '24px' }}>
        <span>✦</span> DEMOCRATIZING RESEARCH <span>✦</span>
      </div>
      <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#ffffff', letterSpacing: '3px', margin: '0 0 20px 0', textShadow: '0 0 35px rgba(0, 240, 255, 0.45)' }}>
        APERIO RESEARCH
      </h1>
      <p style={{ maxWidth: '680px', color: '#94a3b8', fontSize: '1.15rem', lineHeight: '1.8', margin: '0 0 36px 0' }}>
        Empowering students beyond elite laboratories to investigate, formulate, and publish high-impact scientific inquiry.
      </p>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/about" className="nav-explore-btn" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
          <span>MEET OUR TEAM</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
        <a href="https://forms.gle/F9evDGJCJm1P4XRz5" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', borderRadius: '999px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#ffffff', textDecoration: 'none', fontSize: '0.95rem', letterSpacing: '1px' }}>
          <span>APPLY RESEARCH</span>
        </a>
      </div>
    </div>
  );
}
