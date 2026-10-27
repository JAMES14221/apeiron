'use client';

import { useEffect, useRef } from 'react';

/**
 * APERIO HERO COSMIC ENGINE
 * Authentic recreation of the original lightweight index.html hero canvas:
 * - Scoped exclusively to the Hero header (position: absolute)
 * - Zero GPU load on scroll: automatically pauses rendering via IntersectionObserver
 * - Authentic constellation links between nearby stars (< 140px)
 * - Drifting stars with organic twinkling & velocity
 * - Shooting comets with glowing linear gradient trails
 * - Click interactions: shockwave ripples, spark bursts, and star impulse physics
 */
export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const heroSection = canvas.closest('.hero') || canvas.parentElement;
    if (!heroSection) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let heroW = (canvas.width = heroSection.clientWidth || window.innerWidth);
    let heroH = (canvas.height = heroSection.clientHeight || window.innerHeight);

    const handleResize = () => {
      heroW = canvas.width = heroSection.clientWidth || window.innerWidth;
      heroH = canvas.height = heroSection.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // 1. Stars (authentic lightweight count: 80 desktop, 40 mobile)
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 40 : 80;
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * heroW,
        y: Math.random() * heroH,
        radius: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.7 + 0.3,
        baseAlpha: Math.random() * 0.7 + 0.3,
        vx: (Math.random() - 0.2) * 0.3,
        vy: (Math.random() - 0.2) * 0.3,
        twinkleSpeed: Math.random() * 0.025 + 0.015,
        twinkleAngle: Math.random() * Math.PI * 2,
      });
    }

    // 2. Shooting Comets (authentic 2 comets, smooth gradient tail)
    const comets = [
      {
        x: Math.random() * heroW * 1.2,
        y: -60,
        length: 260,
        speed: 2.5,
        angle: Math.PI / 4,
        width: 1.4,
        opacity: 0.55,
        color: '0, 240, 255',
      },
      {
        x: Math.random() * heroW * 1.4,
        y: -120,
        length: 220,
        speed: 3.0,
        angle: Math.PI / 4 + 0.06,
        width: 1.2,
        opacity: 0.5,
        color: '167, 139, 250',
      },
    ];

    // 3. Interactive click effect arrays (ripples & spark particles)
    const clickRipples = [];
    const clickParticles = [];

    // Mouse coordinates inside hero
    let mouseX = -9999;
    let mouseY = -9999;
    let mouseActive = false;
    let mouseTimeout;

    const handleMouseMove = (e) => {
      const rect = heroSection.getBoundingClientRect();
      if (
        e.clientY < rect.top ||
        e.clientY > rect.bottom ||
        e.clientX < rect.left ||
        e.clientX > rect.right
      ) {
        mouseActive = false;
        return;
      }
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseActive = true;

      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        mouseActive = false;
      }, 2000);
    };

    const handleHeroClick = (e) => {
      // Ignore clicks directly on interactive links or buttons
      if (
        e.target &&
        (e.target.closest('a') ||
          e.target.closest('button') ||
          e.target.closest('input'))
      ) {
        return;
      }

      const rect = heroSection.getBoundingClientRect();
      if (
        e.clientY < rect.top ||
        e.clientY > rect.bottom ||
        e.clientX < rect.left ||
        e.clientX > rect.right
      ) {
        return;
      }

      if (clickParticles.length > 30) return;
      if (clickRipples.length > 4) return;

      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Single subtle ripple
      clickRipples.push({
        x: clickX,
        y: clickY,
        radius: 8,
        speed: 3.5,
        maxRadius: 200,
        alpha: 0.55,
        fade: 0.02,
        width: 1.4,
        color: '0, 240, 255',
      });

      // Spark burst (authentic)
      const colors = ['255, 255, 255', '0, 240, 255', '167, 139, 250', '56, 189, 248'];
      const count = 10;
      for (let i = 0; i < count; i++) {
        const angle = ((Math.PI * 2) / count) * i + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 2.4 + 1.2;
        clickParticles.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 1.8 + 0.8,
          alpha: 0.85,
          fade: Math.random() * 0.025 + 0.02,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      // Gentle nudge to nearby stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const dx = star.x - clickX;
        const dy = star.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = ((150 - dist) / 150) * 1.8;
          star.vx += (dx / dist) * force * 0.18;
          star.vy += (dy / dist) * force * 0.18;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleHeroClick);

    // 4. Optimized Animation Loop with IntersectionObserver
    let animationFrameId;
    let isVisible = true;
    let lastTime = performance.now();

    const maxDist = 130;
    const maxDistSq = maxDist * maxDist;

    const render = (currentTime) => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(render);

      const deltaMs = currentTime - lastTime;
      lastTime = currentTime;
      const dt = Math.min(deltaMs, 40) / 16.667;

      ctx.clearRect(0, 0, heroW, heroH);

      // 1. Constellation lines between nearby stars (single path batch)
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
      ctx.beginPath();
      const len = stars.length;
      for (let i = 0; i < len; i++) {
        const s1 = stars[i];
        for (let j = i + 1; j < len; j++) {
          const s2 = stars[j];
          const dx = s1.x - s2.x;
          if (Math.abs(dx) > maxDist) continue;
          const dy = s1.y - s2.y;
          if (Math.abs(dy) > maxDist) continue;
          if (dx * dx + dy * dy < maxDistSq) {
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
          }
        }
      }
      ctx.stroke();

      // 2. Cursor connection lines if mouse is inside hero
      if (mouseActive && mouseX > 0 && mouseY > 0) {
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.28)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        for (let i = 0; i < len; i++) {
          const star = stars[i];
          const dx = star.x - mouseX;
          if (Math.abs(dx) > 130) continue;
          const dy = star.y - mouseY;
          if (Math.abs(dy) > 130) continue;
          if (dx * dx + dy * dy < 16900) {
            ctx.moveTo(mouseX, mouseY);
            ctx.lineTo(star.x, star.y);
          }
        }
        ctx.stroke();
      }

      // 3. Stars update & draw
      const damping = Math.pow(0.985, dt);
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < len; i++) {
        const star = stars[i];
        star.vx *= damping;
        star.vy *= damping;
        star.x += star.vx * dt;
        star.y += star.vy * dt;

        if (star.x < 0) star.x = heroW;
        else if (star.x > heroW) star.x = 0;
        if (star.y < 0) star.y = heroH;
        else if (star.y > heroH) star.y = 0;

        star.twinkleAngle += star.twinkleSpeed * dt;
        const currentAlpha = Math.max(0.2, star.baseAlpha + Math.sin(star.twinkleAngle) * 0.25);

        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // 4. Shooting Comets
      for (let i = 0; i < comets.length; i++) {
        const c = comets[i];
        c.x += 1.4 * c.speed * dt;
        c.y += 1.4 * c.speed * dt;
        const tailX = c.x - c.length * 0.7;
        const tailY = c.y - c.length * 0.7;

        const grad = ctx.createLinearGradient(c.x, c.y, tailX, tailY);
        grad.addColorStop(0, `rgba(${c.color}, ${c.opacity})`);
        grad.addColorStop(1, `rgba(${c.color}, 0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = c.width;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        if (c.y > heroH + 200 || c.x > heroW + 200) {
          c.x = Math.random() * heroW * 1.1 - 100;
          c.y = -80;
        }
      }

      // 5. Click Ripples
      for (let i = clickRipples.length - 1; i >= 0; i--) {
        const r = clickRipples[i];
        r.radius += r.speed * dt;
        r.alpha -= r.fade * dt;
        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          clickRipples.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(${r.color}, ${r.alpha.toFixed(2)})`;
        ctx.lineWidth = r.width;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 6. Click Particles
      for (let i = clickParticles.length - 1; i >= 0; i--) {
        const p = clickParticles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.alpha -= p.fade * dt;
        if (p.alpha <= 0) {
          clickParticles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // 5. IntersectionObserver: stops animation completely when hero is out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          lastTime = performance.now();
          animationFrameId = requestAnimationFrame(render);
        } else if (!isVisible && wasVisible) {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(heroSection);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleHeroClick);
      clearTimeout(mouseTimeout);
    };
  }, []);

  return <canvas ref={canvasRef} id="hero-canvas" className="hero-canvas" />;
}
