'use client';

export default function TarotCard({
  scholar,
  index,
  isActive,
  isRevealed,
  theme,
  onClick,
  onClose,
  cardRef,
}) {
  const starFill = theme?.starColor || 'rgba(0, 240, 255, 0.88)';

  return (
    <div
      ref={cardRef}
      className={`gacha-card ${isActive ? 'is-active-card' : ''} ${isRevealed ? 'is-revealed' : ''}`}
      data-index={index}
      role="button"
      tabIndex={0}
      aria-label={`Reveal ${scholar.name}'s scholar codex`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="gacha-card-flipper">
        {/* Back Face: Sacred Geometry Pure SVG Astral Tarot Card (NO PNGs!) */}
        <div className="gacha-card-face gacha-card-back">
          {/* Sacred Astrolabe Geometry Grid */}
          <div className="gacha-card-sacred-seal">
            <svg viewBox="0 0 200 320" className="card-seal-svg" width="100%" height="100%">
              {/* Outer Border Filigree */}
              <rect x="8" y="8" width="184" height="304" rx="12" fill="none" stroke="rgba(160, 150, 255, 0.35)" strokeWidth="1.2" />
              <rect x="14" y="14" width="172" height="292" rx="8" fill="none" stroke="rgba(0, 240, 255, 0.22)" strokeWidth="0.8" strokeDasharray="4,6" />
              {/* Astrolabe Concentric Rings */}
              <circle cx="100" cy="160" r="72" fill="none" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="1" strokeDasharray="3,5" />
              <circle cx="100" cy="160" r="52" fill="none" stroke="rgba(168, 85, 247, 0.25)" strokeWidth="0.8" />
              <circle cx="100" cy="160" r="32" fill="none" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="0.6" strokeDasharray="2,3" />
              {/* Celestial Hexagram / Astrolabe Triangles */}
              <polygon points="100,90 160,195 40,195" fill="none" stroke="rgba(0, 240, 255, 0.22)" strokeWidth="0.8" />
              <polygon points="100,230 160,125 40,125" fill="none" stroke="rgba(168, 85, 247, 0.22)" strokeWidth="0.8" />
              {/* Axis Cross-Hairs */}
              <line x1="100" y1="20" x2="100" y2="300" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="0.7" strokeDasharray="3,6" />
              <line x1="20" y1="160" x2="180" y2="160" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="0.7" strokeDasharray="3,6" />
              {/* Corner Diamond Accents */}
              <polygon points="20,20 24,24 20,28 16,24" fill="rgba(0, 240, 255, 0.6)" />
              <polygon points="180,20 184,24 180,28 176,24" fill="rgba(0, 240, 255, 0.6)" />
              <polygon points="20,300 24,304 20,308 16,304" fill="rgba(0, 240, 255, 0.6)" />
              <polygon points="180,300 184,304 180,308 176,304" fill="rgba(0, 240, 255, 0.6)" />
            </svg>
          </div>

          {/* Top Codex Badge */}
          <div className="card-back-top-badge">
            <span className="card-back-badge-text">CODEX {scholar.roman}</span>
          </div>

          {/* Center 8-pointed star rotating CCW with breathing glow */}
          <div className="gacha-card-center-star">
            <svg viewBox="0 0 100 100" className="star-8-svg">
              <polygon
                points="50,0 55,35 85,15 65,45 100,50 65,55 85,85 55,65 50,100 45,65 15,85 35,55 0,50 35,45 15,15 45,35"
                fill={starFill}
              />
            </svg>
          </div>

          {/* Bottom Codex Crest */}
          <div className="card-back-bottom-crest">
            <span className="card-crest-roman">{scholar.roman}</span>
            <span className="card-crest-label">APERIO RESEARCH</span>
          </div>

          <div className="gacha-card-sheen" />
          <div className="gacha-card-crystal-overlay" />
        </div>

        {/* Front Face: Harmonious Crystal Scholar Dossier (Pure Vector & Typography, NO PNGs!) */}
        <div className="gacha-card-face gacha-card-front">
          <button
            className="gacha-card-close-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close card"
          >
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="gacha-front-content">
            <div className="gacha-card-badge-wrap">
              <span className="badge-star">✦</span>
              <span className="gacha-card-badge">CODEX {scholar.roman}</span>
              <span className="badge-sep">·</span>
              <span className="badge-org">APERIO</span>
              <span className="badge-star">✦</span>
            </div>

            {/* Avatar Frame: Pure Monogram with Glowing Orbit Rings */}
            <div className="gacha-avatar-frame is-monogram">
              <div className="gacha-monogram-inner">
                <span className="gacha-avatar-monogram">{scholar.initials}</span>
              </div>
              <div className="avatar-orbit-ring" />
            </div>

            <h3 className="gacha-card-name">{scholar.name}</h3>
            {scholar.nickname && (
              <div className="gacha-nickname">✦ Alias: “{scholar.nickname}” ✦</div>
            )}
            <div className="gacha-card-role">
              <span className="role-symbol">◈</span>
              <span>{scholar.role}</span>
              <span className="role-symbol">◈</span>
            </div>

            <div className="gacha-card-quote-box">
              <p className="gacha-card-quote">“{scholar.quote}”</p>
            </div>

            <div className="gacha-card-tags-row">
              <div className="gacha-card-tag tag-focus">
                <span className="tag-spark">✦</span>
                <span className="tag-text">{scholar.focus}</span>
              </div>
              <div className="gacha-card-tag tag-dept">
                <span className="tag-spark">❖</span>
                <span className="tag-text">{scholar.dept}</span>
              </div>
            </div>
          </div>

          <div className="gacha-card-sheen" />
          <div className="gacha-card-crystal-overlay" />
        </div>
      </div>
    </div>
  );
}
