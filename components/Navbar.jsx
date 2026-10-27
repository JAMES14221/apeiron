'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AmbientSound from './AmbientSound';
import SpotlightSearch from './SpotlightSearch';

export default function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isHome = pathname === '/' || pathname === '/index.html' || pathname === '';
  const isAbout = pathname?.startsWith('/about');
  const isResearch = pathname?.startsWith('/research');
  const isConnect = pathname?.startsWith('/connect');

  return (
    <>
      <nav className="site-nav">
        <div className="nav-brand-group">
          <Link href="/" className="nav-brand-logo" aria-label="Aperio Research Home">
            <img src="/logo.png" alt="Aperio Logo" className="nav-logo-img" width="40" height="40" />
            <span className="nav-brand-text">APERIO</span>
          </Link>
        </div>

        <ul className="nav-links">
          <li><Link href="/" className={isHome ? 'active' : ''}>HOME</Link></li>
          <li><Link href="/about" className={isAbout ? 'active' : ''}>ABOUT</Link></li>
          <li><Link href="/research" className={isResearch ? 'active' : ''}>RESEARCH</Link></li>
          <li><Link href="/connect" className={isConnect ? 'active' : ''}>CONNECT</Link></li>
        </ul>

        <div className="nav-right-actions">
          {/* Atmospheric Audio Synthesizer */}
          <AmbientSound />

          {/* Spotlight Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="nav-search-btn"
            aria-label="Search Aperio (Space)"
            title="Search Aperio (Press Space)"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>Search</span>
            <kbd style={{
              fontSize: '0.68rem',
              padding: '2px 6px',
              borderRadius: '4px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#94a3b8'
            }}>Space</kbd>
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

      {/* Spotlight Search Modal */}
      <SpotlightSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
