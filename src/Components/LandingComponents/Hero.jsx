import React from 'react';
import { FaRocket } from 'react-icons/fa';
import heroImage from '../../assets/Images/vendor_clean_expanded.png';
import './hero.css';
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

const HeroSection = ( { token, role }) => {
  const navigate = useNavigate();
 if (token && !role) return null;
  return (
    <section className="hero-section py-5"> 
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
  ماركتلي بيربطك مباشرة بالموردين المعتمدين، <br />
  ويوفّر لك أسعار تنافسية وتوصيل سريع لباب متجرك. <br />
  خليك مركز في شغلك، واحنا نوصلّك كل اللي محتاجه.
</p>
{!token ? (
  <button
    // className="btn btn-get-started px-4 py-2 d-flex align-items-center justify-content-center gap-2 mt-3 fw-bold"
    className="btn btn-dashboard px-4 py-2 d-flex align-items-center justify-content-center gap-2 mt-3 fw-bold"

    onClick={() => navigate('/choose-role')}
  >
    <FaRocket />
    ابدأ الآن
  </button>
) : role === 'admin' || role === 'trader' ? (
  <button
    className="btn btn-dashboard px-4 py-2 d-flex align-items-center justify-content-center gap-2 mt-3 fw-bold"
    onClick={() => navigate('/Dashboard/Charts')}
  >
    <FaRocket />
    انتقل إلى لوحة التحكم
  </button>
) : role === 'user' ? (
  <a
    className="btn btn-dashboard px-4 py-2 d-flex align-items-center justify-content-center gap-2 mt-3 fw-bold"
    href="https://your-app-download-link.com"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaRocket />
    حمّل التطبيق الآن
  </a>
) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
