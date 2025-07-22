import React from "react";

const colors = {
  primary: "#915EF6",
  accent: "#327AFF",
  background: "#FFFFFF",
  softBg: "#F9F9F9",
  text: "#1A1A1A",
  textSecondary: "#666666",
  border: "#E0E0E0",
  icon: "#7B51E4",
};

const Footer = () => {
  return (
    <footer
      style={{
        background: colors.softBg,
        color: colors.textSecondary,
        borderTop: `1px solid ${colors.border}`,
        marginTop: 48,
        boxShadow: "0 -2px 24px #0001",
        direction: "rtl",
        padding: "0",
      }}
      className="footer-section w-100"
    >
      <div className="container py-4 px-2">
        {/* First Row */}
        <div
          className="row gy-4 gx-2 justify-content-between flex-wrap flex-row-reverse"
          style={{ paddingBottom: "1rem", borderBottom: `1px solid ${colors.border}` }}
        >
          {/* 1. Brand & Slogan */}
          <div className="col-12 col-md-4 text-center text-md-end order-1 d-flex flex-column align-items-center align-items-md-end">
            <h4
              style={{
                fontWeight: "bold",
                letterSpacing: 0.5,
                color: colors.primary,
                fontSize: "1.5rem",
                marginBottom: 6,
              }}
            >
              Marketly
            </h4>
            <p
              style={{
                fontSize: "0.95rem",
                color: colors.textSecondary,
                marginBottom: 0,
                maxWidth: 280,
                lineHeight: 1.6,
              }}
            >
              منصة ذكية لإدارة متجرك — سهولة، سرعة، واحترافية.
            </p>
          </div>

          {/* 2. Center Links */}
          <div className="col-12 col-md-4 text-center order-2 d-flex flex-column align-items-center justify-content-center">
            <ul
              className="list-inline mb-0 d-flex flex-wrap justify-content-center gap-3"
              style={{ padding: 0 }}
            >
              {[
                { text: "المميزات", href: "#features" },
                { text: "الأسئلة الشائعة", href: "#faq" },
                { text: "الدعم الفني", href: "mailto:support@marketly.app" },
              ].map(({ text, href }, idx) => (
                <li className="list-inline-item" key={idx}>
                  <a
                    href={href}
                    aria-label={text}
                    style={{
                      color: colors.accent,
                      textDecoration: "none",
                      fontWeight: 500,
                      transition: "color 0.3s",
                    }}
                    className="footer-link"
                    onMouseEnter={(e) => (e.target.style.color = colors.primary)}
                    onMouseLeave={(e) => (e.target.style.color = colors.accent)}
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Social & Copyright */}
          <div className="col-12 col-md-4 text-center text-md-start order-3 d-flex flex-column align-items-center align-items-md-start">
            <div style={{ fontSize: "0.95rem", color: colors.textSecondary }}>
              جميع الحقوق محفوظة لـ Marketly © {new Date().getFullYear()}
            </div>
            <div className="mt-3 d-flex gap-3">
              {[
                { href: "https://facebook.com/marketly.app", icon: "facebook", label: "Facebook" },
                { href: "https://instagram.com/marketly.app", icon: "instagram", label: "Instagram" },
                { href: "https://wa.me/201234567890", icon: "whatsapp", label: "WhatsApp" },
              ].map(({ href, icon, label }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    color: colors.icon,
                    fontSize: "1.3rem",
                    transition: "color 0.3s",
                  }}
                  className="footer-icon"
                  onMouseEnter={(e) => (e.target.style.color = colors.primary)}
                  onMouseLeave={(e) => (e.target.style.color = colors.icon)}
                >
                  <i className={`fab fa-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Second Row - Bottom Center Text */}
        <div
          className="text-center w-100"
          style={{
            fontSize: "0.85rem",
            color: colors.textSecondary,
            marginTop: "12px",
          }}
        >
          تصميم وتجميع فريق ماركتلي - بإتقان 💜
        </div>
      </div>
    </footer>
  );
};

export default Footer;
