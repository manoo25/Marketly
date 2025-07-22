import React from 'react';
import { FaRocket } from 'react-icons/fa';
import heroImage from '../../assets/Images/vendor_clean_expanded.png';
import './hero.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 mb-4 mb-lg-0">
            <div className="hero-image">
              <img
                src={heroImage}
                alt="Hero"
                className="w-100 h-auto"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
              />
            </div>
          </div>
          <div className="col-lg-7 text-center text-lg-end d-flex flex-column align-items-center align-items-lg-start">
            <h1 className="hero-title mb-4" style={{ fontSize: '50px' }}>
              وصل متجرك <br /> بأفضل الموردين
            </h1>
            <p className="hero-subtitle mb-4">
              سهّل التوريد وخلّي شغلك يكبر مع منصتنا.
            </p>
            <button className="btn btn-get-started px-4 py-2 d-flex align-items-center justify-content-center gap-2 mt-3">
  <FaRocket />
  ابدأ الآن
</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
