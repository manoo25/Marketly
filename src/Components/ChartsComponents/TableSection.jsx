import React from 'react';


const recentOrders = [
    {
        id: 1,
        customer: "عميل 1",
        product: "طلب 1",
        amount: 10,
        status: "مكتمل",
        date: "2023-10-01"
    },
    {
        id: 2,
        customer: "عميل 2",
        product: "طلب 2",
        amount: 5,
        status: "قيد المعالجة",
        date: "2023-10-02"
    },
    {
        id: 3,
        customer: "عميل 3",
        product: "طلب 3",
        amount: 20,
        status: "ملغى",
        date: "2023-10-03"
    },
    {
        id: 4,
        customer: "عميل 4",
        product: "طلب 4",
        amount: 15,
        status: "مكتمل",
        date: "2023-10-04"
    },
];

const topProducts = [
    {
        name: "منتج 1",
        sales: 100,
        revenue: "$2,987",
        trend: "زيادة",
        change: "+12%"
    },
    {
        name: "منتج 2",
        sales: 200,
        revenue: "$1,987",
        trend: "زيادة",
        change: "+11%"
    },
    {
        name: "منتج 3",
        sales: 300,
        revenue: "$4,987",
        trend: "زيادة",
        change: "+20%"
    },
    {
        name: "منتج 4",
        sales: 400,
        revenue: "$3,987",
        trend: "زيادة",
        change: "+15%"
    },
];

function TableSection() {

    const getStatusBadge = (status) => {
        switch (status) {
            case "مكتمل":
                return "badge bg-success-subtle text-success-emphasis";
            case "قيد المعالجة":
                return "badge bg-warning-subtle text-warning-emphasis";
            case "ملغى":
                return "badge bg-danger-subtle text-danger-emphasis";
            default:
                return "badge bg-secondary-subtle text-secondary-emphasis";
        }
    };

    return (
        <div className='container-fluid'>
            <div className='row g-4'>
                {/* Recent Orders */}
                <div className='col-12'>
                    <div className='card shadow-sm'>
                        <div className='card-header bg-white border-bottom p-3'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <div>
                                    <h5 className='card-title mb-1'>احدث الطلبات</h5>
                                    <p className='text-muted small mb-0'>اخر طلبات العملاء</p>
                                </div>
                                <a href="#" className='btn btn-link p-0'>عرض الكل</a>
                            </div>
                        </div>
                        <div className='table-responsive'>
                            <table className='table table-hover table-borderless mb-0'>
                                <thead className='table-light'>
                                    <tr>
                                        <th scope='col' className='text-nowrap p-3'>رقم الطلب</th>
                                        <th scope='col' className='text-nowrap p-3'>العميل</th>
                                        <th scope='col' className='text-nowrap p-3'>الطلب</th>
                                        <th scope='col' className='text-nowrap p-3'>الكمية</th>
                                        <th scope='col' className='text-nowrap p-3'>الحالة</th>
                                        <th scope='col' className='text-nowrap p-3'>التاريخ</th>
                                        <th scope='col' className='text-nowrap p-3'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td className='p-3'><span className='text-primary fw-semibold'>#{order.id}</span></td>
                                            <td className='p-3'>{order.customer}</td>
                                            <td className='p-3'>{order.product}</td>
                                            <td className='p-3'>{order.amount}</td>
                                            <td className='p-3'><span className={getStatusBadge(order.status)}>{order.status}</span></td>
                                            <td className='p-3'>{order.date}</td>
                                            <td className='p-3'><button className='btn btn-light btn-sm'><i className="bi bi-three-dots"></i></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Top Products */}
                <div className='col-12'>
                    <div className='card shadow-sm'>
                        <div className='card-header bg-white border-bottom p-3'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <div>
                                    <h5 className='card-title mb-1'>اعلى المنتجات</h5>
                                    <p className='text-muted small mb-0'>أفضل المنتجات مبيعاً</p>
                                </div>
                                <a href="#" className='btn btn-link p-0'>عرض الكل</a>
                            </div>
                        </div>
                        <div className='list-group list-group-flush'>
                            {topProducts.map((product, index) => (
                                <div className='list-group-item list-group-item-action' key={index}>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div className='flex-grow-1 me-3'>
                                            <h6 className='mb-1 fw-semibold'>{product.name}</h6>
                                            <p className='text-muted small mb-0'>{product.sales} مبيعات</p>
                                        </div>
                                        <div className='text-end'>
                                            <p className='fw-semibold mb-1'>{product.revenue}</p>
                                            <div className='d-flex align-items-center justify-content-end gap-1'>
                                                {product.trend === "زيادة" ? (
                                                    <i className="bi bi-arrow-up text-success"></i>
                                                ) : (
                                                    <i className="bi bi-arrow-down text-danger"></i>
                                                )}
                                                <span className={`small fw-medium ${product.trend === "زيادة" ? "text-success" : "text-danger"}`}>
                                                    {product.change}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableSection;