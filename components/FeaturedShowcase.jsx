'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { APERIO_ARTICLES, APERIO_OFFICIAL_LINKS } from '../data/articles';

export default function FeaturedShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', 'psychology', 'campaigns'
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [modalLang, setModalLang] = useState('vi'); // 'vi' or 'en'

  // Only feature the 9 official publications/campaigns with real visual posters
  const allVisualArticles = APERIO_ARTICLES.filter((a) => a.image);

  const displayedArticles = selectedCategory === 'all'
    ? allVisualArticles
    : allVisualArticles.filter((a) => a.category === selectedCategory);

  const total = displayedArticles.length;

  // Make sure currentIdx is in bounds if category changes
  const safeIdx = currentIdx < total ? currentIdx : 0;
  const current = displayedArticles[safeIdx] || displayedArticles[0];

  const nextSlide = () => setCurrentIdx((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrentIdx((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    if (isHovered || selectedArticle) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [isHovered, selectedArticle, total]);

  const openModal = (article) => {
    setSelectedArticle(article);
    setModalLang('vi');
  };

  const handleCategorySwitch = (catId) => {
    setSelectedCategory(catId);
    setCurrentIdx(0);
  };

  return (
    <section
      style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '50px 24px 80px 24px',
        position: 'relative'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Section Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '28px'
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
            <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 12px #00f0ff' }}></span>
            FEATURED EXPLORATIONS & CAMPAIGNS
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif, serif)',
            fontSize: 'clamp(2rem, 4vw, 2.7rem)',
            color: '#ffffff',
            margin: 0,
            letterSpacing: '1px'
          }}>
            Các Dự Án &amp; Chiến Dịch Nổi Bật
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href={APERIO_OFFICIAL_LINKS.projectBooklet}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#a78bfa',
              textDecoration: 'none',
              fontSize: '0.88rem',
              fontWeight: '600',
              padding: '8px 18px',
              borderRadius: '999px',
              background: 'rgba(167, 139, 250, 0.08)',
              border: '1px solid rgba(167, 139, 250, 0.3)',
              transition: 'all 0.2s ease'
            }}
          >
            <span>📖 Booklet Dự Án</span>
            <span>↗</span>
          </a>

          <Link
            href="/research"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#38bdf8',
              textDecoration: 'none',
              fontSize: '0.88rem',
              fontWeight: '600',
              padding: '8px 20px',
              borderRadius: '999px',
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              transition: 'all 0.2s ease'
            }}
          >
            <span>Kho Lưu Trữ Đề Tài</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* Main Showcase Stage */}
      <div style={{
        position: 'relative',
        borderRadius: '24px',
        background: 'rgba(6, 14, 32, 0.95)',
        border: `1px solid ${current.themeColor}55`,
        boxShadow: `0 25px 80px rgba(0, 0, 0, 0.75), 0 0 40px ${current.themeColor}22`,
        padding: '36px',
        overflow: 'hidden',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease'
      }}>
        {/* Subtle Ambient Radial Backlight */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle, ${current.themeColor}1a 0%, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          alignItems: 'center'
        }}>
          {/* Visual Display Banner with On-Stage Nav Arrows */}
          <div
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              aspectRatio: '16 / 9',
              background: '#01040a',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6)'
            }}
          >
            <div
              onClick={() => openModal(current)}
              style={{ width: '100%', height: '100%', cursor: 'pointer' }}
              title="Nhấp để đọc bài viết toàn văn"
            >
              <img
                src={current.image}
                alt={current.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease'
                }}
              />

              {/* Hover overlay hint */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(2, 6, 18, 0.75) 0%, transparent 60%)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                padding: '16px'
              }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(0, 0, 0, 0.75)',
                  color: current.themeColor,
                  border: `1px solid ${current.themeColor}44`,
                  letterSpacing: '1px'
                }}>
                  {current.seriesBadge || current.catBadge}
                </span>
                <span style={{
                  fontSize: '0.78rem',
                  color: '#ffffff',
                  background: 'rgba(0, 240, 255, 0.25)',
                  border: '1px solid rgba(0, 240, 255, 0.5)',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <span>Đọc Bài Viết</span>
                  <span>⤢</span>
                </span>
              </div>
            </div>

            {/* Stage Left / Right Quick Buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              aria-label="Previous"
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(6, 16, 38, 0.75)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                zIndex: 5,
                transition: 'all 0.2s ease'
              }}
            >
              ❮
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              aria-label="Next"
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(6, 16, 38, 0.75)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                zIndex: 5,
                transition: 'all 0.2s ease'
              }}
            >
              ❯
            </button>
          </div>

          {/* Editorial Content */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: '700',
                padding: '4px 12px',
                borderRadius: '999px',
                background: `${current.themeColor}1f`,
                color: current.themeColor,
                border: `1px solid ${current.themeColor}44`,
                letterSpacing: '1.2px'
              }}>
                {current.seriesBadge ? `${current.seriesBadge} • ${current.catBadge}` : current.catBadge}
              </span>
              <span style={{ color: '#64748b' }}>•</span>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{current.date}</span>
              <span style={{ color: '#64748b' }}>•</span>
              <span style={{ color: '#38bdf8', fontSize: '0.85rem' }}>{current.readTime}</span>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif, serif)',
              fontSize: 'clamp(1.35rem, 2.2vw, 2rem)',
              color: '#ffffff',
              lineHeight: '1.35',
              margin: '0 0 16px 0'
            }}>
              {current.title}
            </h3>

            <p style={{
              color: '#cbd5e1',
              fontSize: '0.96rem',
              lineHeight: '1.8',
              margin: '0 0 20px 0'
            }}>
              {current.summary}
            </p>

            {/* Highlights tags */}
            {current.highlights && current.highlights.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
                {current.highlights.map((h, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.75rem',
                      color: '#94a3b8',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '3px 10px',
                      borderRadius: '6px'
                    }}
                  >
                    #{h}
                  </span>
                ))}
              </div>
            )}

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '0.86rem' }}>
                <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: current.themeColor }}></span>
                <span style={{ color: '#ffffff', fontWeight: '600' }}>Aperio Research</span>
                <span style={{ color: '#475569' }}>•</span>
                <span>{current.date}</span>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => openModal(current)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 22px',
                    borderRadius: '999px',
                    background: current.themeColor,
                    color: '#020612',
                    border: 'none',
                    fontSize: '0.88rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: `0 0 20px ${current.themeColor}55`,
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <span>Đọc Toàn Văn</span>
                  <span>↗</span>
                </button>

                {current.category === 'campaigns' && (
                  <a
                    href={APERIO_OFFICIAL_LINKS.ambassadorApplyForm}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 20px',
                      borderRadius: '999px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      fontSize: '0.88rem',
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}
                  >
                    <span>Nộp Đơn</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Pills (clean grouping) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginTop: '36px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: `Tất Cả (${allVisualArticles.length})` },
              { id: 'psychology', label: `✦ Series Tâm Lý Học (4)` },
              { id: 'campaigns', label: `📢 Chiến Dịch & Hoạt Động (5)` }
            ].map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySwitch(cat.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    border: isActive ? `1px solid ${current.themeColor}` : '1px solid rgba(255, 255, 255, 0.12)',
                    background: isActive ? `${current.themeColor}22` : 'rgba(255, 255, 255, 0.04)',
                    color: isActive ? '#ffffff' : '#94a3b8',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
            <span>{safeIdx + 1}</span> / <span>{total}</span> • <span style={{ color: current.themeColor }}>{current.seriesBadge || current.catBadge}</span>
          </div>
        </div>

        {/* Thumbnail Selector Grid (NO SCROLLBAR, clean responsive cards) */}
        <div
          className="no-scrollbar"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(${total <= 5 ? '140px' : '100px'}, 1fr))`,
            gap: '10px',
            marginTop: '16px'
          }}
        >
          {displayedArticles.map((p, idx) => {
            const isActive = idx === safeIdx;
            return (
              <div
                key={p.id}
                onClick={() => setCurrentIdx(idx)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  position: 'relative',
                  aspectRatio: '16 / 9',
                  border: isActive ? `2px solid ${p.themeColor}` : '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: isActive ? `0 0 16px ${p.themeColor}66` : 'none',
                  opacity: isActive ? 1 : 0.45,
                  transform: isActive ? 'scale(1.03)' : 'scale(1)',
                  transition: 'all 0.25s ease',
                  background: '#040b1e'
                }}
                title={p.title}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />

                {/* Index Pill in Corner */}
                <div style={{
                  position: 'absolute',
                  top: '5px',
                  left: '6px',
                  fontSize: '0.62rem',
                  fontWeight: '700',
                  padding: '1px 5px',
                  borderRadius: '4px',
                  background: isActive ? p.themeColor : 'rgba(0, 0, 0, 0.75)',
                  color: isActive ? '#020612' : '#cbd5e1'
                }}>
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* Cyber Glowing Progress Accent Bar */}
        <div style={{
          width: '100%',
          height: '3px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '999px',
          overflow: 'hidden',
          marginTop: '18px'
        }}>
          <div style={{
            width: `${((safeIdx + 1) / total) * 100}%`,
            height: '100%',
            background: `linear-gradient(90deg, #00f0ff, ${current.themeColor})`,
            boxShadow: `0 0 10px ${current.themeColor}`,
            transition: 'width 0.35s ease'
          }} />
        </div>
      </div>

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <div
          onClick={() => setSelectedArticle(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 6, 18, 0.94)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '880px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'rgba(10, 18, 38, 0.98)',
              border: `1px solid ${selectedArticle.themeColor}66`,
              borderRadius: '24px',
              padding: '32px',
              boxShadow: `0 30px 90px rgba(0, 0, 0, 0.85), 0 0 50px ${selectedArticle.themeColor}22`,
              position: 'relative'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              aria-label="Đóng"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              ✕
            </button>

            {/* Poster Header Banner */}
            {selectedArticle.image && (
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '24px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}>
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            )}

            {/* Meta Row with Language Switch */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  background: `${selectedArticle.themeColor}22`,
                  color: selectedArticle.themeColor,
                  border: `1px solid ${selectedArticle.themeColor}55`
                }}>
                  {selectedArticle.seriesBadge ? `${selectedArticle.seriesBadge} • ${selectedArticle.catBadge}` : selectedArticle.catBadge}
                </span>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{selectedArticle.date}</span>
                <span style={{ color: '#64748b' }}>•</span>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Aperio Research</span>
              </div>

              {/* Language Switch */}
              <div style={{
                display: 'inline-flex',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '2px'
              }}>
                <button
                  onClick={() => setModalLang('vi')}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '999px',
                    border: 'none',
                    background: modalLang === 'vi' ? selectedArticle.themeColor : 'transparent',
                    color: modalLang === 'vi' ? '#020612' : '#ffffff',
                    fontWeight: '700',
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  Tiếng Việt
                </button>
                <button
                  onClick={() => setModalLang('en')}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '999px',
                    border: 'none',
                    background: modalLang === 'en' ? selectedArticle.themeColor : 'transparent',
                    color: modalLang === 'en' ? '#020612' : '#ffffff',
                    fontWeight: '700',
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  English
                </button>
              </div>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif, serif)',
              fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
              color: '#ffffff',
              margin: '0 0 16px 0',
              lineHeight: '1.3'
            }}>
              {modalLang === 'vi' ? selectedArticle.title : (selectedArticle.titleEn || selectedArticle.title)}
            </h3>

            {/* Article Content */}
            <div style={{
              color: '#cbd5e1',
              fontSize: '0.98rem',
              lineHeight: '1.85',
              margin: '0 0 28px 0',
              whiteSpace: 'pre-line',
              padding: '16px 0',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              {modalLang === 'vi' ? selectedArticle.contentVi : (selectedArticle.contentEn || selectedArticle.contentVi)}
            </div>

            {/* Academic References Section */}
            {selectedArticle.references && selectedArticle.references.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <h4 style={{
                  fontSize: '0.85rem',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: '#38bdf8',
                  marginBottom: '12px'
                }}>
                  Tài Liệu Tham Khảo Học Thuật (References &amp; DOIs)
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.7' }}>
                  {selectedArticle.references.map((ref, idx) => (
                    <li key={idx} style={{ marginBottom: '8px' }}>
                      {ref.text}{' '}
                      {ref.doi && (
                        <a
                          href={ref.doi}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#00f0ff', textDecoration: 'underline', marginLeft: '4px' }}
                        >
                          [DOI]
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bottom Actions */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a
                href={APERIO_OFFICIAL_LINKS.projectBooklet}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '999px',
                  background: selectedArticle.themeColor,
                  color: '#020612',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '0.92rem'
                }}
              >
                <span>📖 Đọc Booklet Dự Án</span>
                <span>↗</span>
              </a>

              <Link
                href="/research"
                onClick={() => setSelectedArticle(null)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '999px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.92rem',
                  fontWeight: '600'
                }}
              >
                <span>Toàn Bộ Kho Lưu Trữ</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
