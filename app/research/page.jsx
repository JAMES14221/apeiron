'use client';

import { useState } from 'react';
import Link from 'next/link';

const RESEARCH_PAPERS = [
  {
    id: 0,
    category: 'materials',
    catBadge: 'MATERIALS SCIENCE',
    meta: 'PTNK · 2025 · Environmental Engineering',
    title: 'Biodegradable Cement from Agricultural Waste',
    author: 'Nhóm Nghiên cứu Sinh thái & Khoa học Vật liệu · PTNK',
    abstract: 'Nghiên cứu tổng hợp xi măng sinh học tự phân hủy có nguồn gốc từ phế phẩm nông nghiệp (vỏ trấu và bã mía). Vật liệu mới giúp giảm đến 68% lượng khí thải carbon so với xi măng Portland truyền thống, mở ra hướng đi bền vững cho hạ tầng kiến trúc xanh tại các vùng nông nghiệp nhiệt đới.',
    highlights: ['-68% Carbon Footprint', 'Bio-aggregate Matrix', 'Circular Economy'],
    symbol: '🌾',
    themeColor: '#34d399',
    coverImage: '/images/ambassador_closed.png'
  },
  {
    id: 1,
    category: 'ai',
    catBadge: 'NEUROSCIENCE & AI',
    meta: 'VNU-HCM · 2024 · Computational Neuroscience',
    title: 'AI-Assisted Early Detection of Neurological Disorders',
    author: 'CLB Trí tuệ Nhân tạo & Y Sinh · ĐHQG-HCM',
    abstract: 'Ứng dụng mô hình mạng nơ-ron đồ thị (Graph Neural Networks) kết hợp thị giác máy tính để phân tích biến đổi vi mô trên ảnh cộng hưởng từ MRI não bộ. Phương pháp đạt độ chính xác 94.2% trong việc chẩn đoán sớm các hội chứng suy giảm nhận thức trước khi bộc lộ triệu chứng lâm sàng.',
    highlights: ['94.2% Accuracy', 'Graph Neural Networks', 'Early Biomarkers'],
    symbol: '🧠',
    themeColor: '#c084fc',
    coverImage: '/images/research_closed.jpg'
  },
  {
    id: 2,
    category: 'chronobiology',
    catBadge: 'CHRONOBIOLOGY',
    meta: 'PTNK · 2024 · Cognitive Chronobiology',
    title: 'The Impact of Sleep Quality on Academic Performance',
    author: 'Nhóm Nghiên cứu Sức khỏe Học đường & Sinh học Thực nghiệm',
    abstract: 'Nghiên cứu định lượng kéo dài 6 tháng trên 850 học sinh trung học phổ thông, theo dõi chu kỳ nhịp sinh học REM và kiến thức ghi nhớ sâu. Kết quả chỉ ra giấc ngủ sâu tối ưu trước 23h30 cải thiện đáng kể khả năng tư duy giải quyết vấn đề phức tạp và ổn định cảm xúc thi cử.',
    highlights: ['N = 850 Cohort Study', 'REM Cycle Tracking', 'Cognitive Resilience'],
    symbol: '🌙',
    themeColor: '#38bdf8',
    coverImage: '/images/certificate_reveal.png'
  },
  {
    id: 3,
    category: 'psychology',
    catBadge: 'PSYCHOLOGY',
    meta: 'Aperio Codex · 2024 · Behavioral Psychology',
    title: 'Vì Sao Học Sinh Ngại Đến Phòng Tư Vấn Tâm Lý?',
    author: 'Ban Nghiên Cứu Tâm Lý Học Đường Đợt 1',
    abstract: 'Khảo sát thực nghiệm diện rộng về các rào cản tâm lý, xã hội và định kiến ngăn trở học sinh tiếp cận dịch vụ hỗ trợ tâm lý trường học. Phân tích 4 trục rào cản chính: Fear of being judged, Social Stigma, Privacy concerns và Trust issues.',
    highlights: ['Invisible Barriers', 'School Stigma Matrix', 'Trust & Privacy Protocols'],
    symbol: '🌱',
    themeColor: '#f43f5e',
    coverImage: '/images/research_initiative_psychology.png'
  },
  {
    id: 4,
    category: 'methodology',
    catBadge: 'METHODOLOGY',
    meta: 'Aperio Codex · 2024 · Research Methodology',
    title: 'Từ Những Khoảng Trống Đến Đề Tài Nghiên Cứu',
    author: 'Dự án Phương pháp luận Khoa học Trẻ Aperio',
    abstract: 'Cẩm nang phương pháp luận phát hiện Research Gaps trong các tài liệu khoa học quốc tế, chuyển hóa câu hỏi tò mò ban đầu thành đề cương nghiên cứu khả thi và giàu giá trị thực tiễn.',
    highlights: ['Research Gap Identification', 'Hypothesis Design', 'Literature Review Matrix'],
    symbol: '🔍',
    themeColor: '#fbbf24',
    coverImage: '/images/ambassador_gen01.png'
  },
  {
    id: 5,
    category: 'methodology',
    catBadge: 'METHODOLOGY',
    meta: 'Aperio Codex · 2024 · Information Science',
    title: 'Tìm, Đọc Và Chọn Lọc Tài Liệu Nghiên Cứu',
    author: 'Tổ Cố vấn Kỹ năng Học thuật Aperio',
    abstract: 'Kỹ năng tìm kiếm học thuật trên PubMed, Google Scholar, arXiv, cùng kỹ thuật đọc chéo (critical skimming) giúp sinh viên và học sinh xử lý khối lượng bài báo khoa học lớn trong thời gian ngắn.',
    highlights: ['Boolean Queries', 'Critical Skimming', 'Zotero & Citation Ethics'],
    symbol: '📚',
    themeColor: '#00f0ff',
    coverImage: '/images/research_closed.jpg'
  }
];

export default function ResearchPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPaper, setSelectedPaper] = useState(null);

  const filteredPapers = activeCategory === 'all'
    ? RESEARCH_PAPERS
    : RESEARCH_PAPERS.filter((p) => p.category === activeCategory);

  return (
    <div className="research-page-container" style={{ minHeight: '100vh', padding: '40px 24px 100px 24px' }}>
      {/* Research Hero Header */}
      <header className="research-archive-hero" style={{ maxWidth: '1100px', margin: '0 auto 50px auto', textAlign: 'center' }}>
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
          ✦ CURATED STUDENT PUBLICATIONS ✦
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
          Research Archive
        </h1>

        <p style={{
          color: '#94a3b8',
          fontSize: '1.05rem',
          lineHeight: '1.8',
          maxWidth: '700px',
          margin: '0 auto 36px auto'
        }}>
          Tập hợp các công trình nghiên cứu và cẩm nang phương pháp luận khoa học được biên soạn, phản biện và chọn lọc bởi mạng lưới học giả trẻ Aperio Research.
        </p>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'Tất Cả (6)' },
            { id: 'materials', label: 'Khoa Học Vật Liệu' },
            { id: 'ai', label: 'Trí Tuệ Nhân Tạo & Y Sinh' },
            { id: 'chronobiology', label: 'Nhịp Sinh Học' },
            { id: 'psychology', label: 'Tâm Lý Học' },
            { id: 'methodology', label: 'Phương Pháp Luận' }
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '999px',
                  border: isActive ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.12)',
                  background: isActive ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  color: isActive ? '#00f0ff' : '#94a3b8',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 0 15px rgba(0, 240, 255, 0.3)' : 'none'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Papers Grid */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
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
              border: '1px solid rgba(56, 189, 248, 0.18)',
              transition: 'border-color 0.3s ease, transform 0.3s ease',
              alignItems: 'center'
            }}
          >
            {/* Visual Cover Header */}
            <div style={{
              height: '210px',
              borderRadius: '14px',
              background: `radial-gradient(circle at 50% 50%, rgba(13, 59, 143, 0.35) 0%, rgba(2, 6, 18, 0.85) 75%)`,
              border: `1px solid ${paper.themeColor}33`,
              position: 'relative',
              overflow: 'hidden'
            }}>
              {paper.coverImage ? (
                <>
                  <img
                    src={paper.coverImage}
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
                      {paper.catBadge}
                    </span>
                  </div>
                </>
              ) : (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '3rem', filter: `drop-shadow(0 0 16px ${paper.themeColor})` }}>
                    {paper.symbol}
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    letterSpacing: '2px',
                    color: paper.themeColor,
                    textTransform: 'uppercase'
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
                  {paper.catBadge}
                </span>
                <span style={{ color: '#475569' }}>•</span>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{paper.meta}</span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-serif, serif)',
                fontSize: '1.45rem',
                color: '#ffffff',
                lineHeight: '1.3',
                margin: '0 0 12px 0'
              }}>
                {paper.title}
              </h2>

              <p style={{
                color: '#cbd5e1',
                fontSize: '0.92rem',
                lineHeight: '1.7',
                margin: '0 0 18px 0'
              }}>
                {paper.abstract}
              </p>

              {/* Highlights Chips */}
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

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <span style={{ color: '#64748b', fontSize: '0.82rem' }}>
                  Tác giả: <strong style={{ color: '#cbd5e1' }}>{paper.author}</strong>
                </span>

                <button
                  onClick={() => setSelectedPaper(paper)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 18px',
                    borderRadius: '999px',
                    background: 'rgba(0, 240, 255, 0.1)',
                    border: '1px solid rgba(0, 240, 255, 0.4)',
                    color: '#00f0ff',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>Read Full Overview</span>
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
              maxWidth: '740px',
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
              aria-label="Close reader modal"
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
            {selectedPaper.coverImage && (
              <div style={{
                borderRadius: '14px',
                overflow: 'hidden',
                marginBottom: '20px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                maxHeight: '260px'
              }}>
                <img
                  src={selectedPaper.coverImage}
                  alt={selectedPaper.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}

            <div style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              fontWeight: '700',
              padding: '4px 12px',
              borderRadius: '999px',
              background: `${selectedPaper.themeColor}22`,
              color: selectedPaper.themeColor,
              border: `1px solid ${selectedPaper.themeColor}55`,
              marginBottom: '16px'
            }}>
              {selectedPaper.catBadge}
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif, serif)',
              fontSize: '1.8rem',
              color: '#ffffff',
              margin: '0 0 12px 0'
            }}>
              {selectedPaper.title}
            </h3>

            <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '20px' }}>
              Tác giả: <strong style={{ color: '#ffffff' }}>{selectedPaper.author}</strong> | {selectedPaper.meta}
            </div>

            <h4 style={{ color: '#00f0ff', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
              Tóm Tắt Công Trình
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.8', marginBottom: '24px' }}>
              {selectedPaper.abstract}
            </p>

            <h4 style={{ color: '#38bdf8', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>
              Điểm Nổi Bật &amp; Đóng Góp
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedPaper.highlights.map((h, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0', fontSize: '0.92rem' }}>
                  <span style={{ color: selectedPaper.themeColor }}>◈</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="https://forms.gle/F9evDGJCJm1P4XRz5"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 28px',
                  borderRadius: '999px',
                  background: '#00f0ff',
                  color: '#020612',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)'
                }}
              >
                <span>Submit Follow-up Research</span>
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
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
