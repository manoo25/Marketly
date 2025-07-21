import React from 'react';
import { FaRocket } from 'react-icons/fa'; // أيقونة من React Icons
import './nav.css'; // 
const LandingNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bolder" href="#" style={{ color: "#2d3e82", fontSize: "30px" }}>
          Marketly
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><a className="nav-link" href="#">حول</a></li>
            <li className="nav-item"><a className="nav-link" href="#">كيف يعمل</a></li>
            <li className="nav-item"><a className="nav-link" href="#">اتصل بنا</a></li>
          </ul>

          <button className="btn btn-primary btn-cta px-4 py-2 d-flex align-items-center gap-2 fw-bold">
            <FaRocket />
            اشترك الآن
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
