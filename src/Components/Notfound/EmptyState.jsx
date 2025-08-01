import React from "react";

const EmptyState = ({
  title = "لا توجد بيانات",
  description = "لا يوجد محتوى لعرضه حالياً.",
  actionText = "الرجوع",
  onActionClick = () => {},
  icon = "fa-box-open",
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 200px)", // يمكن تعديل القيمة حسب الحاجة
        padding: "20px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "3rem 1rem",
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          border: "1px solid #E0E0E0",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: "3rem",
            color: "#7B51E4",
            marginBottom: "1rem",
          }}
        >
          <i className={`fas ${icon}`}></i>
        </div>
        <h2 style={{ color: "#1A1A1A", marginBottom: "0.5rem" }}>{title}</h2>
        <p style={{ color: "#666", marginBottom: "1.5rem" }}>{description}</p>
        {/* <button
          onClick={onActionClick}
          style={{
            backgroundColor: "#915EF6",
            color: "#FFFFFF",
            border: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          {actionText}
        </button> */}
      </div>
    </div>
  );
};

export default EmptyState;