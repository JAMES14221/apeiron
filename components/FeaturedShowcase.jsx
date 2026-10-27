'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FeaturedShowcase() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeModalPaper, setActiveModalPaper] = useState(null);

  const featured = [
    {
      id: 1,
      badge: 'MATERIALS SCIENCE',
      title: 'Biodegradable Cement from Agricultural Waste',
      author: 'Nguyen Minh Triet & Aperio Guild',
      time: '6 min read',
      date: 'April 2026',
      icon: '🌿',
      color: '#34d399',
      summary: 'Investigating high-silica rice husk ash and sugarcane bagasse fibers to replace 30% of Portland clinker, cutting embodied CO2 while improving compression strength.'
    },
    {
      id: 2,
      badge: 'NEUROSCIENCE & AI',
      title: 'AI-Assisted Early Detection of Neurological Disorders',
      author: 'Le Hoang Nam & Mentorship Cohort',
      time: '8 min read',
      date: 'March 2026',
      icon: '🧠',
      color: '#00f0ff',
      summary: 'Employing deep convolutional neural networks to detect micro-tremors and acoustic biomarkers in early-stage Parkinsons patients via commodity smartphones.'
    },
    {
      id: 3,
      badge: 'CHRONOBIOLOGY',
      title: 'The Impact of Sleep Quality on Academic Performance',
      author: 'Tran Thu Ha & Psychology Circle',
      time: '5 min read',
      date: 'February 2026',
      icon: '⏳',
      color: '#c084fc',
      summary: 'Evaluating circadian disruption in high school and undergraduate students: why sleep architecture predicts executive reasoning better than raw study hours.'
    },
    {
      id: 4,
      badge: 'PSYCHOLOGY & COGNITION',
      title: 'Tâm Lý Học: Hiểu Để Kết Nối Với Chính Mình',
      author: 'Pham Quoc Bao & Aperio Fellows',
      time: '7 min read',
      date: 'January 2026',
      icon: '💡',
      color: '#fbbf24',
      summary: 'Khảo sát hành vi và các cơ chế phòng vệ tâm lý học của thế hệ trẻ trong kỷ nguyên số hóa, cung cấp khung tự soi chiếu nhận thức để xây dựng nội lực.'
    },
    {
      id: 5,
      badge: 'METHODOLOGY FOUNDATION',
      title: 'Từ Những Khoảng Trống Đến Đề Tài Nghiên Cứu',
      author: 'Scientific Advisory Board',
      time: '10 min read',
      date: 'December 2025',
      icon: '🔍',
      color: '#38bdf8',
      summary: 'Cẩm nang phương pháp luận dành cho học sinh: cách phát hiện Research Gap, đặt câu hỏi nghiên cứu có giá trị thực tiễn và thiết kế khung thử nghiệm chuẩn mực.'
    }
  ];

  const total = featured.length;

  const nextSlide = () => setCurrentIdx((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrentIdx((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, [isHovered, total]);

  const current = featured[currentIdx];

  return (
    <section
      style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '60px 24px 80px 24px',
        position: 'relative'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '36px'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#00f0ff',
            fontSize: '0.8rem',
            letterSpacing: '2.5px',
            fontWeight: '700',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 10px #00f0ff' }}></span>
            FEATURED EXPLORATIONS
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif, serif)',
            fontSize: 'clamp(2rem, 4vw, 2.6rem)',
            color: '#ffffff',
            margin: 0,
            letterSpacing: '1px'
          }}>
            Student Publications & Guides
          </h2>
        </div>

        <Link
          href="/research"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#38bdf8',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '600',
            padding: '8px 18px',
            borderRadius: '999px',
            background: 'rgba(56, 189, 248, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            transition: 'all 0.2s ease'
          }}
        >
          <span>View All 6 Publications</span>
          <span>→</span>
        </Link>
      </div>

      {/* Featured Card Stage */}
      <div style={{
        position: 'relative',
        borderRadius: '24px',
        background: 'radial-gradient(ellipse at 80% 20%, rgba(0, 240, 255, 0.08) 0%, rgba(10, 18, 38, 0.94) 70%)',
        border: `1px solid ${current.color}44`,
        boxShadow: `0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px ${current.color}18`,
        padding: '48px 40px',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '36px',
          alignItems: 'center'
        }}>
          {/* Left Column: Monogram & Visual Icon */}
          <div style={{
            height: '240px',
            borderRadius: '18px',
            background: `radial-gradient(circle at 50% 50%, ${current.color}22 0%, rgba(2, 6, 18, 0.9) 80%)`,
            border: `1px solid ${current.color}33`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              fontSize: '4.5rem',
              filter: `drop-shadow(0 0 25px ${current.color})`,
              transform: 'scale(1)',
              transition: 'transform 0.3s ease'
            }}>
              {current.icon}
            </div>
            <div style={{
              position: 'absolute',
              bottom: '16px',
              fontSize: '0.72rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: current.color,
              fontWeight: '700'
            }}>
              PAPER #{current.id.toString().padStart(2, '0')}
            </div>
          </div>

          {/* Right Column: Paper Metadata & Action */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                padding: '4px 12px',
                borderRadius: '999px',
                background: `${current.color}1a`,
                color: current.color,
                border: `1px solid ${current.color}44`,
                letterSpacing: '1px'
              }}>
                {current.badge}
              </span>
              <span style={{ color: '#64748b', fontSize: '0.82rem' }}>•</span>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{current.date}</span>
              <span style={{ color: '#64748b', fontSize: '0.82rem' }}>•</span>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{current.time}</span>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif, serif)',
              fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)',
              color: '#ffffff',
              lineHeight: '1.25',
              margin: '0 0 16px 0'
            }}>
              {current.title}
            </h3>

            <p style={{
              color: '#cbd5e1',
              fontSize: '0.98rem',
              lineHeight: '1.75',
              margin: '0 0 24px 0'
            }}>
              {current.summary}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                Lead: <strong style={{ color: '#ffffff' }}>{current.author}</strong>
              </div>

              <button
                onClick={() => setActiveModalPaper(current)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 24px',
                  borderRadius: '999px',
                  background: current.color,
                  color: '#020612',
                  border: 'none',
                  fontSize: '0.88rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: `0 0 20px ${current.color}66`,
                  transition: 'transform 0.2s ease'
                }}
              >
                <span>Read Overview</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '36px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          {/* Slide Dots */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {featured.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  width: idx === currentIdx ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: idx === currentIdx ? current.color : 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0
                }}
              />
            ))}
          </div>

          {/* Arrow Buttons */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={prevSlide}
              aria-label="Previous Exploration"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.2s'
              }}
            >
              ❮
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Exploration"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.2s'
              }}
            >
              ❯
            </button>
          </div>
        </div>
      </div>

      {/* Reader Modal */}
      {activeModalPaper && (
        <div
          onClick={() => setActiveModalPaper(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 6, 18, 0.92)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '680px',
              maxHeight: '85vh',
              overflowY: 'auto',
              background: 'rgba(10, 18, 38, 0.98)',
              border: `1px solid ${activeModalPaper.color}66`,
              borderRadius: '24px',
              padding: '40px',
              boxShadow: `0 25px 80px rgba(0, 0, 0, 0.8), 0 0 40px ${activeModalPaper.color}22`,
              position: 'relative'
            }}
          >
            <button
              onClick={() => setActiveModalPaper(null)}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem'
              }}
            >
              ✕
            </button>

            <div style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              fontWeight: '700',
              padding: '4px 12px',
              borderRadius: '999px',
              background: `${activeModalPaper.color}22`,
              color: activeModalPaper.color,
              border: `1px solid ${activeModalPaper.color}55`,
              marginBottom: '16px'
            }}>
              {activeModalPaper.badge}
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif, serif)',
              fontSize: '1.8rem',
              color: '#ffffff',
              margin: '0 0 12px 0'
            }}>
              {activeModalPaper.title}
            </h3>

            <div style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '24px' }}>
              Author: <strong style={{ color: '#ffffff' }}>{activeModalPaper.author}</strong> | {activeModalPaper.date}
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.8', marginBottom: '32px' }}>
              {activeModalPaper.summary}
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                href="/research"
                onClick={() => setActiveModalPaper(null)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 28px',
                  borderRadius: '999px',
                  background: activeModalPaper.color,
                  color: '#020612',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '0.9rem'
                }}
              >
                <span>Go to Full Research Page</span>
                <span>→</span>
              </Link>

              <button
                onClick={() => setActiveModalPaper(null)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '999px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Close Overview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
