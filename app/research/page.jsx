'use client';

import { useState } from 'react';
import Link from 'next/link';
import { APERIO_ARTICLES, APERIO_OFFICIAL_LINKS } from '../../data/articles';

export default function ResearchPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [modalLang, setModalLang] = useState('vi');

  const categories = [
    { id: 'all', label: 'Tất Cả Đề Tài & Bài Viết' },
    { id: 'psychology', label: 'Tâm Lý Học' },
    { id: 'methodology', label: 'Phương Pháp Luận' },
    { id: 'campaigns', label: 'Chiến Dịch & Hoạt Động' }
  ];

  const filteredPapers = APERIO_ARTICLES.filter((paper) => {
    const matchesCat = activeCategory === 'all' || paper.category === activeCategory;
    if (!matchesCat) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      paper.title.toLowerCase().includes(q) ||
      (paper.titleEn && paper.titleEn.toLowerCase().includes(q)) ||
      paper.summary.toLowerCase().includes(q) ||
      paper.author.toLowerCase().includes(q) ||
      paper.catBadge.toLowerCase().includes(q) ||
      (paper.highlights && paper.highlights.some((h) => h.toLowerCase().includes(q)))
    );
  });

  const openReader = (paper) => {
    setSelectedPaper(paper);
    setModalLang('vi');
  };

  return (
    <div className="research-page-container" style={{ minHeight: '100vh', padding: '40px 24px 100px 24px' }}>
      {/* Research Hero Header */}
      <header className="research-archive-hero" style={{ maxWidth: '1100px', margin: '0 auto 40px auto', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 18px',
          borderRadius: '999px',
          background: 'rgba(0, 240, 255, 0.08)',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          color: '#00f0ff',
          fontSize: '0.8rem',
          letterSpacing: '2px',
          fontWeight: '700',
          textTransform: 'uppercase',
          marginBottom: '20px'
        }}>
          ✦ APERIO RESEARCH ARCHIVE &amp; PUBLICATIONS ✦
        </div>

        <h1 style={{
          fontFamily: 'var(--font-serif, serif)',
          fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
          fontWeight: '700',
          color: '#ffffff',
          letterSpacing: '2px',
          margin: '0 0 16px 0',
          textShadow: '0 2px 20px rgba(0, 0, 0, 0.7)'
        }}>
          Kho Lưu Trữ Công Trình &amp; Chuyên Đề
        </h1>

        <p style={{
          color: '#94a3b8',
          fontSize: '1.05rem',
          lineHeight: '1.8',
          maxWidth: '740px',
          margin: '0 auto 32px auto'
        }}>
          Tập hợp các bài viết học thuật, khảo sát thực nghiệm tâm lý học đường, cẩm nang phương pháp luận và các chiến dịch nghiên cứu cộng đồng do Aperio Research khởi xướng.
        </p>

        {/* Live Search Bar */}
        <div style={{ maxWidth: '540px', margin: '0 auto 28px auto', position: 'relative' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên bài báo, chủ đề, từ khóa (toxic, barnum, hạnh phúc...)"
            style={{
              width: '100%',
              padding: '14px 20px 14px 44px',
              borderRadius: '999px',
              background: 'rgba(10, 18, 38, 0.95)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              color: '#ffffff',
              fontSize: '0.92rem',
              outline: 'none',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)'
            }}
          />
          <span style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#00f0ff', fontSize: '1rem' }}>
            🔍
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = cat.id === 'all'
              ? APERIO_ARTICLES.length
              : APERIO_ARTICLES.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '999px',
                  border: isActive ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.12)',
                  background: isActive ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  color: isActive ? '#00f0ff' : '#94a3b8',
                  fontSize: '0.86rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 0 15px rgba(0, 240, 255, 0.3)' : 'none'
                }}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>
      </header>

      {/* Results Count */}
      <div style={{ maxWidth: '1100px', margin: '0 auto 24px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748b', fontSize: '0.85rem' }}>
        <span>Hiển thị <strong>{filteredPapers.length}</strong> ấn phẩm &amp; chuyên đề</span>
        <a
          href={APERIO_OFFICIAL_LINKS.projectBooklet}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#38bdf8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
        >
          <span>Xem Booklet Lật Trang Toàn Dự Án</span>
          <span>↗</span>
        </a>
      </div>

      {/* Papers Grid */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {filteredPapers.map((paper) => (
          <article
            key={paper.id}
            className="cyber-card"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '28px',
              padding: '28px',
              borderRadius: '20px',
              background: 'rgba(10, 18, 38, 0.92)',
              border: `1px solid ${paper.themeColor}33`,
              transition: 'border-color 0.3s ease, transform 0.3s ease',
              alignItems: 'center',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Visual Cover Header: Image OR Cyber Monogram Placeholder */}
            <div
              onClick={() => openReader(paper)}
              style={{
                height: '210px',
                borderRadius: '14px',
                background: `radial-gradient(ellipse at 70% 30%, ${paper.themeColor}22 0%, rgba(2, 6, 18, 0.9) 75%)`,
                border: `1px solid ${paper.themeColor}44`,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              title="Nhấp để đọc bài viết"
            >
              {paper.image ? (
                <>
                  <img
                    src={paper.image}
                    alt={paper.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(2, 6, 18, 0.85) 0%, transparent 60%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '12px'
                  }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      letterSpacing: '1.5px',
                      color: paper.themeColor,
                      textTransform: 'uppercase',
                      background: 'rgba(0, 0, 0, 0.75)',
                      padding: '3px 10px',
                      borderRadius: '6px',
                      border: `1px solid ${paper.themeColor}44`
                    }}>
                      {paper.seriesBadge ? `${paper.seriesBadge} • ${paper.catBadge}` : paper.catBadge}
                    </span>
                  </div>
                </>
              ) : (
                <div style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '20px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '3rem', filter: `drop-shadow(0 0 16px ${paper.themeColor})` }}>
                    {paper.symbol}
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    letterSpacing: '2px',
                    color: paper.themeColor,
                    textTransform: 'uppercase',
                    background: `${paper.themeColor}1a`,
                    padding: '4px 12px',
                    borderRadius: '999px',
                    border: `1px solid ${paper.themeColor}33`
                  }}>
                    {paper.catBadge}
                  </span>
                </div>
              )}
            </div>

            {/* Paper Content */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  letterSpacing: '1.5px',
                  color: paper.themeColor,
                  textTransform: 'uppercase'
                }}>
                  {paper.seriesBadge ? `${paper.seriesBadge} • ${paper.catBadge}` : paper.catBadge}
                </span>
                <span style={{ color: '#475569' }}>•</span>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{paper.date}</span>
                <span style={{ color: '#475569' }}>•</span>
                <span style={{ color: '#38bdf8', fontSize: '0.8rem' }}>{paper.readTime}</span>
              </div>

              <h2
                onClick={() => openReader(paper)}
                style={{
                  fontFamily: 'var(--font-serif, serif)',
                  fontSize: '1.35rem',
                  color: '#ffffff',
                  lineHeight: '1.35',
                  margin: '0 0 12px 0',
                  cursor: 'pointer'
                }}
              >
                {paper.title}
              </h2>

              <p style={{
                color: '#cbd5e1',
                fontSize: '0.92rem',
                lineHeight: '1.7',
                margin: '0 0 18px 0'
              }}>
                {paper.summary}
              </p>

              {/* Highlights Chips */}
              {paper.highlights && paper.highlights.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {paper.highlights.map((h, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.74rem',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#94a3b8'
                      }}
                    >
                      ✦ {h}
                    </span>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: paper.themeColor }}></span>
                  <span>Aperio Research • {paper.date}</span>
                </span>

                <button
                  onClick={() => openReader(paper)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 18px',
                    borderRadius: '999px',
                    background: `${paper.themeColor}22`,
                    border: `1px solid ${paper.themeColor}66`,
                    color: paper.themeColor,
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>Đọc Toàn Văn &amp; Trích Dẫn</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Reader Modal */}
      {selectedPaper && (
        <div
          onClick={() => setSelectedPaper(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 6, 18, 0.94)',
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
              maxWidth: '840px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'rgba(10, 18, 38, 0.98)',
              border: `1px solid ${selectedPaper.themeColor}55`,
              borderRadius: '24px',
              padding: '36px',
              boxShadow: `0 25px 80px rgba(0, 0, 0, 0.8), 0 0 40px ${selectedPaper.themeColor}22`,
              position: 'relative'
            }}
          >
            <button
              onClick={() => setSelectedPaper(null)}
              aria-label="Đóng"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#cbd5e1',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              ✕
            </button>

            {/* Poster cover if present */}
            {selectedPaper.image && (
              <div style={{
                borderRadius: '14px',
                overflow: 'hidden',
                marginBottom: '20px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                maxHeight: '260px'
              }}>
                <img
                  src={selectedPaper.image}
                  alt={selectedPaper.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}

            {/* Language & Meta Row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  background: `${selectedPaper.themeColor}22`,
                  color: selectedPaper.themeColor,
                  border: `1px solid ${selectedPaper.themeColor}55`
                }}>
                  {selectedPaper.seriesBadge ? `${selectedPaper.seriesBadge} • ${selectedPaper.catBadge}` : selectedPaper.catBadge}
                </span>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{selectedPaper.date}</span>
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
                    background: modalLang === 'vi' ? selectedPaper.themeColor : 'transparent',
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
                    background: modalLang === 'en' ? selectedPaper.themeColor : 'transparent',
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
              fontSize: '1.6rem',
              color: '#ffffff',
              margin: '0 0 16px 0',
              lineHeight: '1.3'
            }}>
              {modalLang === 'vi' ? selectedPaper.title : (paperTitleEn(selectedPaper))}
            </h3>

            {/* Article Content */}
            <div style={{
              color: '#cbd5e1',
              fontSize: '0.98rem',
              lineHeight: '1.85',
              margin: '0 0 24px 0',
              whiteSpace: 'pre-line',
              padding: '16px 0',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              {modalLang === 'vi' ? selectedPaper.contentVi : (selectedPaper.contentEn || selectedPaper.contentVi)}
            </div>

            {/* Academic References Section */}
            {selectedPaper.references && selectedPaper.references.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{
                  fontSize: '0.85rem',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: '#38bdf8',
                  marginBottom: '10px'
                }}>
                  Tài Liệu Tham Khảo Học Thuật (References &amp; DOIs)
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.7' }}>
                  {selectedPaper.references.map((ref, idx) => (
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

            {/* Highlights list */}
            {selectedPaper.highlights && selectedPaper.highlights.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <h4 style={{
                  fontSize: '0.85rem',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: '#a78bfa',
                  marginBottom: '10px'
                }}>
                  Điểm Nổi Bật
                </h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {selectedPaper.highlights.map((h, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.8rem',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#e2e8f0'
                      }}
                    >
                      ✦ {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
                  background: selectedPaper.themeColor,
                  color: '#020612',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '0.9rem'
                }}
              >
                <span>📖 Xem Booklet Dự Án</span>
                <span>↗</span>
              </a>

              <button
                onClick={() => setSelectedPaper(null)}
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
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function paperTitleEn(paper) {
  return paper.titleEn || paper.title;
}
