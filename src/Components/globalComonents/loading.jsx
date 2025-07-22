import React from "react";

function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.9)", // خلفية شفافة ناعمة
        zIndex: 1000000,
      }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <div
        className="spinner-border"
        role="status"
        style={{
          width: "4rem",
          height: "4rem",
          color: "#915EF6", // اللون الأساسي
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <p style={{ marginTop: "16px", color: "#666666", fontSize: "1.1rem" }}>
        جاري التحميل...
      </p>

      {/* أنيميشن خاصة لو مش عندك Bootstrap Spinner */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Loading;
