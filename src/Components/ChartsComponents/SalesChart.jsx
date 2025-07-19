import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';

function SalesChart() {
    const { orders } = useSelector((state) => state.Orders);

    // حساب عدد الطلبات حسب الحالة
    const statusCounts = orders.reduce((acc, order) => {
        const status = order.status?.toLowerCase(); // تأكد أن الحالة موجودة
        if (status) {
            acc[status] = (acc[status] || 0) + 1;
        }
        return acc;
    }, {});

    // تحويل إلى مصفوفة لاستخدامها في الرسم
    const data = [
        { name: 'مكتمل', value: statusCounts['تم التوصيل'] || 0, color: '#10b981' },
        { name: 'معلق', value: statusCounts['pending'] || 0, color: '#f59e0b' },
        { name: 'جاري التنفيذ', value: statusCounts['inprogress'] || 0, color: '#3b82f6' },
        { name: 'مرتجع', value: statusCounts['returns'] || 0, color: '#ef4444' },
    ];

    return (
        <div className='card shadow-sm' style={{ border: 'none' }}>
            <div className='card-body'>
                <div className='mb-4'>
                    <h3 className='card-title fs-5 fw-bold text-dark'>حالة الطلبات</h3>
                    <p className='card-subtitle fs-6 text-muted'>توزيع الطلبات حسب الحالة</p>
                </div>
                <div style={{ height: '192px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={80}
                                paddingAngle={5}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value, name) => [`${value} طلب`, name]}
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div>
                    {data.map((item, index) => (
                        <div key={index} className='d-flex align-items-center justify-content-between mb-3'>
                            <div className='d-flex align-items-center'>
                                <div
                                    className='rounded-circle ms-2'
                                    style={{ width: '12px', height: '12px', backgroundColor: item.color }}
                                ></div>
                                <span className='fs-6 text-secondary'>{item.name}</span>
                            </div>
                            <div className='fs-6 fw-semibold text-dark'>
                                {item.value} طلب
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SalesChart;
