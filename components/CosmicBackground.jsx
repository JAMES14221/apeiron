'use client';

import { useEffect, useRef } from 'react';

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

    const starCount = window.innerWidth < 768 ? 40 : 70;
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

    let mouseX = -9999;
    let mouseY = -9999;
    let mouseActive = false;
    let mouseTimeout;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        mouseActive = false;
      }, 2500);
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    let lastTime = performance.now();

    const render = (time) => {
      animationFrameId = requestAnimationFrame(render);
      const deltaMs = time - lastTime;
      lastTime = time;
      const dt = Math.min(deltaMs, 100) / 16.667;

      ctx.clearRect(0, 0, canvasW, canvasH);

      // Batched Constellation Lines
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.09)';
      ctx.beginPath();
      const maxConnect = 110;
      const maxDistSq = maxConnect * maxConnect;
      for (let i = 0; i < stars.length; i++) {
        const s1 = stars[i];
        for (let j = i + 1; j < stars.length; j++) {
          const s2 = stars[j];
          const dx = s1.x - s2.x;
          if (Math.abs(dx) > maxConnect) continue;
          const dy = s1.y - s2.y;
          if (Math.abs(dy) > maxConnect) continue;
          if (dx * dx + dy * dy < maxDistSq) {
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
          }
        }
      }
      ctx.stroke();

      // Mouse Neural Connection
      if (mouseActive && mouseX > 0) {
        const cursorRadius = 150;
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          const dx = s.x - mouseX;
          const dy = s.y - mouseY;
          const dist = Math.hypot(dx, dy);
          if (dist < cursorRadius) {
            const strength = 1 - dist / cursorRadius;
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.4 * strength})`;
            ctx.lineWidth = 0.8 * strength + 0.3;
            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY);
            ctx.lineTo(s.x, s.y);
            ctx.stroke();
          }
        }
      }

      // Stars
      stars.forEach((s) => {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        if (s.x < 0) s.x = canvasW;
        if (s.x > canvasW) s.x = 0;
        if (s.y < 0) s.y = canvasH;
        if (s.y > canvasH) s.y = 0;

        s.twinkleAngle += s.twinkleSpeed * dt;
        const currentAlpha = Math.max(0.15, s.alpha + Math.sin(s.twinkleAngle) * 0.2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Comets
      comets.forEach((c) => {
        c.x += Math.cos(c.angle) * c.speed * dt;
        c.y += Math.sin(c.angle) * c.speed * dt;
        const tailX = c.x - Math.cos(c.angle) * c.length;
        const tailY = c.y - Math.sin(c.angle) * c.length;

        const grad = ctx.createLinearGradient(c.x, c.y, tailX, tailY);
        grad.addColorStop(0, `rgba(${c.color}, ${c.opacity})`);
        grad.addColorStop(1, `rgba(${c.color}, 0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = c.width;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        if (c.y > canvasH + 200 || c.x > canvasW + 200) {
          c.x = Math.random() * canvasW * 1.5 - canvasW * 0.25;
          c.y = -100;
        }
      });
    };

    render(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} id="bg-canvas" className="cosmic-bg-canvas" />;
}
