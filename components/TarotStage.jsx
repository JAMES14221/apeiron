'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import TarotCard from './TarotCard';
import CentralCore from './CentralCore';
import { ALL_SCHOLARS } from '../data/scholars';

const DEPT_THEMES = {
  council: {
    name: 'Founding Council',
    isCouncil: true,
    primary: '#fbbf24',
    secondary: '#00f0ff',
    accent: '#c084fc',
    outerGlow: 'rgba(251, 191, 36, 0.60)',
    midGlow: 'rgba(0, 240, 255, 0.70)',
    innerGlow: 'rgba(192, 132, 252, 0.55)',
    coreVein: '#ffffff',
    starColor: '#fbbf24',
    photonColors: ['#fbbf24', '#00f0ff', '#ffffff', '#c084fc', '#f59e0b'],
  },
  program: {
    name: 'Program & PM',
    primary: '#38bdf8',
    secondary: '#2563eb',
    accent: '#93c5fd',
    outerGlow: 'rgba(37, 99, 235, 0.50)',
    midGlow: 'rgba(56, 189, 248, 0.70)',
    innerGlow: 'rgba(147, 197, 253, 0.40)',
    coreVein: '#f0f9ff',
    starColor: '#38bdf8',
    photonColors: ['#38bdf8', '#2563eb', '#ffffff', '#93c5fd'],
  },
  content: {
    name: 'Content & Moderation',
    primary: '#c084fc',
    secondary: '#7c3aed',
    accent: '#ec4899',
    outerGlow: 'rgba(124, 58, 237, 0.50)',
    midGlow: 'rgba(192, 132, 252, 0.70)',
    innerGlow: 'rgba(236, 72, 153, 0.40)',
    coreVein: '#faf5ff',
    starColor: '#c084fc',
    photonColors: ['#c084fc', '#7c3aed', '#ffffff', '#ec4899'],
  },
  media: {
    name: 'Media & Design',
    primary: '#fb7185',
    secondary: '#e11d48',
    accent: '#f43f5e',
    outerGlow: 'rgba(225, 29, 72, 0.50)',
    midGlow: 'rgba(251, 113, 133, 0.70)',
    innerGlow: 'rgba(244, 63, 94, 0.40)',
    coreVein: '#fff1f2',
    starColor: '#fb7185',
    photonColors: ['#fb7185', '#e11d48', '#ffffff', '#f43f5e'],
  },
  er: {
    name: 'External Relations',
    primary: '#fbbf24',
    secondary: '#d97706',
    accent: '#f59e0b',
    outerGlow: 'rgba(217, 119, 6, 0.50)',
    midGlow: 'rgba(251, 191, 36, 0.70)',
    innerGlow: 'rgba(245, 158, 11, 0.40)',
    coreVein: '#fffbeb',
    starColor: '#fbbf24',
    photonColors: ['#fbbf24', '#d97706', '#ffffff', '#fde68a'],
  },
  hr: {
    name: 'HR & Operations',
    primary: '#34d399',
    secondary: '#059669',
    accent: '#10b981',
    outerGlow: 'rgba(5, 150, 105, 0.50)',
    midGlow: 'rgba(52, 211, 153, 0.70)',
    innerGlow: 'rgba(16, 185, 129, 0.40)',
    coreVein: '#ecfdf5',
    starColor: '#34d399',
    photonColors: ['#34d399', '#059669', '#ffffff', '#6ee7b7'],
  },
  tech: {
    name: 'Tech & Portal',
    primary: '#00f0ff',
    secondary: '#0284c7',
    accent: '#38bdf8',
    outerGlow: 'rgba(2, 132, 199, 0.50)',
    midGlow: 'rgba(0, 240, 255, 0.75)',
    innerGlow: 'rgba(56, 189, 248, 0.40)',
    coreVein: '#ffffff',
    starColor: '#00f0ff',
    photonColors: ['#00f0ff', '#0284c7', '#ffffff', '#7dd3fc'],
  },
  all: {
    name: 'All Scholars',
    isRainbow: true,
    primary: '#00f0ff',
    secondary: '#c084fc',
    accent: '#fbbf24',
    outerGlow: 'rgba(168, 85, 247, 0.50)',
    midGlow: 'rgba(0, 240, 255, 0.70)',
    innerGlow: 'rgba(251, 191, 36, 0.40)',
    coreVein: '#ffffff',
    starColor: '#00f0ff',
    photonColors: ['#00f0ff', '#c084fc', '#fbbf24', '#ffffff', '#fb7185'],
  },
};

export default function TarotStage({ currentDept, onTriggerFounderEasterEgg }) {
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);
  const [focalIndex, setFocalIndex] = useState(0);
  const [revealedIndex, setRevealedIndex] = useState(null);

  const filteredScholars = useMemo(() => {
    if (currentDept === 'all') return ALL_SCHOLARS;
    return ALL_SCHOLARS.filter((s) => s.deptCode === currentDept);
  }, [currentDept]);

  const activeTheme = DEPT_THEMES[currentDept] || DEPT_THEMES.council;

  // Refs for animation loop
  const animState = useRef({
    currentFocal: 0,
    targetFocal: 0,
    focusP: {},
    flipP: {},
    simTime: 0,
    targetParallaxX: 0,
    targetParallaxY: 0,
    curParallaxX: 0,
    curParallaxY: 0,
  });

  // Reset indices on department change
  useEffect(() => {
    animState.currentFocal = 0;
    animState.targetFocal = 0;
    animState.focusP = {};
    animState.flipP = {};
    setFocalIndex(0);
    setRevealedIndex(null);
  }, [currentDept]);

  const rotateStep = (direction) => {
    const N = filteredScholars.length;
    if (N === 0) return;
    setRevealedIndex(null);
    animState.current.targetFocal = (animState.current.targetFocal - direction + N) % N;
  };

  const handleCardClick = (idx) => {
    if (revealedIndex === idx) {
      setRevealedIndex(null);
      animState.current.focusP[idx] = 0;
      animState.current.flipP[idx] = 0;
    } else {
      setRevealedIndex(idx);
      animState.current.targetFocal = idx;
      const scholar = filteredScholars[idx];
      if (scholar?.isFounder && onTriggerFounderEasterEgg) {
        onTriggerFounderEasterEgg();
      }
    }
  };

  // Canvas & 3D Math Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let canvasW = (canvas.width = canvas.parentElement.clientWidth || window.innerWidth);
    let canvasH = (canvas.height = canvas.parentElement.clientHeight || 780);

    const handleResize = () => {
      canvasW = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      canvasH = canvas.height = canvas.parentElement.clientHeight || 780;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      animState.current.targetParallaxX = Math.max(-1, Math.min(1, normX * 2));
      animState.current.targetParallaxY = Math.max(-1, Math.min(1, normY * 2));
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 14 Optimized Ribbon Photons
    const photons = [];
    for (let i = 0; i < 14; i++) {
      photons.push({
        progress: i / 14,
        speed: (i % 2 === 0 ? 0.0026 : -0.0022),
        size: 2.2,
      });
    }

    // 16 Twinkle Stars
    const twinkle = [];
    for (let i = 0; i < 16; i++) {
      twinkle.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 3 + 2,
        speed: Math.random() * 1.5 + 1,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let animId;
    let lastTime = performance.now();

    const loop = (currentTime) => {
      animId = requestAnimationFrame(loop);
      const deltaMs = currentTime - lastTime;
      lastTime = currentTime;
      const delta = Math.min(2.0, Math.max(0.4, deltaMs / 16.667));

      const state = animState.current;
      state.simTime += 0.016 * delta;

      // Parallax smooth interpolation
      state.curParallaxX += (state.targetParallaxX - state.curParallaxX) * 0.08;
      state.curParallaxY += (state.targetParallaxY - state.curParallaxY) * 0.08;

      const camX = state.curParallaxX * 24;
      const camY = state.curParallaxY * 18;
      const cx = canvasW * 0.5;
      const cy = canvasH * 0.48;
      const stageScale = Math.min(canvasW / 1300, canvasH / 780);

      ctx.clearRect(0, 0, canvasW, canvasH);

      // 1. Twinkle Cross Stars
      twinkle.forEach((s) => {
        const sx = s.x * canvasW + camX * 0.15;
        const sy = s.y * canvasH + camY * 0.15;
        const bright = Math.sin(state.simTime * s.speed + s.phase) * 0.4 + 0.6;
        ctx.fillStyle = `rgba(255, 255, 255, ${bright * 0.8})`;
        ctx.beginPath();
        ctx.arc(sx, sy, s.size * bright * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Armillary Ring
      ctx.save();
      ctx.translate(cx + camX * 0.35, cy + camY * 0.35);
      ctx.rotate(-0.42);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
      ctx.lineWidth = 1.4;
      ctx.setLineDash([6, 12]);
      ctx.beginPath();
      ctx.ellipse(0, 0, 480 * stageScale, 160 * stageScale, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 3. Cosmic Energy Ribbon (Mobius Strip with 44 steps)
      const mobiusCX = cx + camX * 0.55;
      const mobiusCY = cy + camY * 0.55;
      const mobiusTilt = -0.44;
      const ribbonR = 490 * stageScale;
      const steps = 44;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      if (activeTheme.isCouncil) {
        // Multi-chromatic Council Strip
        // Outer Gold
        ctx.beginPath();
        for (let s = 0; s <= steps; s++) {
          const theta = (s / steps) * Math.PI * 2;
          const wave = Math.sin(3 * theta - state.simTime * 2.2) * (7 * stageScale);
          const r = ribbonR + wave - 2.5;
          const px = Math.cos(theta) * r;
          const py = Math.sin(theta) * (r * 0.38);
          const rx = px * Math.cos(mobiusTilt) - py * Math.sin(mobiusTilt);
          const ry = px * Math.sin(mobiusTilt) + py * Math.cos(mobiusTilt);
          if (s === 0) ctx.moveTo(mobiusCX + rx, mobiusCY + ry);
          else ctx.lineTo(mobiusCX + rx, mobiusCY + ry);
        }
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.55)';
        ctx.lineWidth = 16 * stageScale;
        ctx.stroke();

        // Cyan Fringe
        ctx.beginPath();
        for (let s = 0; s <= steps; s++) {
          const theta = (s / steps) * Math.PI * 2;
          const wave = Math.sin(3 * theta - state.simTime * 2.2) * (7 * stageScale);
          const r = ribbonR + wave + 2.5;
          const px = Math.cos(theta) * r;
          const py = Math.sin(theta) * (r * 0.38);
          const rx = px * Math.cos(mobiusTilt) - py * Math.sin(mobiusTilt);
          const ry = px * Math.sin(mobiusTilt) + py * Math.cos(mobiusTilt);
          if (s === 0) ctx.moveTo(mobiusCX + rx, mobiusCY + ry);
          else ctx.lineTo(mobiusCX + rx, mobiusCY + ry);
        }
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.65)';
        ctx.lineWidth = 11 * stageScale;
        ctx.stroke();

        // White Core Vein
        ctx.beginPath();
        for (let s = 0; s <= steps; s++) {
          const theta = (s / steps) * Math.PI * 2;
          const r = ribbonR;
          const px = Math.cos(theta) * r;
          const py = Math.sin(theta) * (r * 0.38);
          const rx = px * Math.cos(mobiusTilt) - py * Math.sin(mobiusTilt);
          const ry = px * Math.sin(mobiusTilt) + py * Math.cos(mobiusTilt);
          if (s === 0) ctx.moveTo(mobiusCX + rx, mobiusCY + ry);
          else ctx.lineTo(mobiusCX + rx, mobiusCY + ry);
        }
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.4 * stageScale;
        ctx.stroke();
      } else {
        // Department-Specific Strip
        ctx.beginPath();
        for (let s = 0; s <= steps; s++) {
          const theta = (s / steps) * Math.PI * 2;
          const wave = Math.sin(3 * theta - state.simTime * 2.2) * (7 * stageScale);
          const r = ribbonR + wave;
          const px = Math.cos(theta) * r;
          const py = Math.sin(theta) * (r * 0.38);
          const rx = px * Math.cos(mobiusTilt) - py * Math.sin(mobiusTilt);
          const ry = px * Math.sin(mobiusTilt) + py * Math.cos(mobiusTilt);
          if (s === 0) ctx.moveTo(mobiusCX + rx, mobiusCY + ry);
          else ctx.lineTo(mobiusCX + rx, mobiusCY + ry);
        }
        ctx.strokeStyle = activeTheme.outerGlow;
        ctx.lineWidth = 14 * stageScale;
        ctx.stroke();

        ctx.strokeStyle = activeTheme.coreVein;
        ctx.lineWidth = 2.4 * stageScale;
        ctx.stroke();
      }

      // Flowing Photons
      const pColors = activeTheme.photonColors || ['#00f0ff', '#ffffff'];
      photons.forEach((p, idx) => {
        p.progress += p.speed * delta;
        if (p.progress > 1) p.progress -= 1;
        if (p.progress < 0) p.progress += 1;

        const theta = p.progress * Math.PI * 2;
        const px = Math.cos(theta) * ribbonR;
        const py = Math.sin(theta) * (ribbonR * 0.38);
        const rx = px * Math.cos(mobiusTilt) - py * Math.sin(mobiusTilt);
        const ry = px * Math.sin(mobiusTilt) + py * Math.cos(mobiusTilt);

        ctx.fillStyle = pColors[idx % pColors.length];
        ctx.beginPath();
        ctx.arc(mobiusCX + rx, mobiusCY + ry, p.size * stageScale, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      // 4. Update 3D Card DOM Transforms
      const N = filteredScholars.length;
      if (N === 0) return;

      // Continuous Focal index lerp
      let diff = state.targetFocal - state.currentFocal;
      if (diff > N / 2) diff -= N;
      if (diff < -N / 2) diff += N;
      state.currentFocal = (state.currentFocal + diff * 0.12 * delta + N) % N;

      const curActive = Math.round(state.currentFocal) % N;
      if (curActive !== focalIndex) {
        setFocalIndex(curActive);
      }

      const mouseShiftX = state.curParallaxX * 18;
      const mouseShiftY = state.curParallaxY * 18;
      const mouseRotX = state.curParallaxY * 6;
      const mouseRotY = state.curParallaxX * 6;

      for (let i = 0; i < N; i++) {
        const cardEl = cardRefs.current[i];
        if (!cardEl) continue;

        const targetFocus = revealedIndex === i ? 1.0 : 0.0;
        const targetFlip = revealedIndex === i ? 1.0 : 0.0;

        state.focusP[i] = state.focusP[i] || 0;
        state.flipP[i] = state.flipP[i] || 0;

        state.focusP[i] += (targetFocus - state.focusP[i]) * 0.22 * delta;
        state.flipP[i] += (targetFlip - state.flipP[i]) * 0.20 * delta;

        const fp = state.focusP[i];
        const flipDeg = state.flipP[i] * 180;

        let k = (i - state.currentFocal) % N;
        if (k > N / 2) k -= N;
        if (k < -N / 2) k += N;
        const absK = Math.abs(k);
        const sign = k > 0 ? 1 : k < 0 ? -1 : 0;

        // Smart Culling: Detach far cards from render tree
        if (absK > 2.8 && fp < 0.01) {
          if (cardEl.style.display !== 'none') {
            cardEl.style.display = 'none';
            cardEl.style.pointerEvents = 'none';
          }
          continue;
        }
        if (cardEl.style.display !== 'block') {
          cardEl.style.display = 'block';
          cardEl.style.pointerEvents = 'auto';
        }

        const baseSpacing = canvasW < 768 ? 190 : canvasW < 1024 ? 230 : 275;
        const stride = canvasW < 768 ? 140 : canvasW < 1024 ? 175 : 210;
        const posX = sign * (absK === 0 ? 0 : baseSpacing + (absK - 1) * stride) * stageScale;
        const posZ = -Math.pow(absK, 1.25) * 165 * stageScale;
        const baseScale = 1.0 / (1.0 + absK * 0.17);
        const baseRotY = -sign * Math.min(54, 28 + (absK - 1) * 10);

        // 6-DoF Float
        const phase = i === 0 ? 0 : i === 2 ? Math.PI : i * 1.618;
        const floatBobY = Math.sin(state.simTime * 1.1 + phase) * 10.0;
        const floatRollZ = Math.sin(state.simTime * 0.7 + phase) * 4.5;

        // Ribbon Trajectory Alignment
        const stripSlopeY = posX * Math.tan(mobiusTilt) * 0.72;
        const stripSagY = (Math.pow(posX, 2) / (2.2 * ribbonR)) * 0.22;
        const stripTrajectoryY = stripSlopeY + stripSagY;
        const stripRollZ = (mobiusTilt * (180 / Math.PI) * 0.40) * (1.0 - Math.min(2.5, absK) * 0.12);

        const orbitX = posX + mouseShiftX;
        const orbitY = stripTrajectoryY + floatBobY + mouseShiftY;
        const orbitZ = posZ;
        const orbitRotX = mouseRotX;
        const orbitRotY = baseRotY + mouseRotY;
        const orbitRotZ = stripRollZ + floatRollZ;
        const orbitScale = baseScale;

        const focusX = mouseShiftX * 0.4;
        const focusY = -35 + mouseShiftY * 0.4;
        const focusZ = 60;

        const curX = orbitX * (1 - fp) + focusX * fp;
        const curY = orbitY * (1 - fp) + focusY * fp;
        const curZ = orbitZ * (1 - fp) + focusZ * fp;
        const curRotX = orbitRotX * (1 - fp);
        const curRotY = orbitRotY * (1 - fp);
        const curRotZ = orbitRotZ * (1 - fp);
        const curScale = orbitScale * (1 - fp) + 1.05 * fp;

        const flipper = cardEl.querySelector('.gacha-card-flipper');
        if (flipper) {
          flipper.style.transform = `rotateY(${flipDeg.toFixed(2)}deg)`;
        }

        cardEl.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, ${curZ.toFixed(2)}px) rotateX(${curRotX.toFixed(2)}deg) rotateY(${curRotY.toFixed(2)}deg) rotateZ(${curRotZ.toFixed(2)}deg) scale(${curScale.toFixed(3)})`;

        // Atmospheric perspective opacity
        const atmosphericOpacity = Math.max(0.18, 1.0 - absK * 0.24);
        const zIndex = Math.round((500 - absK * 80) * (1 - fp) + 900 * fp);
        cardEl.style.opacity = (atmosphericOpacity * (1 - fp) + 1.0 * fp).toFixed(3);
        cardEl.style.zIndex = zIndex;
      }
    };

    loop(performance.now());

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [filteredScholars, activeTheme, revealedIndex, focalIndex]);

  const activeScholar = filteredScholars[focalIndex] || filteredScholars[0];

  return (
    <div className="gacha-stage" id="gachaStage" data-dept={currentDept}>
      <div className="gacha-backdrop">
        <canvas ref={canvasRef} id="cosmicStageCanvas" className="cosmic-stage-canvas" />
      </div>

      <div className="gacha-viewport" id="gachaViewport">
        <div className="gacha-floor-astrolabe" />
        <CentralCore />

        <div className="gacha-cards-stage" id="gachaCardsStage" data-dept={currentDept}>
          {filteredScholars.map((scholar, idx) => (
            <TarotCard
              key={scholar.roman || idx}
              scholar={scholar}
              index={idx}
              isActive={focalIndex === idx}
              isRevealed={revealedIndex === idx}
              theme={activeTheme}
              onClick={() => handleCardClick(idx)}
              onClose={() => setRevealedIndex(null)}
              cardRef={(el) => (cardRefs.current[idx] = el)}
            />
          ))}
        </div>

        {/* Dial Tracker */}
        <div className="gacha-dial-track" id="gachaDialTrack">
          <button className="dial-arrow dial-prev" onClick={() => rotateStep(1)} aria-label="Previous scholar">
            ‹
          </button>
          <div className="dial-display">
            <span className="dial-roman">CODEX {activeScholar?.roman || 'I'}</span>
            <span className="dial-divider">·</span>
            <span className="dial-total">{activeTheme.name.toUpperCase()}</span>
          </div>
          <button className="dial-arrow dial-next" onClick={() => rotateStep(-1)} aria-label="Next scholar">
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
