import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const daysOfWeek = [
    "السبت",
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة"
];

export default function UpdateRoutesModal({ show, onClose, onConfirm, selectedDelegateIds }) {
    const [selectedDays, setSelectedDays] = useState([]);

    const toggleDay = (day) => {
        setSelectedDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    const handleConfirm = () => {
        if (selectedDays.length === 0) return;
        // نحول الأيام إلى صيغة: [{ day: "السبت" }, ...]
        const updatedRoutes = selectedDays.map(day => ({ day }));
        onConfirm(updatedRoutes);
    };

    return (
        <Modal show={show} onHide={onClose} centered backdrop="static">
            <Modal.Header>
                <Modal.Title>تحديث أيام التوزيع</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="mb-3">
                    اختر الأيام الجديدة لـ <strong>{selectedDelegateIds.length}</strong> مندوب/ين:
                </p>
                <div className="d-flex flex-wrap gap-3">
                    {daysOfWeek.map(day => (
                        <Form.Check
                            key={day}
                            type="checkbox"
                            id={day}
                            label={day}
                            checked={selectedDays.includes(day)}
                            onChange={() => toggleDay(day)}
                        />
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    إلغاء
                </Button>
                <Button variant="primary" onClick={handleConfirm} disabled={selectedDays.length === 0}>
                    تحديث
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
