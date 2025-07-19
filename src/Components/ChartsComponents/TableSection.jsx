import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function TableSection() {
    const { orders } = useSelector((state) => state.Orders);
      const navigate = useNavigate();

    // أحدث 4 طلبات مرتبة تنازلياً حسب التاريخ
    const recentOrders = useMemo(() => {
        return [...orders]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 4);
    }, [orders]);

    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case "تم التوصيل":
            case "مكتمل":
                return "badge bg-success-subtle text-success-emphasis";
            case "pending":
            case "قيد المعالجة":
                return "badge bg-warning-subtle text-warning-emphasis";
            case "inprogress":
            case "جاري التنفيذ":
                return "badge bg-info-subtle text-info-emphasis";
            case "returns":
            case "مرتجع":
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
                                    <h5 className='card-title mb-1'>أحدث الطلبات</h5>
                                    <p className='text-muted small mb-0'>آخر طلبات العملاء</p>
                                </div>
                                <a 
                                onClick={()=>navigate("/Dashboard/Orders")}
                                className='btn btn-link p-0'>عرض الكل</a>
                            </div>
                        </div>
                        <div className='table-responsive pb-2'>
                            <table className='table table-hover table-borderless mb-0'>
                                <thead className='table-light'>
                                    <tr>
                                        <th className='text-nowrap p-3'>رقم الطلب</th>
                                        <th className='text-nowrap p-3'>العميل</th>
                                        
                                     
                                        <th className='text-nowrap p-3'>الحالة</th>
                                        <th className='text-nowrap p-3'>التاريخ</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td className='p-3'><span className='text-primary fw-semibold'>#{order.id}</span></td>
                                            <td className='p-3'>{order.user.name || "—"}</td>
                                        
                                            
                                            <td className='p-3'>
                                                <span className={getStatusBadge(order.status)}>{order.status}</span>
                                            </td>
                                            <td className='p-3'>
                                                {new Date(order.created_at).toLocaleDateString('ar-EG')}
                                            </td>
                                          
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* باقي الكارتات مثلاً أعلى المنتجات... احتفظ بها كما هي أو حدثها حسب الداتا الفعلية */}
            </div>
        </div>
    );
}

export default TableSection;
