import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const colors = {
  primary: "#915EF6",
  accent: "#327AFF",
  background: "#FFFFFF",
  softBg: "#F9F9F9",
  text: "#1A1A1A",
  textSecondary: "#666666",
  icon: "#7B51E4",
  border: "#E0E0E0",
};

const DownloadSection = () => {
  return (
    <section
    id="download-section" 
      className="pb-5 mt-1 px-3 text-end"
      style={{
        direction: "rtl",
        backgroundColor: colors.background,
        margin: "0 auto",
        maxWidth: "1200px",
      }}
    >
      <div className="container">
        <div className="row align-items-center g-5">
          {/* النصوص */}
          <div className="col-12 col-md-6 order-2 order-md-1 text-center text-md-end">
            <h2
              className="fw-bold mb-3"
              style={{
                color: colors.text,
                fontSize: "clamp(1.5rem, 5vw, 2.2rem)", // Responsive font size
                lineHeight: 1.4,
              }}
            >
              استخدم ماركتلي على موبايلك
            </h2>

            <p
              className="mb-3"
              style={{
                color: colors.text,
                fontSize: "clamp(1rem, 4vw, 1.1rem)", // Responsive font size
              }}
            >
              حمّل التطبيق وابدأ من هاتفك كتاجر
            </p>

            <p
              className="mb-4 mx-auto mx-md-0"
              style={{
                color: colors.textSecondary,
                fontSize: "clamp(0.95rem, 3.5vw, 1rem)",
                lineHeight: 1.8,
                maxWidth: 500,
              }}
            >
              احصل على سلسلة في تصفح الموردين، طلب المنتجات وتتبع التوصيل — كل
              ذلك من تطبيق ماركتلي، لأجهزة Android و iOS
            </p>

            <div className="d-flex gap-3 justify-content-center justify-content-md-start flex-wrap">
              <a href="#" className="mt-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  style={{ height: 48 }}
                />
              </a>
              <a href="#" className="mt-2">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  style={{ height: 48 }}
                />
              </a>
            </div>
          </div>

          {/* صورة الموبايل */}
          <div className="col-12 col-md-6 order-1 order-md-2 text-center">
            <img
              src='src\assets\Logo\Asset 11.svg'
              alt="Marketly App UI"
              className="img-fluid"
              style={{
                maxWidth: "45%",
                height: "auto",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
