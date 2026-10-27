'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { APERIO_ARTICLES, APERIO_OFFICIAL_LINKS } from '../data/articles';

export default function SpotlightSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef(null);

  const navigationItems = [
    {
      title: 'Home',
      category: 'Điều Hướng',
      desc: 'Trang chủ Aperio Research & các dự án khoa học',
      url: '/',
      symbol: '🏛️'
    },
    {
      title: 'About Aperio',
      category: 'Điều Hướng',
      desc: 'Sứ mệnh bình dân hóa nghiên cứu khoa học, triết lý và trụ cột',
      url: '/about',
      symbol: '✦'
    },
    {
      title: 'Research Archive',
      category: 'Điều Hướng',
      desc: 'Kho lưu trữ toàn bộ các đề tài tâm lý học, phương pháp luận và chuyên đề',
      url: '/research',
      symbol: '📜'
    },
    {
      title: 'Connect & Opportunities',
      category: 'Điều Hướng',
      desc: 'Tuyển dụng đại sứ truyền thông, ban nghiên cứu và liên hệ hợp tác',
      url: '/connect',
      symbol: '🤝'
    }
  ];

  const officialLinks = [
    {
      title: 'Booklet Dự Án Aperio (Heyzine Flipbook)',
      category: 'Tài Liệu Chính Thức',
      desc: 'Xem trực tuyến tài liệu giới thiệu toàn diện tầm nhìn và cấu trúc Aperio',
      url: APERIO_OFFICIAL_LINKS.projectBooklet,
      symbol: '📖',
      external: true
    },
    {
      title: 'Đơn Đăng Ký Đại Sứ Truyền Thông Gen 0.1',
      category: 'Đăng Ký / Ứng Tuyển',
      desc: 'Một vòng đơn, không phỏng vấn - Lan tỏa tri thức nghiên cứu',
      url: APERIO_OFFICIAL_LINKS.ambassadorApplyForm,
      symbol: '📢',
      external: true
    },
    {
      title: 'JD Chi Tiết: Đại Sứ Truyền Thông',
      category: 'Tài Liệu Tuyển Dụng',
      desc: 'Mô tả quyền lợi, trách nhiệm và tiêu chuẩn xét duyệt Đại sứ',
      url: APERIO_OFFICIAL_LINKS.ambassadorJD,
      symbol: '📄',
      external: true
    },
    {
      title: 'Đơn Dự Bị Ban Nghiên Cứu',
      category: 'Đăng Ký / Ứng Tuyển',
      desc: 'Đăng ký danh sách chờ xét tuyển Ban Nghiên cứu các đợt tiếp theo',
      url: APERIO_OFFICIAL_LINKS.researchApplyForm,
      symbol: '🔬',
      external: true
    },
    {
      title: 'Fanpage Facebook Aperio Research',
      category: 'Kênh Thông Tin',
      desc: 'Kênh thông tin cập nhật các bài viết chuyên đề và kết quả tuyển chọn',
      url: APERIO_OFFICIAL_LINKS.fanpage,
      symbol: '🌐',
      external: true
    }
  ];

  const articleItems = APERIO_ARTICLES.map((art) => ({
    title: art.title,
    titleEn: art.titleEn || '',
    category: art.catBadge,
    desc: art.summary,
    url: '/research',
    symbol: art.symbol || '📜',
    highlights: (art.highlights || []).join(' ')
  }));

  const searchData = [...navigationItems, ...officialLinks, ...articleItems];

  const filtered = searchData.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.titleEn && item.titleEn.toLowerCase().includes(q)) ||
      item.desc.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.highlights && item.highlights.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === ' ' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)
      ) {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleItemSelect = (item) => {
    onClose();
    if (item.external) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      router.push(item.url);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        handleItemSelect(filtered[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(2, 6, 18, 0.85)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px 20px 20px 20px'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          background: 'rgba(10, 18, 38, 0.98)',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          borderRadius: '20px',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 240, 255, 0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '75vh'
        }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '18px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <span style={{ color: '#00f0ff', fontSize: '1.2rem' }}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Tìm đề tài, bài viết, chiến dịch tuyển dụng, liên kết..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '1rem'
            }}
          />
          <kbd style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '6px',
            padding: '2px 8px',
            color: '#94a3b8',
            fontSize: '0.75rem'
          }}>
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div style={{ overflowY: 'auto', padding: '8px' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '36px 20px', textAlign: 'center', color: '#64748b' }}>
              Không tìm thấy kết quả nào phù hợp với "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={idx}
                  onClick={() => handleItemSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: isSelected ? 'rgba(0, 240, 255, 0.12)' : 'transparent',
                    border: isSelected ? '1px solid rgba(0, 240, 255, 0.3)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{ fontSize: '1.4rem' }}>{item.symbol}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span style={{
                        color: '#ffffff',
                        fontWeight: '600',
                        fontSize: '0.92rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {item.title}
                      </span>
                      <span style={{
                        fontSize: '0.68rem',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: '#38bdf8',
                        whiteSpace: 'nowrap'
                      }}>
                        {item.category}
                      </span>
                    </div>
                    <div style={{
                      color: '#94a3b8',
                      fontSize: '0.8rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.desc}
                    </div>
                  </div>
                  {item.external && (
                    <span style={{ color: '#00f0ff', fontSize: '0.8rem' }}>↗</span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          background: 'rgba(5, 10, 24, 0.8)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.75rem',
          color: '#64748b'
        }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>↑↓ để di chuyển</span>
            <span>↵ để chọn</span>
            <span>ESC để đóng</span>
          </div>
          <span>Aperio Quick Navigation</span>
        </div>
      </div>
    </div>
  );
}
