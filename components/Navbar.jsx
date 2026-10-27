'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="site-nav">
      <div className="nav-brand-group">
        <Link href="/" className="nav-brand-logo" aria-label="Aperio Research Home">
          <svg className="nav-logo-svg" viewBox="0 0 40 40" width="36" height="36">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f0ff" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <polygon points="20,2 38,34 2,34" fill="none" stroke="url(#logoGrad)" strokeWidth="2.5" />
            <circle cx="20" cy="22" r="5" fill="#00f0ff" opacity="0.85" />
            <line x1="20" y1="2" x2="20" y2="34" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="2,2" />
          </svg>
          <span className="nav-brand-text">APERIO</span>
        </Link>
      </div>

      <ul className="nav-links">
        <li><Link href="/">HOME</Link></li>
        <li><Link href="/about" className="active">ABOUT</Link></li>
        <li><Link href="/research">RESEARCH</Link></li>
        <li><Link href="/connect">CONNECT</Link></li>
      </ul>

      <div className="nav-right-actions">
        <button className="nav-search-btn" aria-label="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        <div className="nav-divider"></div>
        <a href="https://forms.gle/F9evDGJCJm1P4XRz5" target="_blank" rel="noopener noreferrer" className="nav-explore-btn">
          <span>APPLY</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </nav>
  );
}
