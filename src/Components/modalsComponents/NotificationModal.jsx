// NotificationModal.jsx
import React from 'react';
// import './NotificationModal.css'; // اعمل ملف CSS بسيط ليه

const NotificationModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999
        }}>
            <div className="modal-box bg-white p-4 rounded" style={{ maxWidth: 400, width: '100%' }}>
                <div className="modal-message mb-3" style={{ whiteSpace: 'pre-line' }}>
                    {message}
                </div>
                <div className="modal-actions text-end">
                    <button onClick={onClose} className="btn btn-primary">
                        حسنًا
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;