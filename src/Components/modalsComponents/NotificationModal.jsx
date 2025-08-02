// NotificationModal.jsx
import React from 'react';
// import './NotificationModal.css'; // اعمل ملف CSS بسيط ليه

const NotificationModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                {/* <div className="modal-header">
                    <h5 className="modal-title bg-warning px-2 rounded-3">{title}</h5>
                </div> */}
                <div className="modal-message">
                    {message}
                </div>
                <div className="modal-actions">
                    <button onClick={onClose} className="btn btn-primary">
                        حسنًا
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;