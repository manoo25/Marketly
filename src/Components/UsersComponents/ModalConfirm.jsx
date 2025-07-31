import React from "react";
import "./ModalConfirm.css"; // تأكد إنك رابط الملف ده

export default function ModalConfirm({
    isOpen,
    onClose,
    onConfirm,
    message = "هل أنت متأكد؟",
    confirmText = "تأكيد",
    confirmClass = "btn-primary"
}) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                {/* <div className="modal-message">{message}</div> */}
                <div className="modal-message">
                    {typeof message === "function" ? message() : message}
                </div>

                <div className="modal-actions">
                    <button onClick={onConfirm} className={`btn ${confirmClass}`}>
                        {confirmText}
                    </button>
                    <button onClick={onClose} className="btn btn-secondary">
                        إلغاء
                    </button>
                </div>
            </div>
        </div>
    );
}
