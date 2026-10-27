'use client';

export default function CentralCore() {
  return (
    <div className="gacha-center-core" id="gachaCenterCore">
      <div className="core-aura-pulse" />
      <div className="core-crystal-prism">
        <svg viewBox="0 0 100 120" className="core-prism-svg" width="90" height="110">
          <defs>
            <linearGradient id="prismGradA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="prismGradB" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#00f0ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {/* Main Octahedral Prism Faces */}
          <polygon points="50,6 88,38 50,114 12,38" fill="url(#prismGradA)" stroke="#00f0ff" strokeWidth="1.6" />
          <polygon points="50,6 50,114 12,38" fill="rgba(0, 240, 255, 0.28)" />
          <polygon points="50,6 88,38 50,114" fill="rgba(192, 132, 252, 0.35)" />
          <polygon points="50,6 50,114 50,38" fill="url(#prismGradB)" opacity="0.4" />
          {/* Central Radiance Line */}
          <line x1="50" y1="6" x2="50" y2="114" stroke="#ffffff" strokeWidth="1.8" />
          {/* Internal Astrolabe Cross Lines */}
          <line x1="12" y1="38" x2="88" y2="38" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeDasharray="2,3" />
        </svg>
      </div>
    </div>
  );
}
