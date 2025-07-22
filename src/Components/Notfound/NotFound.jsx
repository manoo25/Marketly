import React from "react";
import { useNavigate } from "react-router-dom";
import EmptyState from "./EmptyState";


const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "4rem 1rem" }}>
      <EmptyState
        title="الصفحة غير موجودة"
        description="عذراً، الصفحة التي تحاول الوصول إليها غير متوفرة."
        actionText="العودة للصفحة الرئيسية"
        onActionClick={() => navigate("/")}
        icon="fa-triangle-exclamation"
      />
    </div>
  );
};

export default NotFound;
