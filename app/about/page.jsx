'use client';

import { useState, useRef } from 'react';
import DepartmentSelector from '../../components/DepartmentSelector';
import TarotStage from '../../components/TarotStage';
import EasterEggPlayer from '../../components/EasterEggPlayer';
import DossierGrid from '../../components/DossierGrid';

export default function AboutPage() {
  const [currentDept, setCurrentDept] = useState('council');
  const playerRef = useRef(null);

  const handleTriggerFounderEasterEgg = () => {
    if (playerRef.current) {
      playerRef.current.play();
    }
  };

  return (
    <div className="about-page-container">
      {/* Easter Egg Audio Player HUD */}
      <EasterEggPlayer ref={playerRef} />

      <section className="about-section" id="about">
        <div className="about-hero-header">
          <h1 className="about-main-title">MEET OUR TEAM</h1>
        </div>

        {/* Department Filter Pills */}
        <DepartmentSelector
          currentDept={currentDept}
          onSelectDept={(dept) => setCurrentDept(dept)}
        />

        {/* 6-DoF 3D Astral Tarot Stage */}
        <TarotStage
          currentDept={currentDept}
          onTriggerFounderEasterEgg={handleTriggerFounderEasterEgg}
        />

        {/* Aperio Mission & Story Dossier */}
        <DossierGrid />
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
