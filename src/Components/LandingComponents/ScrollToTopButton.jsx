import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./ScrollToTopButton.css";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // استخدم كل الطرق الممكنة لقراءة الـ scroll
      const scrollY = window.scrollY;
      const pageYOffset = window.pageYOffset;
      const documentScrollTop = document.documentElement.scrollTop;
      const bodyScrollTop = document.body.scrollTop;

      const currentScrollPos =
        scrollY || pageYOffset || documentScrollTop || bodyScrollTop || 0;

      if (currentScrollPos > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll(); // تحقق اول مرة

    // جرب على events مختلفة
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    document.body.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
      document.body.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    // جرب كل الطرق لضمان الوصول لأعلى الصفحة في جميع المتصفحات
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="الرجوع لأعلى الصفحة"
      className={`scroll-to-top-btn${isVisible ? " visible" : ""}`}
    >
      <span className="scroll-to-top-icon-wrapper">
        <FaArrowUp className="scroll-to-top-icon" />
      </span>
    </button>
  );
};

export default ScrollToTopButton;
