'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="site-nav">
      <div className="nav-brand-group">
        <Link href="/" className="nav-brand-logo" aria-label="Aperio Research Home">
          <img src="/logo.png" alt="Aperio Logo" className="nav-logo-img" width="40" height="40" />
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
