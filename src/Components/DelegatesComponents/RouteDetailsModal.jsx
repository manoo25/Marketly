import React from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';

export default function RouteDetailsModal({ show, onClose, routes = [], delegateName = '' }) {
    // دمج الروتات حسب المحافظة
    const groupedByGov = routes.reduce((acc, { governorate, route, day }) => {
        const key = governorate || 'غير محددة';
        const existing = acc[key] || {};
        if (!existing[route]) existing[route] = [];
        existing[route].push(day);
        acc[key] = existing;
        return acc;
    }, {});

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header>
                <Modal.Title>
                    خطوط السير للمندوب: <span className="text-primary">{delegateName}</span>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {routes.length === 0 ? (
                    <p>لا يوجد خطوط سير مسجلة</p>
                ) : (
                    <div className="d-flex flex-column gap-3">
                        {Object.entries(groupedByGov).map(([gov, routesMap], idx) => (
                            <div key={idx} className="border rounded p-3 bg-light shadow-sm">
                                <h6 className="mb-2">
                                    <strong>المحافظة:</strong> {gov}
                                </h6>

                                {Object.entries(routesMap).map(([route, days], i) => (
                                    <div key={i} className="mb-2">
                                        <div><strong>المنطقة:</strong> {route}</div>
                                        <div>
                                            <strong>الأيام:</strong>{' '}
                                            {days.length > 0 ? (
                                                days.map((day, j) => (
                                                    <Badge bg="info" key={j} className="me-1">{day}</Badge>
                                                ))
                                            ) : (
                                                <span className="text-muted">لا يوجد أيام</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
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
