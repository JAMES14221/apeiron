'use client';

import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

const EasterEggPlayer = forwardRef(function EasterEggPlayer(props, ref) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    play: () => {
      setIsVisible(true);
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.log('Autoplay waiting for interaction:', err);
        });
      }
    },
    stop: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setIsVisible(false);
    }
  }));

  const togglePlayback = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  const closePlayer = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setIsVisible(false);
  };

  return (
    <>
      <audio ref={audioRef} preload="auto">
        <source src="/an-than.mp4" type="video/mp4" />
        <source src="public/an-than.mp4" type="video/mp4" />
        <source src="/public/an-than.mp4" type="video/mp4" />
      </audio>
      <div className={`easter-egg-player ${isVisible ? 'is-visible' : ''}`} style={{ display: isVisible ? 'flex' : 'none' }}>
        <div className={`player-vibes-bars ${isPlaying ? 'is-playing' : ''}`}>
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div className="player-info">
          <span className="player-tag">✦ SECRET CODEX · FOUNDER EASTER EGG ✦</span>
          <span className="player-track">An Thần — Thắng ft. Đạt Maniac</span>
        </div>
        <button className="player-toggle-btn" onClick={togglePlayback} aria-label="Toggle playback">
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <button className="player-close-btn" onClick={closePlayer} aria-label="Close player">
          ✕
        </button>
      </div>
    </>
  );
});

export default EasterEggPlayer;
