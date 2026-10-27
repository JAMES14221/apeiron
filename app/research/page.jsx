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
    themeColor: '#34d399'
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
    themeColor: '#c084fc'
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
    themeColor: '#38bdf8'
  },
  {
    id: 3,
    category: 'psychology',
    catBadge: 'PSYCHOLOGY',
    meta: 'Aperio Codex · 2024 · Behavioral Psychology',
    title: 'Tâm Lý Học: Hiểu Để Kết Nối Với Chính Mình',
    author: 'Ban Biên tập Chuyên đề Tâm lý học Aperio',
    abstract: 'Khám phá cấu trúc tâm lý thanh thiếu niên trong thời đại số hóa, cách nhận diện hội chứng FOMO và xây dựng ranh giới nội tâm vững vàng để duy trì sự an yên và tự chủ học thuật.',
    highlights: ['Identity Formation', 'Digital Well-being', 'Emotional Regulation'],
    symbol: '🌱',
    themeColor: '#f43f5e'
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
    themeColor: '#fbbf24'
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
    themeColor: '#00f0ff'
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
          maxWidth: '680px',
          margin: '0 auto 36px auto'
        }}>
          Khám phá các công trình nghiên cứu khoa học, đề tài liên ngành và cẩm nang phương pháp luận từ cộng đồng học sinh &amp; sinh viên.
        </p>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { id: 'all', label: 'All Topics' },
            { id: 'materials', label: 'Materials & Environment' },
            { id: 'ai', label: 'Neuroscience & AI' },
            { id: 'chronobiology', label: 'Chronobiology' },
            { id: 'psychology', label: 'Psychology' },
            { id: 'methodology', label: 'Methodology & Skills' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '9px 20px',
                borderRadius: '999px',
                border: activeCategory === cat.id ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.12)',
                background: activeCategory === cat.id ? 'rgba(0, 240, 255, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                color: activeCategory === cat.id ? '#00f0ff' : '#94a3b8',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.8px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: activeCategory === cat.id ? '0 0 15px rgba(0, 240, 255, 0.3)' : 'none'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* Papers Grid */}
      <main style={{ maxWidth: '1180px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {filteredPapers.map((paper) => (
          <article
            key={paper.id}
            className="cyber-card"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '28px',
              padding: '32px',
              borderRadius: '20px',
              background: 'rgba(10, 18, 38, 0.92)',
              border: '1px solid rgba(56, 189, 248, 0.18)',
              transition: 'border-color 0.3s ease, transform 0.3s ease',
              alignItems: 'center'
            }}
          >
            {/* Visual Icon / Monogram Header */}
            <div style={{
              height: '180px',
              borderRadius: '14px',
              background: `radial-gradient(circle at 50% 50%, rgba(13, 59, 143, 0.35) 0%, rgba(2, 6, 18, 0.85) 75%)`,
              border: `1px solid ${paper.themeColor}33`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              position: 'relative',
              overflow: 'hidden'
            }}>
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

            {/* Paper Detail Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  letterSpacing: '1.5px',
                  color: paper.themeColor,
                  background: `${paper.themeColor}18`,
                  padding: '4px 10px',
                  borderRadius: '6px'
                }}>
                  {paper.catBadge}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{paper.meta}</span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-serif, serif)',
                fontSize: '1.45rem',
                fontWeight: '700',
                color: '#ffffff',
                lineHeight: '1.35',
                margin: 0
              }}>
                {paper.title}
              </h2>

              <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '500' }}>
                {paper.author}
              </div>

              <p style={{
                fontSize: '0.92rem',
                color: '#cbd5e1',
                lineHeight: '1.7',
                margin: 0
              }}>
                {paper.abstract}
              </p>

              {/* Highlights */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                {paper.highlights.map((h, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '0.75rem',
                      color: '#94a3b8',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '4px 10px',
                      borderRadius: '999px'
                    }}
                  >
                    ✦ {h}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginTop: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setSelectedPaper(paper)}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '999px',
                    background: '#00f0ff',
                    color: '#020612',
                    border: 'none',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    boxShadow: '0 0 16px rgba(0, 240, 255, 0.35)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Read Full Overview
                </button>
                <a
                  href="https://forms.gle/F9evDGJCJm1P4XRz5"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#38bdf8',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}
                >
                  Submit Feedback &rarr;
                </a>
              </div>
            </div>
          </article>
        ))}
      </main>

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
              maxWidth: '680px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'rgba(6, 16, 38, 0.98)',
              border: '1px solid rgba(0, 240, 255, 0.4)',
              borderRadius: '20px',
              padding: '36px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 240, 255, 0.25)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setSelectedPaper(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#ffffff',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              ✕
            </button>

            <span style={{ fontSize: '0.8rem', color: selectedPaper.themeColor, fontWeight: '700', letterSpacing: '2px' }}>
              {selectedPaper.catBadge} · {selectedPaper.meta}
            </span>

            <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.8rem', color: '#ffffff', margin: '14px 0 8px 0' }}>
              {selectedPaper.title}
            </h2>

            <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '20px' }}>
              {selectedPaper.author}
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.8', margin: '0 0 24px 0' }}>
              {selectedPaper.abstract}
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
              {selectedPaper.highlights.map((h, idx) => (
                <span key={idx} style={{ fontSize: '0.8rem', color: '#00f0ff', background: 'rgba(0, 240, 255, 0.1)', padding: '5px 12px', borderRadius: '999px' }}>
                  ✦ {h}
                </span>
              ))}
            </div>

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
                fontSize: '0.9rem'
              }}
            >
              Apply to Collaborate with Authors &rarr;
            </a>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ marginTop: '80px' }}>
        <div className="footer-content">
          <h3>Contact Us</h3>
          <div className="footer-links-row">
            <div className="footer-item">
              <span>Fanpage:</span>
              <a href="https://www.facebook.com/profile.php?id=61593208479696" target="_blank" rel="noopener noreferrer" className="footer-icon-link" aria-label="Facebook Fanpage">
                <svg className="footer-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
            <div className="footer-item">
              <span>Apply Research:</span>
              <a href="https://forms.gle/F9evDGJCJm1P4XRz5" target="_blank" rel="noopener noreferrer" className="footer-icon-link" aria-label="Apply Research">
                <svg className="footer-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </a>
            </div>
          </div>
          <p className="footer-contact-info">Phone: 090 934 8508 | Email: aperio.res@gmail.com</p>
          <p className="footer-copyright">© 2026 AperioResearch. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
