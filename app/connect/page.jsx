'use client';

import Link from 'next/link';

export default function ConnectPage() {
  const campaigns = [
    {
      title: 'Đại Sứ Truyền Thông (Gen 0.1)',
      badge: 'AMBASSADOR RECRUITMENT',
      desc: 'Chiến dịch tuyển chọn những gương mặt đại sứ đại diện cho Aperio Research, lan tỏa tinh thần học thuật mở đến các trường THPT và Đại học toàn quốc.',
      image: '/images/ambassador_gen01.png',
      color: '#00f0ff',
      tag: '6 TUẦN NHIỆM KỲ',
      linkUrl: 'https://forms.gle/F9evDGJCJm1P4XRz5'
    },
    {
      title: 'Ban Nghiên Cứu Đợt 1',
      badge: 'RESEARCH TEAM VOL. 01',
      desc: 'Dự án nghiên cứu chuyên sâu về tâm lý học đường: "Vì sao học sinh ngại đến phòng tư vấn tâm lý?". Tuyển chọn các nhà nghiên cứu trẻ đam mê phương pháp luận.',
      image: '/images/research_initiative_psychology.png',
      color: '#a78bfa',
      tag: 'TÂM LÝ HỌC ĐƯỜNG',
      linkUrl: 'https://forms.gle/F9evDGJCJm1P4XRz5'
    },
    {
      title: 'Certificate of Appreciation',
      badge: 'MEMBER RECOGNITION',
      desc: 'Hệ thống chứng chỉ vinh danh với biểu tượng bướm pha lê (Sapphire Crystal Butterfly), chứng nhận những đóng góp ý nghĩa cho cộng đồng nghiên cứu khoa học Aperio.',
      image: '/images/certificate_reveal.png',
      color: '#38bdf8',
      tag: 'CHỨNG NHẬN ĐỘC QUYỀN',
      linkUrl: 'https://www.facebook.com/profile.php?id=61593208479696'
    }
  ];

  const channels = [
    {
      icon: '📝',
      title: 'Nộp Đề Tài & Bài Báo Nghiên Cứu',
      desc: 'Gửi đề cương nghiên cứu, câu hỏi tò mò hoặc bản thảo khoa học hoàn chỉnh để nhận phản biện và cố vấn từ hội đồng học thuật Aperio.',
      linkText: 'Mở Đơn Đăng Ký (Google Form)',
      linkUrl: 'https://forms.gle/F9evDGJCJm1P4XRz5',
      primary: true
    },
    {
      icon: '🌐',
      title: 'Fanpage Cộng Đồng Chính Thức',
      desc: 'Theo dõi các thông báo kết quả xét tuyển, ngày hội nghiên cứu sinh, bài viết chuyên đề và chuỗi workshop phương pháp luận.',
      linkText: 'Ghé Thăm Facebook Fanpage',
      linkUrl: 'https://www.facebook.com/profile.php?id=61593208479696',
      primary: false
    },
    {
      icon: '🔬',
      title: 'Hội Đồng Cố Vấn & Mentor',
      desc: 'Dành cho các sinh viên, nghiên cứu sinh hoặc giảng viên mong muốn đồng hành hướng dẫn học sinh trong các đề tài nghiên cứu.',
      linkText: 'Liên Hệ Đội Ngũ Cố Vấn',
      linkUrl: 'mailto:aperio.res@gmail.com?subject=Mentorship%20Inquiry',
      primary: false
    },
    {
      icon: '🤝',
      title: 'Hợp Tác Tổ Chức & Nhà Trường',
      desc: 'Hợp tác cùng các trường THPT, CLB khoa học và tổ chức giáo dục để triển khai các mô hình bình dân hóa nghiên cứu.',
      linkText: 'Đề Xuất Hợp Tác',
      linkUrl: 'mailto:aperio.res@gmail.com?subject=Partnership%20Proposal',
      primary: false
    }
  ];

  return (
    <div className="connect-page-container" style={{ minHeight: '100vh', padding: '40px 24px 100px 24px' }}>
      {/* Hero Header */}
      <header style={{ maxWidth: '960px', margin: '0 auto 50px auto', textAlign: 'center' }}>
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
          ✦ CONNECT &amp; COLLABORATE ✦
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
          Gia Nhập Cộng Đồng Aperio
        </h1>

        <p style={{
          color: '#94a3b8',
          fontSize: '1.05rem',
          lineHeight: '1.8',
          maxWidth: '680px',
          margin: '0 auto'
        }}>
          Dù bạn là một học sinh mang trong mình câu hỏi khoa học mới mẻ, một đại sứ truyền thông hay một đối tác học thuật, Aperio luôn mở rộng cánh cửa đồng hành.
        </p>
      </header>

      {/* Featured Campaigns Spotlight */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 70px auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ color: '#00f0ff', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
            — ACTIVE COHORTS &amp; RECOGNITION —
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2rem', color: '#ffffff', margin: 0 }}>
            Chiến Dịch &amp; Vinh Danh Thành Viên
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {campaigns.map((c, idx) => (
            <div
              key={idx}
              className="cyber-card"
              style={{
                background: 'rgba(10, 18, 38, 0.94)',
                border: `1px solid ${c.color}44`,
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: `0 15px 40px rgba(0, 0, 0, 0.5)`
              }}
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#020612' }}>
                <img
                  src={c.image}
                  alt={c.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  background: 'rgba(0, 0, 0, 0.75)',
                  color: c.color,
                  border: `1px solid ${c.color}55`
                }}>
                  {c.tag}
                </div>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ color: c.color, fontSize: '0.72rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                    {c.badge}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.25rem', color: '#ffffff', margin: '0 0 10px 0' }}>
                    {c.title}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.6', margin: '0 0 20px 0' }}>
                    {c.desc}
                  </p>
                </div>

                <a
                  href={c.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '10px 20px',
                    borderRadius: '999px',
                    background: `${c.color}22`,
                    border: `1px solid ${c.color}66`,
                    color: c.color,
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>Tìm Hiểu Thêm</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Channels Grid */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
        {channels.map((ch, idx) => (
          <div
            key={idx}
            className="cyber-card"
            style={{
              background: 'rgba(10, 18, 38, 0.92)',
              border: ch.primary ? '1px solid rgba(0, 240, 255, 0.45)' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: ch.primary ? '0 0 30px rgba(0, 240, 255, 0.15)' : 'none'
            }}
          >
            <div>
              <div style={{ fontSize: '2.4rem', marginBottom: '16px' }}>{ch.icon}</div>
              <h2 style={{
                fontFamily: 'var(--font-serif, serif)',
                fontSize: '1.25rem',
                color: '#ffffff',
                fontWeight: '700',
                margin: '0 0 10px 0'
              }}>
                {ch.title}
              </h2>
              <p style={{
                color: '#94a3b8',
                fontSize: '0.9rem',
                lineHeight: '1.7',
                margin: '0 0 20px 0'
              }}>
                {ch.desc}
              </p>
            </div>

            <a
              href={ch.linkUrl}
              target={ch.linkUrl.startsWith('http') ? '_blank' : undefined}
              rel={ch.linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '999px',
                background: ch.primary ? '#00f0ff' : 'rgba(255, 255, 255, 0.06)',
                color: ch.primary ? '#020612' : '#ffffff',
                border: ch.primary ? 'none' : '1px solid rgba(255, 255, 255, 0.18)',
                fontWeight: '700',
                fontSize: '0.85rem',
                letterSpacing: '0.5px',
                textDecoration: 'none',
                boxShadow: ch.primary ? '0 0 18px rgba(0, 240, 255, 0.35)' : 'none'
              }}
            >
              <span>{ch.linkText}</span>
              <span>&rarr;</span>
            </a>
          </div>
        ))}
      </section>

      {/* Direct Contact Card */}
      <section style={{ maxWidth: '800px', margin: '60px auto 0 auto', padding: '36px', borderRadius: '20px', background: 'rgba(6, 16, 38, 0.8)', border: '1px solid rgba(56, 189, 248, 0.25)', textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.5rem', color: '#ffffff', margin: '0 0 12px 0' }}>
          Liên Hệ Trực Tiếp &amp; Báo Chí
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: '0 0 20px 0' }}>
          Mọi thắc mắc về thể lệ tham gia hoặc quan tâm bảo trợ học thuật, vui lòng liên hệ trực tiếp văn phòng Aperio.
        </p>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', color: '#00f0ff', fontSize: '0.95rem', fontWeight: '600' }}>
          <span>📧 aperio.res@gmail.com</span>
          <span>📞 090 934 8508</span>
          <span>📍 Ho Chi Minh City, Vietnam</span>
        </div>
      </section>

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
