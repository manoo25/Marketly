import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function UpdateRolesModal({ show, onClose, onConfirm, selectedCount }) {
    const [selectedRole, setSelectedRole] = useState("");

    const handleConfirm = () => {
        if (!selectedRole) return;
        onConfirm(selectedRole); // نبعته للكونفيرم مودال
    };

    return (
        <Modal show={show} onHide={onClose} centered backdrop="static">
            <Modal.Header >
                <Modal.Title>تحديث صلاحية المستخدمين</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="mb-3">اختر الصلاحية التي تريد تطبيقها على <strong>{selectedCount}</strong> مستخدم/ين:</p>
                <Form.Select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                    <option value="">اختر الصلاحية</option>
                    <option value="user">مستخدم</option>
                    <option value="trader">تاجر</option>
                    <option value="admin">أدمن</option>
                </Form.Select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    إلغاء
                </Button>
                <Button variant="primary" onClick={handleConfirm} disabled={!selectedRole}>
                    تحديث
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
