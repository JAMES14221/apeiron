'use client';

import Link from 'next/link';
import { APERIO_OFFICIAL_LINKS } from '../../data/articles';

export default function ConnectPage() {
  const campaigns = [
    {
      title: 'Tuyển Đại Sứ Truyền Thông Gen 0.1 - Đợt 2',
      badge: 'OUTREACH GUILD / GEN 0.1',
      desc: 'Hình thức đồng hành linh hoạt dành cho các bạn trẻ muốn đóng góp cho khoa học mở: lan tỏa bài viết, kết nối cộng đồng, nhận chứng nhận và thư giới thiệu (LoR). Một vòng đơn, không phỏng vấn.',
      image: '/images/ambassador_gen01.png',
      color: '#00f0ff',
      tag: 'NHIỆM KỲ 1.5 THÁNG',
      date: '14/10/2026 - 21/10/2026',
      primaryAction: {
        text: 'Nộp Đơn Ứng Tuyển',
        url: APERIO_OFFICIAL_LINKS.ambassadorApplyForm
      },
      secondaryAction: {
        text: 'JD Chi Tiết',
        url: APERIO_OFFICIAL_LINKS.ambassadorJD
      }
    },
    {
      title: 'Tuyển Thành Viên Ban Nghiên Cứu Đợt 1',
      badge: 'RESEARCH DIVISION / VOL. 01',
      desc: 'Đề tài: "Vì sao học sinh ngại đến phòng tư vấn tâm lý?". Cổng đơn đã chính thức khép lại ngày 19/10/2026 và kết quả đã được gửi qua email. Bạn có thể đăng ký danh sách chờ cho đợt tiếp theo.',
      image: '/images/research_initiative_psychology.png',
      color: '#a78bfa',
      tag: 'ĐÃ ĐÓNG ĐƠN / CHECK MAIL',
      date: 'Khép lại 19/10/2026',
      primaryAction: {
        text: 'Đơn Dự Bị Đợt Sau',
        url: APERIO_OFFICIAL_LINKS.researchApplyForm
      },
      secondaryAction: {
        text: 'Booklet Dự Án',
        url: APERIO_OFFICIAL_LINKS.projectBooklet
      }
    },
    {
      title: 'Certificate of Appreciation Reveal',
      badge: 'MEMBER RECOGNITION',
      desc: 'Thiết kế chứng nhận vinh danh độc quyền với biểu tượng cánh bướm lam ngọc (Sapphire Crystal Butterfly) từ Founder of Aperio Research, tri ân những cống hiến cho hành trình khai mở tri thức.',
      image: '/images/certificate_reveal.png',
      color: '#38bdf8',
      tag: 'CHỨNG NHẬN ĐỘC QUYỀN',
      date: 'Công bố 13/10/2026',
      primaryAction: {
        text: 'Xem Thông Báo Fanpage',
        url: APERIO_OFFICIAL_LINKS.fanpage
      },
      secondaryAction: null
    }
  ];

  const channels = [
    {
      icon: '📖',
      title: 'Booklet Dự Án Aperio (Heyzine)',
      desc: 'Tài liệu giới thiệu toàn cảnh tầm nhìn, phương pháp luận nghiên cứu và định hướng phát triển của Aperio Research dưới dạng lật sách tương tác.',
      linkText: 'Mở E-Booklet Trực Tuyến',
      linkUrl: APERIO_OFFICIAL_LINKS.projectBooklet,
      primary: true
    },
    {
      icon: '📢',
      title: 'Fanpage Aperio Research',
      desc: 'Kênh thông tin cập nhật thường xuyên các bài phân tích học thuật, thông báo kết quả ứng tuyển, sự kiện học thuật và workshop phương pháp luận.',
      linkText: 'Ghé Thăm Facebook Fanpage',
      linkUrl: APERIO_OFFICIAL_LINKS.fanpage,
      primary: false
    },
    {
      icon: '📝',
      title: 'Đơn Đăng Ký Đề Tài Nghiên Cứu',
      desc: 'Dành cho các bạn học sinh có ý tưởng nghiên cứu muốn nhận phản biện khoa học hoặc ứng tuyển tham gia các đề tài mở tại Aperio.',
      linkText: 'Gửi Đề Xuất Nghiên Cứu',
      linkUrl: APERIO_OFFICIAL_LINKS.generalApplyForm,
      primary: false
    },
    {
      icon: '🤝',
      title: 'Hội Đồng Cố Vấn & Hợp Tác',
      desc: 'Dành cho các giảng viên, nghiên cứu sinh, nhà trường hoặc tổ chức giáo dục mong muốn hợp tác chuyên môn và cố vấn phương pháp cho học sinh.',
      linkText: 'Đề Xuất Hợp Tác Chuyên Môn',
      linkUrl: `mailto:${APERIO_OFFICIAL_LINKS.email}?subject=Partnership%20Proposal`,
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
          Dù bạn muốn nộp đề tài nghiên cứu, ứng tuyển đại sứ truyền thông hay kết nối bảo trợ học thuật, Aperio luôn trân trọng mọi tinh thần cống hiến vì tri thức trẻ.
        </p>
      </header>

      {/* Featured Cohorts & Campaigns Spotlight */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 70px auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ color: '#00f0ff', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
            — CÁC ĐỢT TUYỂN CHỌN &amp; CHIẾN DỊCH —
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2rem', color: '#ffffff', margin: 0 }}>
            Chiến Dịch Đang &amp; Đã Triển Khai
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: c.color, fontSize: '0.72rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      {c.badge}
                    </span>
                    <span style={{ color: '#64748b', fontSize: '0.78rem' }}>{c.date}</span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.25rem', color: '#ffffff', margin: '0 0 10px 0' }}>
                    {c.title}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.6', margin: '0 0 20px 0' }}>
                    {c.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <a
                    href={c.primaryAction.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '10px 18px',
                      borderRadius: '999px',
                      background: c.color,
                      color: '#020612',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      flex: 1,
                      textAlign: 'center'
                    }}
                  >
                    <span>{c.primaryAction.text}</span>
                    <span>↗</span>
                  </a>

                  {c.secondaryAction && (
                    <a
                      href={c.secondaryAction.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '10px 16px',
                        borderRadius: '999px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#ffffff',
                        fontWeight: '600',
                        fontSize: '0.85rem',
                        textDecoration: 'none'
                      }}
                    >
                      <span>{c.secondaryAction.text}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official Resources & Channels */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 70px auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
        {channels.map((ch, idx) => (
          <div
            key={idx}
            className="cyber-card"
            style={{
              background: 'rgba(10, 18, 38, 0.92)',
              border: ch.primary ? '1px solid rgba(0, 240, 255, 0.45)' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '30px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: ch.primary ? '0 0 30px rgba(0, 240, 255, 0.15)' : 'none'
            }}
          >
            <div>
              <div style={{ fontSize: '2.4rem', marginBottom: '14px' }}>{ch.icon}</div>
              <h2 style={{
                fontFamily: 'var(--font-serif, serif)',
                fontSize: '1.2rem',
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

      {/* Official Contact Box */}
      <section style={{ maxWidth: '840px', margin: '0 auto', padding: '36px', borderRadius: '20px', background: 'rgba(6, 16, 38, 0.85)', border: '1px solid rgba(56, 189, 248, 0.25)', textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.5rem', color: '#ffffff', margin: '0 0 12px 0' }}>
          Văn Phòng Aperio Research &amp; Báo Chí
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: '0 0 20px 0' }}>
          Mọi thắc mắc về thể lệ tham gia, phỏng vấn hoặc đề xuất bảo trợ học thuật, vui lòng liên hệ trực tiếp.
        </p>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', color: '#00f0ff', fontSize: '0.95rem', fontWeight: '600' }}>
          <a href={`mailto:${APERIO_OFFICIAL_LINKS.email}`} style={{ color: '#00f0ff', textDecoration: 'none' }}>
            📧 {APERIO_OFFICIAL_LINKS.email}
          </a>
          <a href={`tel:${APERIO_OFFICIAL_LINKS.phone}`} style={{ color: '#00f0ff', textDecoration: 'none' }}>
            📞 {APERIO_OFFICIAL_LINKS.phone}
          </a>
          <a href={APERIO_OFFICIAL_LINKS.fanpage} target="_blank" rel="noopener noreferrer" style={{ color: '#00f0ff', textDecoration: 'none' }}>
            🌐 Fanpage Aperio Research
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ marginTop: '80px' }}>
        <div className="footer-content">
          <h3>Aperio Research</h3>
          <div className="footer-links-row">
            <div className="footer-item">
              <span>Fanpage:</span>
              <a href={APERIO_OFFICIAL_LINKS.fanpage} target="_blank" rel="noopener noreferrer" className="footer-icon-link" aria-label="Facebook Fanpage">
                <svg className="footer-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
            <div className="footer-item">
              <span>Booklet:</span>
              <a href={APERIO_OFFICIAL_LINKS.projectBooklet} target="_blank" rel="noopener noreferrer" className="footer-icon-link" aria-label="Aperio Booklet">
                <svg className="footer-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              </a>
            </div>
          </div>
          <p className="footer-contact-info">Phone: {APERIO_OFFICIAL_LINKS.phone} | Email: {APERIO_OFFICIAL_LINKS.email}</p>
          <p className="footer-copyright">© 2026 Aperio Research. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
