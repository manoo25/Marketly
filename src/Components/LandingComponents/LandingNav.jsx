import React from "react";
import {  useDispatch } from "react-redux";
import { clearAuthData } from "../../Redux/Slices/token";
import { FaRocket } from "react-icons/fa"; // أيقونة من React Icons
import "./nav.css"; //
import { useNavigate } from "react-router-dom";
const LandingNavbar = ( { token}) => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(clearAuthData());
    sessionStorage.removeItem("userID");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <a
          className="navbar-brand fw-bolder"
          href="#"
          style={{ color: "#2d3e82", fontSize: "30px" }}
        >
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

        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav me-4 ">
            <li className="nav-item">
              <a className="nav-link" href="#">
                من نحن
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                خدماتنا
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                اتصل بنا
              </a>
            </li>
          </ul>

          {!token ? (
            <button
              className="btn btn-primary btn-cta px-4 py-2 d-flex align-items-center gap-2 fw-bold"
              onClick={() => navigate("/SigninPage")}
            >
              <FaRocket />
              تسجيل الدخول
            </button>
          ) : (
            <button
              className="btn btn-primary btn-cta px-4 py-2 d-flex align-items-center gap-2 fw-bold"
              onClick={handleLogout}
            >
              تسجيل الخروج
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
