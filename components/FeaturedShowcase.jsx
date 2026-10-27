'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FeaturedShowcase() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState(null);

  const posters = [
    {
      id: 1,
      image: '/images/research_initiative_psychology.png',
      badge: 'RESEARCH INITIATIVE / VOL. 01',
      title: 'Vì Sao Học Sinh Ngại Đến Phòng Tư Vấn Tâm Lý?',
      author: 'Ban Nghiên Cứu Đợt 1',
      date: 'Tháng 10, 2026',
      tag: 'TÂM LÝ HỌC HÀNH VI',
      color: '#a78bfa',
      summary: 'Khảo sát những rào cản vô hình đằng sau quyết định không tìm đến phòng tư vấn tâm lý học đường: nỗi sợ bị phán xét (fear of being judged), định kiến xã hội (stigma), lo ngại quyền riêng tư và khủng hoảng niềm tin.'
    },
    {
      id: 2,
      image: '/images/ambassador_gen01.png',
      badge: 'AMBASSADOR GUILD / GEN 0.1',
      title: 'Tuyển Đại Sứ Truyền Thông — Gen 0.1 Đợt 2',
      author: 'Aperio Outreach Division',
      date: 'Nhiệm kỳ 6 tuần',
      tag: 'LAN TỎA TRI THỨC',
      color: '#00f0ff',
      summary: 'Chiến dịch tuyển đại sứ đồng hành lan tỏa văn hóa nghiên cứu khoa học mở đến học sinh toàn quốc. Cơ hội tham gia trực tiếp vào việc sản xuất nội dung học thuật, kết nối diễn giả và xây dựng cộng đồng nghiên cứu.'
    },
    {
      id: 3,
      image: '/images/certificate_reveal.png',
      badge: 'MEMBER RECOGNITION',
      title: 'Certificate of Appreciation Reveal',
      author: 'Founder of Aperio Research',
      date: 'Vinh Danh Cống Hiến',
      tag: 'CHỨNG NHẬN ĐẠI SỨ',
      color: '#38bdf8',
      summary: 'Thiết kế chứng nhận vinh danh độc quyền với biểu tượng bướm pha lê lam ngọc (sapphire crystal butterfly). Ghi nhận những đóng góp ý nghĩa của các thành viên và đại sứ truyền thông trên hành trình khai mở tri thức trẻ.'
    },
    {
      id: 4,
      image: '/images/research_closed.jpg',
      badge: 'RESEARCH COHORT / UPDATE',
      title: 'Chính Thức Đóng Đơn — Tuyển Thành Viên Ban Nghiên Cứu',
      author: 'Ban Học Thuật Aperio',
      date: 'Đợt 1 Hoàn Tất',
      tag: 'CHECK YOUR INBOX',
      color: '#c084fc',
      summary: 'Kỳ tuyển sinh Ban Nghiên cứu Đợt 1 đã chính thức khép lại với hàng trăm hồ sơ chất lượng. Thư thông báo kết quả và hướng dẫn giai đoạn phỏng vấn đang trên đường gửi đến hộp thư ứng viên.'
    },
    {
      id: 5,
      image: '/images/ambassador_closed.png',
      badge: 'OUTREACH COHORT / UPDATE',
      title: 'Đại Sứ Truyền Thông — Chính Thức Đóng Đơn',
      author: 'Aperio Community Guild',
      date: 'Check Your Mail',
      tag: 'GEN 0.1 COMPLETED',
      color: '#2dd4bf',
      summary: 'Khép lại cổng đơn ứng tuyển Đại sứ Truyền thông. Cảm ơn sự đồng hành và hưởng ứng nồng nhiệt từ các bạn học sinh khắp các tỉnh thành. Vui lòng kiểm tra kỹ cả mục Spam/Promotion để không bỏ lỡ thư kết quả.'
    }
  ];

  const total = posters.length;

  const nextSlide = () => setCurrentIdx((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrentIdx((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    if (isHovered || selectedPoster) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isHovered, selectedPoster, total]);

  const current = posters[currentIdx];

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
        marginBottom: '32px'
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
            Các Dự Án & Chiến Dịch Nổi Bật
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
            padding: '8px 20px',
            borderRadius: '999px',
            background: 'rgba(56, 189, 248, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            transition: 'all 0.2s ease'
          }}
        >
          <span>Khám Phá Toàn Bộ Đề Tài</span>
          <span>→</span>
        </Link>
      </div>

      {/* Main Showcase Stage */}
      <div style={{
        position: 'relative',
        borderRadius: '24px',
        background: 'rgba(6, 14, 32, 0.95)',
        border: `1px solid ${current.color}55`,
        boxShadow: `0 25px 80px rgba(0, 0, 0, 0.75), 0 0 40px ${current.color}22`,
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
          background: `radial-gradient(circle, ${current.color}1a 0%, transparent 70%)`,
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
          {/* Banner Graphic Frame with Interactive Zoom Trigger */}
          <div
            onClick={() => setSelectedPoster(current)}
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
              aspectRatio: '16 / 9',
              background: '#01040a',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6)',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}
            title="Nhấp để xem ảnh phóng to chi tiết"
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
                background: 'rgba(0, 0, 0, 0.7)',
                color: current.color,
                border: `1px solid ${current.color}44`,
                letterSpacing: '1px'
              }}>
                {current.tag}
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
                <span>Phóng To</span>
                <span>⤢</span>
              </span>
            </div>
          </div>

          {/* Editorial Content */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: '700',
                padding: '4px 12px',
                borderRadius: '999px',
                background: `${current.color}1f`,
                color: current.color,
                border: `1px solid ${current.color}44`,
                letterSpacing: '1.2px'
              }}>
                {current.badge}
              </span>
              <span style={{ color: '#64748b' }}>•</span>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{current.date}</span>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif, serif)',
              fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)',
              color: '#ffffff',
              lineHeight: '1.25',
              margin: '0 0 16px 0'
            }}>
              {current.title}
            </h3>

            <p style={{
              color: '#cbd5e1',
              fontSize: '0.96rem',
              lineHeight: '1.8',
              margin: '0 0 24px 0'
            }}>
              {current.summary}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{ color: '#94a3b8', fontSize: '0.86rem' }}>
                Đơn vị: <strong style={{ color: '#ffffff' }}>{current.author}</strong>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setSelectedPoster(current)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 22px',
                    borderRadius: '999px',
                    background: current.color,
                    color: '#020612',
                    border: 'none',
                    fontSize: '0.88rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: `0 0 20px ${current.color}55`,
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <span>Xem Chi Tiết</span>
                  <span>↗</span>
                </button>

                <a
                  href="https://forms.gle/F9evDGJCJm1P4XRz5"
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
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Preview Selector Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${total}, 1fr)`,
          gap: '12px',
          marginTop: '32px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          {posters.map((p, idx) => {
            const isActive = idx === currentIdx;
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
                  border: isActive ? `2px solid ${p.color}` : '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: isActive ? `0 0 15px ${p.color}55` : 'none',
                  opacity: isActive ? 1 : 0.45,
                  transform: isActive ? 'scale(1.03)' : 'scale(1)',
                  transition: 'all 0.25s ease'
                }}
                title={p.title}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px'
        }}>
          <div style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
            <span>{currentIdx + 1}</span> / <span>{total}</span> • <span style={{ color: current.color }}>{current.tag}</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={prevSlide}
              aria-label="Previous"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ❮
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ❯
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Poster Zoom / Reader Modal */}
      {selectedPoster && (
        <div
          onClick={() => setSelectedPoster(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 6, 18, 0.94)',
            zIndex: 10000,
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
              maxWidth: '920px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'rgba(10, 18, 38, 0.98)',
              border: `1px solid ${selectedPoster.color}66`,
              borderRadius: '24px',
              padding: '32px',
              boxShadow: `0 30px 90px rgba(0, 0, 0, 0.85), 0 0 50px ${selectedPoster.color}22`,
              position: 'relative'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPoster(null)}
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

            {/* Poster Full Display */}
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '24px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}>
              <img
                src={selectedPoster.image}
                alt={selectedPoster.title}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                padding: '4px 12px',
                borderRadius: '999px',
                background: `${selectedPoster.color}22`,
                color: selectedPoster.color,
                border: `1px solid ${selectedPoster.color}55`
              }}>
                {selectedPoster.badge}
              </span>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{selectedPoster.date}</span>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif, serif)',
              fontSize: '1.8rem',
              color: '#ffffff',
              margin: '0 0 14px 0'
            }}>
              {selectedPoster.title}
            </h3>

            <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.8', margin: '0 0 28px 0' }}>
              {selectedPoster.summary}
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
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
                  background: selectedPoster.color,
                  color: '#020612',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '0.92rem'
                }}
              >
                <span>Nộp Hồ Sơ / Đăng Ký Nghiên Cứu</span>
                <span>↗</span>
              </a>

              <Link
                href="/research"
                onClick={() => setSelectedPoster(null)}
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
                <span>Xem Kho Lưu Trữ Đề Tài</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
