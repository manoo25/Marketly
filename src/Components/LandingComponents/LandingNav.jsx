import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearAuthData } from "../../Redux/Slices/token";
import { FaRocket } from "react-icons/fa"; // أيقونة من React Icons
import "./nav.css"; //
const LandingNavbar = () => {
  const token = useSelector((state) => state.Token.token);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearAuthData());
    localStorage.removeItem("userID");
    window.location.reload();
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

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                حول
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                كيف يعمل
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
              onClick={() => (window.location.href = "/SigninPage")}
            >
              <FaRocket />
              اشترك الآن
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
