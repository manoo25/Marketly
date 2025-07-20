import React from 'react';

const LandingNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
      <div className="container">
        <a className="navbar-brand fw-bolder" href="#" style={{color:" #2d3e82" ,fontSize:"30px" }}>Marketly</a>

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
          <button className="btn btn-signup btn-primary ">اشترك الآن</button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
