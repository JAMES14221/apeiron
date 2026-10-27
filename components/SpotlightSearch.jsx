'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SpotlightSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef(null);

  const searchData = [
    {
      title: 'Home',
      category: 'Navigation',
      desc: 'Return to the Aperio Research home portal & scientific frontiers',
      url: '/',
      symbol: '🏛️'
    },
    {
      title: 'About Aperio',
      category: 'Navigation',
      desc: 'Our student-initiated mission, philosophy, and foundational pillars',
      url: '/about',
      symbol: '✦'
    },
    {
      title: 'Research Archive',
      category: 'Navigation',
      desc: 'Browse student manuscripts across Materials, AI, and Behavioral Science',
      url: '/research',
      symbol: '📜'
    },
    {
      title: 'Connect & Opportunities',
      category: 'Navigation',
      desc: 'Research tracks, student guild, mentoring, and institutional inquiry',
      url: '/connect',
      symbol: '🤝'
    },
    {
      title: 'Apply Research (Google Form)',
      category: 'Actions',
      desc: 'Submit your student research proposal or completed manuscript for review',
      url: 'https://forms.gle/F9evDGJCJm1P4XRz5',
      symbol: '📝',
      external: true
    },
    {
      title: 'Biodegradable Cement from Agricultural Waste',
      category: 'Publications',
      desc: 'Rice husk ash and bagasse fibers as sustainable supplementary cementitious materials.',
      url: '/research',
      symbol: '🔬'
    },
    {
      title: 'AI-Assisted Early Detection of Neurological Disorders',
      category: 'Publications',
      desc: 'Deep convolutional networks for micro-tremor and speech acoustic biomarkers.',
      url: '/research',
      symbol: '🧠'
    },
    {
      title: 'The Impact of Sleep Quality on Academic Performance',
      category: 'Publications',
      desc: 'Chronobiology investigation into circadian rhythms and executive function in students.',
      url: '/research',
      symbol: '⏳'
    },
    {
      title: 'Tâm Lý Học: Hiểu Để Kết Nối Với Chính Mình',
      category: 'Methodology Guides',
      desc: 'Khám phá cấu trúc tâm lý học hành vi, nhận thức nội tâm và kết nối bản thân.',
      url: '/research',
      symbol: '💡'
    },
    {
      title: 'Từ Những Khoảng Trống Đến Đề Tài Nghiên Cứu',
      category: 'Methodology Guides',
      desc: 'Cách xác định Research Gap trong tài liệu và chuyển hóa thành câu hỏi khoa học.',
      url: '/research',
      symbol: '🔍'
    },
    {
      title: 'Tìm, Đọc Và Chọn Lọc Tài Liệu Nghiên Cứu',
      category: 'Methodology Guides',
      desc: 'Kỹ năng tìm kiếm học thuật trên Google Scholar, PubMed, Sci-Hub và lập ma trận tài liệu.',
      url: '/research',
      symbol: '📚'
    }
  ];

  const filtered = searchData.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
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
      // Space opens if not in input
      if (
        e.key === ' ' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)
      ) {
        e.preventDefault();
        onClose(false); // toggle
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
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
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
          maxWidth: '640px',
          background: 'rgba(10, 18, 38, 0.98)',
          border: '1px solid rgba(0, 240, 255, 0.4)',
          borderRadius: '20px',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 240, 255, 0.2)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
          background: 'rgba(6, 12, 28, 0.6)'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search papers, topics, methodology, pages... (ESC to exit)"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '1rem',
              fontFamily: 'inherit'
            }}
          />
          <span style={{
            fontSize: '0.72rem',
            padding: '4px 8px',
            borderRadius: '6px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#94a3b8'
          }}>
            ESC
          </span>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '360px', overflowY: 'auto', padding: '8px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 16px', color: '#64748b', fontSize: '0.92rem' }}>
              No matching research or topics found.
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
                    padding: '12px 14px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(0, 240, 255, 0.12)' : 'transparent',
                    border: isSelected ? '1px solid rgba(0, 240, 255, 0.35)' : '1px solid transparent',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{ fontSize: '1.4rem' }}>{item.symbol}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                      <span style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: '600' }}>
                        {item.title}
                      </span>
                      <span style={{
                        fontSize: '0.68rem',
                        padding: '2px 7px',
                        borderRadius: '999px',
                        background: 'rgba(56, 189, 248, 0.12)',
                        color: '#38bdf8',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {item.category}
                      </span>
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.desc}
                    </div>
                  </div>
                  {isSelected && (
                    <span style={{ color: '#00f0ff', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      ↵
                    </span>
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
          padding: '10px 18px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(4, 9, 20, 0.7)',
          fontSize: '0.75rem',
          color: '#64748b'
        }}>
          <span>Navigate with <kbd style={{ color: '#94a3b8' }}>↑</kbd> <kbd style={{ color: '#94a3b8' }}>↓</kbd></span>
          <span>Open with <kbd style={{ color: '#94a3b8' }}>Enter</kbd></span>
          <span>Close with <kbd style={{ color: '#94a3b8' }}>Esc</kbd></span>
        </div>
      </div>
    </div>
  );
}
