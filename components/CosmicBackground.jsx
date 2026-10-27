'use client';

import { useEffect, useRef } from 'react';

/**
 * APERIO RESEARCH - UNIFIED FULL-PAGE INTERACTIVE COSMIC CANVAS ENGINE
 * Runs identically on Homepage, About Us, Research, etc.
 * Features:
 * - 70-120 drifting cosmic stars with sinusoidal twinkling & velocity damping
 * - Dynamic constellation link network (110px proximity)
 * - Cursor Neural Interaction (160px cyan gradient connections & magnetic attraction)
 * - Radial cursor aura glow & stardust photon trail
 * - Shooting comets with long luminous plasma tails
 * - Gravitational shockwave ripples & starburst spark bursts on click
 * - Physical impulse on nearby stars on click
 * - Delta-time normalized 60 FPS physics
 */
export default function CosmicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let canvasW = (canvas.width = window.innerWidth);
    let canvasH = (canvas.height = window.innerHeight);

    const handleResize = () => {
      canvasW = canvas.width = window.innerWidth;
      canvasH = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 1. Cosmic Stars spanning full window
    const starCount = window.innerWidth < 768 ? 45 : 85;
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvasW,
        y: Math.random() * canvasH,
        baseRadius: Math.random() * 1.8 + 0.6,
        radius: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.7 + 0.3,
        baseAlpha: Math.random() * 0.7 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleAngle: Math.random() * Math.PI * 2,
      });
    }

    // 2. Shooting Comets
    const comets = [];
    for (let i = 0; i < 3; i++) {
      comets.push({
        x: Math.random() * canvasW * 1.5 - canvasW * 0.25,
        y: Math.random() * canvasH * 0.5 - 100,
        length: Math.random() * 320 + 200,
        speed: Math.random() * 2.4 + 1.8,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.22,
        width: Math.random() * 1.8 + 0.8,
        opacity: Math.random() * 0.5 + 0.3,
        color: Math.random() > 0.4 ? '0, 240, 255' : '56, 189, 248',
      });
    }

    // 3. Cursor Tracking & Neural Network
    let mouseX = -9999;
    let mouseY = -9999;
    let mouseActive = false;
    let mouseHideTimeout;

    // Dynamic Stardust photon trail
    const stardustTrail = [];

    // Click gravitational ripples & starburst particles
    const clickRipples = [];
    const clickParticles = [];

    const handleMouseMove = (e) => {
      const prevX = mouseX;
      const prevY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;

      clearTimeout(mouseHideTimeout);
      mouseHideTimeout = setTimeout(() => {
        mouseActive = false;
      }, 2500);

      // Spawn stardust photon trail if cursor moved noticeably
      if (prevX > 0 && prevY > 0) {
        const dist = Math.hypot(mouseX - prevX, mouseY - prevY);
        if (dist > 3 && stardustTrail.length < 18) {
          const angle = Math.atan2(mouseY - prevY, mouseX - prevX);
          stardustTrail.push({
            x: mouseX + (Math.random() - 0.5) * 12,
            y: mouseY + (Math.random() - 0.5) * 12,
            vx: -Math.cos(angle) * (Math.random() * 1.2 + 0.4) + (Math.random() - 0.5) * 0.8,
            vy: -Math.sin(angle) * (Math.random() * 1.2 + 0.4) + (Math.random() - 0.5) * 0.8,
            size: Math.random() * 2.2 + 1.0,
            alpha: 0.85,
            fade: Math.random() * 0.035 + 0.02,
            color: Math.random() > 0.3 ? '0, 240, 255' : '255, 255, 255',
          });
        }
      }
    };

    const handleMouseLeave = () => {
      mouseActive = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    // Click Gravitational Shockwave & Particle Explosion
    const handleClick = (e) => {
      if (
        e.target &&
        (e.target.closest('a') ||
          e.target.closest('button') ||
          e.target.closest('input') ||
          e.target.closest('.gacha-card'))
      ) {
        return;
      }

      const clickX = e.clientX;
      const clickY = e.clientY;

      // Gravitational expanding shockwave ripple
      clickRipples.push({
        x: clickX,
        y: clickY,
        radius: 12,
        speed: 4.5,
        maxRadius: 280,
        alpha: 0.75,
        fade: 0.016,
        width: 2.0,
        color: '0, 240, 255',
      });

      // Physical impulse on nearby cosmic stars (push them away from click)
      stars.forEach((star) => {
        const dx = star.x - clickX;
        const dy = star.y - clickY;
        const dist = Math.hypot(dx, dy);
        if (dist < 260 && dist > 1) {
          const force = (1 - dist / 260) * 3.5;
          star.vx += (dx / dist) * force;
          star.vy += (dy / dist) * force;
        }
      });

      // Starburst explosion sparks
      const colors = ['255, 255, 255', '0, 240, 255', '56, 189, 248', '96, 165, 250', '192, 132, 252'];
      const sparkCount = 16;
      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 / sparkCount) * i + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 3.4 + 1.5;
        clickParticles.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2.2 + 0.8,
          alpha: 1.0,
          fade: Math.random() * 0.025 + 0.018,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    let animationFrameId;
    let lastTime = performance.now();

    const render = (currentTime) => {
      animationFrameId = requestAnimationFrame(render);
      const deltaMs = currentTime - lastTime;
      lastTime = currentTime;
      // Frame normalization: 1.0 at 60 FPS
      const dt = Math.min(deltaMs, 100) / (1000 / 60);

      ctx.clearRect(0, 0, canvasW, canvasH);

      // 1. Constellation links between background stars (Batched for 60 FPS)
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.09)';
      ctx.beginPath();
      const maxConnectDist = 110;
      const maxDistSq = maxConnectDist * maxConnectDist;
      const starLen = stars.length;
      for (let i = 0; i < starLen; i++) {
        const s1 = stars[i];
        for (let j = i + 1; j < starLen; j++) {
          const s2 = stars[j];
          const dx = s1.x - s2.x;
          if (Math.abs(dx) > maxConnectDist) continue;
          const dy = s1.y - s2.y;
          if (Math.abs(dy) > maxConnectDist) continue;
          if (dx * dx + dy * dy < maxDistSq) {
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
          }
        }
      }
      ctx.stroke();

      // 2. Cursor Neural Interaction & Magnetic Attraction
      if (mouseActive && mouseX > 0 && mouseY > 0) {
        const cursorRadius = 160;

        // Subtle cursor aura glow
        const aura = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 110);
        aura.addColorStop(0, 'rgba(0, 240, 255, 0.12)');
        aura.addColorStop(0.5, 'rgba(56, 189, 248, 0.04)');
        aura.addColorStop(1, 'rgba(2, 6, 18, 0)');
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 110, 0, Math.PI * 2);
        ctx.fill();

        // Neural lines from cursor to nearby stars + magnetic pull
        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];
          const dx = star.x - mouseX;
          const dy = star.y - mouseY;
          const dist = Math.hypot(dx, dy);

          if (dist < cursorRadius && dist > 1) {
            const lineStrength = 1 - dist / cursorRadius;

            // Magnetic gentle pull towards cursor
            const pullForce = 0.08 * lineStrength * dt;
            star.vx -= (dx / dist) * pullForce;
            star.vy -= (dy / dist) * pullForce;

            // Neural connection line with vibrant cyan glow
            const grad = ctx.createLinearGradient(mouseX, mouseY, star.x, star.y);
            grad.addColorStop(0, `rgba(0, 240, 255, ${0.48 * lineStrength})`);
            grad.addColorStop(1, `rgba(56, 189, 248, ${0.15 * lineStrength})`);

            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.0 * lineStrength + 0.4;
            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY);
            ctx.lineTo(star.x, star.y);
            ctx.stroke();

            // Shimmer connected star
            star.radius = star.baseRadius * (1 + 0.6 * lineStrength);
            star.alpha = Math.min(1.0, star.baseAlpha + 0.45 * lineStrength);
          } else {
            star.radius = star.baseRadius;
            star.alpha = star.baseAlpha;
          }
        }
      }

      // 3. Update & Render Stars with Velocity Damping
      const starDamping = Math.pow(0.985, dt);
      stars.forEach((star) => {
        star.vx *= starDamping;
        star.vy *= starDamping;

        star.x += star.vx * dt;
        star.y += star.vy * dt;

        // Screen boundary wrapping
        if (star.x < 0) star.x = canvasW;
        if (star.x > canvasW) star.x = 0;
        if (star.y < 0) star.y = canvasH;
        if (star.y > canvasH) star.y = 0;

        // Twinkle oscillation
        star.twinkleAngle += star.twinkleSpeed * dt;
        const currentAlpha = Math.max(0.15, star.alpha + Math.sin(star.twinkleAngle) * 0.2);

        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Update & Render Shooting Comets
      comets.forEach((comet) => {
        comet.x += Math.cos(comet.angle) * comet.speed * dt;
        comet.y += Math.sin(comet.angle) * comet.speed * dt;
        const tailX = comet.x - Math.cos(comet.angle) * comet.length;
        const tailY = comet.y - Math.sin(comet.angle) * comet.length;

        const cometGrad = ctx.createLinearGradient(comet.x, comet.y, tailX, tailY);
        cometGrad.addColorStop(0, `rgba(${comet.color}, ${comet.opacity})`);
        cometGrad.addColorStop(0.3, `rgba(${comet.color}, ${comet.opacity * 0.4})`);
        cometGrad.addColorStop(1, `rgba(${comet.color}, 0)`);

        ctx.strokeStyle = cometGrad;
        ctx.lineWidth = comet.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Reset comet when far offscreen
        if (comet.x > canvasW + 300 || comet.y > canvasH + 300) {
          comet.x = Math.random() * canvasW * 1.2 - canvasW * 0.3;
          comet.y = -Math.random() * 200 - 50;
          comet.speed = Math.random() * 2.4 + 1.8;
          comet.opacity = Math.random() * 0.5 + 0.3;
        }
      });

      // 5. Update & Render Click Gravitational Shockwave Ripples
      for (let i = clickRipples.length - 1; i >= 0; i--) {
        const ripple = clickRipples[i];
        ripple.radius += ripple.speed * dt;
        ripple.alpha -= ripple.fade * dt;

        if (ripple.alpha <= 0 || ripple.radius >= ripple.maxRadius) {
          clickRipples.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(${ripple.color}, ${ripple.alpha})`;
        ctx.lineWidth = ripple.width;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 6. Update & Render Click Starburst Explosion Particles
      for (let i = clickParticles.length - 1; i >= 0; i--) {
        const p = clickParticles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= Math.pow(0.96, dt);
        p.vy *= Math.pow(0.96, dt);
        p.alpha -= p.fade * dt;

        if (p.alpha <= 0) {
          clickParticles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 7. Update & Render Stardust Photon Trail
      for (let i = stardustTrail.length - 1; i >= 0; i--) {
        const t = stardustTrail[i];
        t.x += t.vx * dt;
        t.y += t.vy * dt;
        t.alpha -= t.fade * dt;

        if (t.alpha <= 0) {
          stardustTrail.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(${t.color}, ${t.alpha})`;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    render(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return <canvas ref={canvasRef} id="bg-canvas" className="cosmic-bg-canvas" />;
}
