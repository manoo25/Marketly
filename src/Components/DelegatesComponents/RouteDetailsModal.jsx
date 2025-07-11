import React from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';

export default function RouteDetailsModal({ show, onClose, routes = [], delegateName = '' }) {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header >
                <Modal.Title>خطوط السير للمندوب: <span className="text-primary">{delegateName}</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {routes.length === 0 ? (
                    <p>لا يوجد خطوط سير مسجلة</p>
                ) : (
                    <div className="d-flex flex-column gap-3">
                        {routes.map((r, idx) => (
                            <div key={idx} className="border rounded p-3 bg-light shadow-sm">
                                <h6 className="mb-2 text-dark">
                                    <strong>المنطقة:</strong> {r.route}
                                </h6>
                                <div>
                                    <strong>الأيام:</strong>{' '}
                                    {r.days.map((day, i) => (
                                        <Badge bg="info" key={i} className="me-1">{day}</Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>إغلاق</Button>
            </Modal.Footer>
        </Modal>
    );
}
