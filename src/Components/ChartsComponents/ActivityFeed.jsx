import { Bell, Clock, CreditCard, ShoppingCart, User } from 'lucide-react';
import React from 'react';

const activities = [
    {
        id: 1,
        type: "user",
        icon: User,
        title: "تم تسجيل حساب جديد",
        description: "أحمد ياسر قام بعمل حساب جديد",
        time: "منذ دقيقتين",
        color: "text-primary",
        bgColor: "bg-primary-subtle",
    },
    {
        id: 2,
        type: "order",
        icon: ShoppingCart,
        title: "New order received",
        description: "Order #3847 for $2,399",
        time: "5 minutes ago",
        color: "text-success",
        bgColor: "bg-success-subtle",
    },
    {
        id: 3,
        type: "payment",
        icon: CreditCard,
        title: "Payment Success",
        description: "Payment of $1,199 completed",
        time: "12 minutes ago",
        color: "text-info",
        bgColor: "bg-info-subtle",
    },
    {
        id: 4,
        type: "notification",
        icon: Bell,
        title: "Low stock alert",
        description: "stock is low",
        time: "2 hours ago",
        color: "text-danger",
        bgColor: "bg-danger-subtle",
    }
];

function ActivityFeed() {
    return (
        <div className="card" style={{ height: '765px' }}>
            <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h5 className="card-title mb-0">اخر الاحداث</h5>
                    <small className="text-muted">اخر اشعارات</small>
                </div>
                <button className="btn btn-link btn-sm">عرض الكل</button>
            </div>
            <div className="card-body">
                <div className="list-group list-group-flush">
                    {activities.map((activity) => (
                        <div key={activity.id} className="list-group-item list-group-item-action d-flex align-items-start p-3">
                            <div className={`p-2 rounded-2 ${activity.bgColor} me-3`}>
                                <activity.icon className={`${activity.color}`} style={{ width: '1rem', height: '1rem' }} />
                            </div>
                            <div className="flex-grow-1 min-w-0">
                                <h6 className="fw-semibold mb-0">{activity.title}</h6>
                                <p className="text-secondary text-truncate mb-1 small">{activity.description}</p>
                                <div className="d-flex align-items-center gap-1">
                                    <Clock className="text-muted" style={{ width: '0.75rem', height: '0.75rem' }} />
                                    <small className="text-muted">{activity.time}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ActivityFeed;
