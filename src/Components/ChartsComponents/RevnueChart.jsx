import React from 'react';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function RevnueChart() {

    const data = [
        { month: 'يناير', المبيعات: 3000, المصاريف: 2000 },
        { month: 'فبراير', المبيعات: 4000, المصاريف: 2500 },
        { month: 'مارس', المبيعات: 3500, المصاريف: 2200 },
        { month: 'أبريل', المبيعات: 4500, المصاريف: 2700 },
        { month: 'مايو', المبيعات: 5000, المصاريف: 3000 },
        { month: 'يونيو', المبيعات: 6000, المصاريف: 3500 },
        { month: 'يوليو', المبيعات: 3000, المصاريف: 2000 },
        { month: 'أغسطس', المبيعات: 4000, المصاريف: 2500 },
        { month: 'سبتمبر', المبيعات: 3500, المصاريف: 2200 },
        { month: 'أكتوبر', المبيعات: 4500, المصاريف: 2700 },
        { month: 'نوفمبر', المبيعات: 5000, المصاريف: 3000 },
        { month: 'ديسمبر', المبيعات: 6000, المصاريف: 3500 }
    ];

    const customTooltipStyle = {
        backgroundColor: '#f8fafc',
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
    };

    return (
        <div className='card shadow-sm p-4' style={{ border : 'none' }}>
            <div className='d-flex align-items-center justify-content-between mb-4'>
                <div>
                    <h3 className='h5 fw-bold text-dark'>المبيعات</h3>
                    <p className='small text-muted'>
                        المبيعات و المصاريف الشهرية
                    </p>
                </div>
                <div className='d-flex align-items-center gap-4'>
                    <div className='d-flex align-items-center gap-2'>
                        <div style={{ width: '12px', height: '12px', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', borderRadius: '50%' }}></div>
                        <div className='small text-secondary'>
                            <span>المبيعات</span>
                        </div>
                    </div>
                    <div className='d-flex align-items-center gap-2'>
                        <div style={{ width: '12px', height: '12px', background: 'linear-gradient(to right, #94a3b8, #64748b)', borderRadius: '50%' }}></div>
                        <div className='small text-secondary'>
                            <span>المصاريف</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 20,
                            left: 30,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                        <XAxis dataKey="month" stroke='#64748b' fontSize={12} tickLine={false} axisLine={false} reversed={true} />
                        <Tooltip contentStyle={customTooltipStyle} />
                        <Bar dataKey="المبيعات" fill="url(#revenueGradient)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                        <Bar dataKey="المصاريف" fill="url(#expensesGradient)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                        <defs>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                            <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#94a3b8" />
                                <stop offset="100%" stopColor="#64748b" />
                            </linearGradient>
                        </defs>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default RevnueChart;