'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * APERIO ATMOSPHERIC SANCTUARY SYNTHESIZER
 * Pure Web Audio API - Zero audio downloads, zero network lag.
 * Plays soothing cosmic wind resonance & harmonic celestial chimes.
 */
export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const windNodeRef = useRef(null);
  const chimeTimerRef = useRef(null);

  const pentatonicScale = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5]; // C5, D5, E5, G5, A5, C6

  const playChime = (ctx) => {
    if (!ctx || ctx.state === 'suspended') return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freq = pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 4.8);
    } catch (err) {
      console.warn('Audio chime error:', err);
    }
  };

  const scheduleChimes = (ctx) => {
    const nextInterval = Math.random() * 3500 + 2500; // 2.5s - 6s
    chimeTimerRef.current = setTimeout(() => {
      playChime(ctx);
      scheduleChimes(ctx);
    }, nextInterval);
  };

  const startAtmosphere = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // 1. Soothing Wind Resonance
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 320;
      bandpass.Q.value = 3.5;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 1.2);

      whiteNoise.connect(bandpass);
      bandpass.connect(gainNode);
      gainNode.connect(ctx.destination);

      whiteNoise.start();
      windNodeRef.current = { whiteNoise, gainNode };

      // 2. Initial chime and schedule
      setTimeout(() => playChime(ctx), 400);
      scheduleChimes(ctx);

      setIsPlaying(true);
    } catch (err) {
      console.warn('Could not start audio:', err);
    }
  };

  const stopAtmosphere = () => {
    if (chimeTimerRef.current) {
      clearTimeout(chimeTimerRef.current);
      chimeTimerRef.current = null;
    }
    if (windNodeRef.current && audioCtxRef.current) {
      try {
        const { whiteNoise, gainNode } = windNodeRef.current;
        gainNode.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.5);
        setTimeout(() => {
          try {
            whiteNoise.stop();
          } catch (_) {}
        }, 550);
      } catch (_) {}
      windNodeRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAtmosphere();
    } else {
      startAtmosphere();
    }
  };

  useEffect(() => {
    return () => {
      stopAtmosphere();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      className={`ambient-audio-btn ${isPlaying ? 'playing' : ''}`}
      aria-label={isPlaying ? 'Mute Atmospheric Audio' : 'Play Atmospheric Audio'}
      title={isPlaying ? 'Mute Atmospheric Audio' : 'Play Ambient Cosmic Sound'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 14px',
        borderRadius: '999px',
        background: isPlaying ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
        border: isPlaying ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.14)',
        color: isPlaying ? '#00f0ff' : '#94a3b8',
        fontSize: '0.78rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: isPlaying ? '0 0 15px rgba(0, 240, 255, 0.35)' : 'none'
      }}
    >
      {/* Audio Wave Visualizer */}
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', height: '14px' }}>
        <span
          style={{
            width: '2.5px',
            height: isPlaying ? '12px' : '4px',
            background: 'currentColor',
            borderRadius: '2px',
            animation: isPlaying ? 'waveVibe 1s ease-in-out infinite' : 'none',
            transition: 'height 0.2s'
          }}
        />
        <span
          style={{
            width: '2.5px',
            height: isPlaying ? '14px' : '6px',
            background: 'currentColor',
            borderRadius: '2px',
            animation: isPlaying ? 'waveVibe 1s ease-in-out 0.2s infinite' : 'none',
            transition: 'height 0.2s'
          }}
        />
        <span
          style={{
            width: '2.5px',
            height: isPlaying ? '10px' : '4px',
            background: 'currentColor',
            borderRadius: '2px',
            animation: isPlaying ? 'waveVibe 1s ease-in-out 0.4s infinite' : 'none',
            transition: 'height 0.2s'
          }}
        />
      </span>
      <span style={{ letterSpacing: '0.5px' }}>{isPlaying ? 'AUDIO ON' : 'ATMOSPHERE'}</span>
    </button>
  );
}
