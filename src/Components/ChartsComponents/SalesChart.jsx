import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'



const data = [
        { name : 'الإلكترونيات', value: 45, color : '#3b82f6' },
        { name : 'الملابس', value: 30, color : '#8b5cf6' },
        { name : 'الكتب', value: 15, color : '#10b981' },
        { name : 'أخرى', value: 10, color : '#f59e0b' },
    ]


function SalesChart() {
    return (
        <div className='card shadow-sm' style={{ border : 'none' }}>
            <div className='card-body'>
                <div className='mb-4'>
                    <h3 className='card-title fs-5 fw-bold text-dark'>المبيعات حسب الصنف</h3>
                    <p className='card-subtitle fs-6 text-muted'>توزيع الإنتاج</p>
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
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                border: 'none',
                                borderRadius: '12px',
                                boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.1)',
                            }}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div>
                    {data.map((item, index) => {
                        return (
                        <div key={index} className='d-flex align-items-center justify-content-between mb-3'>
                            <div className='d-flex align-items-center' >
                                <div className='rounded-circle ms-2' style={{ width: '12px', height: '12px', backgroundColor: item.color }}></div>
                                <span className='fs-6 text-secondary'>{item.name}</span>
                            </div>
                            <div className='fs-6 fw-semibold text-dark'>
                                {item.value}%
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default SalesChart