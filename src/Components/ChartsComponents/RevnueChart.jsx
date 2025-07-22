import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// أسماء الأشهر بالعربي
const arabicMonths = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

function RevnueChart() {
    const { orders } = useSelector((state) => state.Orders);

    const data = useMemo(() => {
        const monthlyData = {};

        orders.forEach(order => {
            const date = new Date(order.created_at);
            const monthIndex = date.getMonth();
            const month = arabicMonths[monthIndex];

            if (!monthlyData[month]) {
                monthlyData[month] = {
                    month,
                    "إجمالي الطلبات": 0,
                    "المبيعات": 0
                };
            }

            // إضافة إجمالي الطلب بغض النظر عن الحالة
            monthlyData[month]["إجمالي الطلبات"] += Number(order.total || 0);

            // إضافة للمبيعات إذا كانت الحالة "تم التوصيل"
            if (order.status === "done") {
                monthlyData[month]["المبيعات"] += Number(order.total || 0);
            }
        });

        return arabicMonths.map(month => monthlyData[month] || {
            month,
            "إجمالي الطلبات": 0,
            "المبيعات": 0
        });
    }, [orders]);

    const customTooltipStyle = {
        backgroundColor: '#f8fafc',
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
    };

    return (
        <div className='card shadow-sm p-4' style={{ border: 'none' }}>
            <div className='d-flex align-items-center justify-content-between mb-4'>
                <div>
                    <h3 className='h5 fw-bold text-dark'>المبيعات</h3>
                    <p className='small text-muted'>مقارنة بين المبيعات و إجمالي الطلبات</p>
                </div>
                <div className='d-flex align-items-center gap-4'>
                    <div className='d-flex align-items-center gap-2'>
                        <div style={{ width: '12px', height: '12px', background: '#3b82f6', borderRadius: '50%' }}></div>
                        <div className='small text-secondary'><span>المبيعات</span></div>
                    </div>
                    <div className='d-flex align-items-center gap-2'>
                        <div style={{ width: '12px', height: '12px', background: '#94a3b8', borderRadius: '50%' }}></div>
                        <div className='small text-secondary'><span>إجمالي الطلبات</span></div>
                    </div>
                </div>
            </div>

            <div style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 20, left: 30, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                        <XAxis dataKey="month" stroke='#64748b' fontSize={12} tickLine={false} axisLine={false} reversed />
                        <Tooltip contentStyle={customTooltipStyle} />
                        <Bar dataKey="المبيعات" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                        <Bar dataKey="إجمالي الطلبات" fill="#94a3b8" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default RevnueChart;
