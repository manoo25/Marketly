import React, { useEffect, useState } from "react";
import "../../css/Table.css";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaPrint } from "react-icons/fa";
import ReturnsFilter from "./ReturnsFilter";
import CustomMenu from "../globalComonents/CustomMenu";
import LabeledMenu from "../globalComonents/LabeledMenu";
import Loading from "../globalComonents/loading";
import { supabase } from "../../Supabase/SupabaseClient";
import { deleteOrder, getReturnOrders, updateOrder } from "../../Redux/Slices/OrdersSlice";
import RowsPerPageSelector from "../globalComonents/RowsPerPageSelector";



// const rowsPerPage = 8;

const ReturnsTbl = () => {
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.Orders);
    const returns = useSelector((state) => state.Orders.orders);

    const [currentReturns, setcurrentReturns] = useState([]);
    const [filteredReturns, setFilteredReturns] = useState([]);
    const [SelectedReturns, SetSelectedReturns] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [selectedGovernorate, setSelectedGovernorate] = useState("");
    const [selectedState, setSelectedState] = useState("");


    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
   dispatch(getReturnOrders());
}, [dispatch]);
console.log(returns)

    // effect for filtering
    useEffect(() => {
        const filtered = returns.filter((returnItem) => {
            const matchName =
                searchName === "" ||
                (returnItem.users?.name && returnItem.users.name.toLowerCase().includes(searchName.toLowerCase()));

            const matchState =
                selectedState === "" ||
                (returnItem.status && returnItem.status.toLowerCase().includes(selectedState.toLowerCase()));

            const matchGov =
                selectedGovernorate === "" ||
                (returnItem.users?.governorate && returnItem.users.governorate.toLowerCase().includes(selectedGovernorate.toLowerCase()));

            return matchName && matchState && matchGov;
        });
        setFilteredReturns(filtered);
        setCurrentPage(1);
    }, [searchName, selectedGovernorate, selectedState, returns]);


    // update current Returns based on pagination or filtered list change
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const sliced = filteredReturns.slice(startIndex, startIndex + rowsPerPage);
        setcurrentReturns(sliced);
    }, [filteredReturns, currentPage, rowsPerPage]);

    const totalPages = Math.ceil(filteredReturns.length / rowsPerPage);


    function onResetFilters() {
        setSearchName("");
        setSelectedState("");
        setSelectedGovernorate("");
        setCurrentPage(1);
    }

    // Returns Status
    const returnStatuses = [
        "inprogress",
        "done",
        "pending",
    ];

    const getStatusBgColor = (status) => {
        switch (status) {
            case "pending":
                return "gold";
            case "done":
                return "#065f12ff";
            case "returns":
                return "#ca1c1cff";
            default:
                return "#000000ff";
        }
    };

    // Returns Status Modal
    const [stateModalOpen, setStateModalOpen] = useState(false);
    const [returnToEdit, setReturnToEdit] = useState(null);
    const [newStatus, setNewStatus] = useState("");

    const handleOpenStateModal = (returnItem) => {
        setReturnToEdit(returnItem);
        setNewStatus(returnItem.status || "");
        setStateModalOpen(true);
    };

    const handleUpdateReturnStatus = async () => {
        if (!returnToEdit || !newStatus) return;
        await dispatch(updateOrder({ id: returnToEdit.id, updatedData: { status: newStatus } }));
        setStateModalOpen(false);
        setReturnToEdit(null);
        dispatch(getReturnOrders());
    };

    // مودال تعديل حالة مجموعة طلبات
    const [bulkStateModalOpen, setBulkStateModalOpen] = useState(false);
    const [bulkNewStatus, setBulkNewStatus] = useState("");

    const handleBulkUpdateReturnStatus = async () => {
        if (!bulkNewStatus || SelectedReturns.length === 0) return;
        for (const id of SelectedReturns) {
            await dispatch(updateOrder({ id, updatedData: { status: bulkNewStatus } }));
        }
        setBulkStateModalOpen(false);
        setBulkNewStatus("");
        SetSelectedReturns([]);
        dispatch(getReturnOrders());
    };

    // حذف مجموعة طلبات مع حذف order_items المرتبطة
    const handleBulkDeleteReturns = async () => {
        if (SelectedReturns.length === 0) return;
        if (!window.confirm(`هل أنت متأكد أنك تريد حذف ${SelectedReturns.length} طلب؟`)) return;
        for (const id of SelectedReturns) {
            // حذف order_items المرتبطة أولاً
            await supabase.from("order_items").delete().eq("order_id", id);
            // ثم حذف الطلب نفسه
            await dispatch(deleteOrder(id));
        }
        SetSelectedReturns([]);
        dispatch(getReturnOrders());
    };

    // حذف طلب فردي مع حذف order_items المرتبطة
    const handleDeleteReturn = async (orderId) => {
        if (window.confirm("هل أنت متأكد أنك تريد حذف هذا الطلب؟")) {
            await supabase.from("order_items").delete().eq("order_id", orderId);
            await dispatch(deleteOrder(orderId));
            SetSelectedReturns(prev => prev.filter(id => id !== orderId));
             dispatch(getReturnOrders());
        }
    };

    // State لمودال عرض تفاصيل الطلب
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [orderItems, setOrderItems] = useState([]);
    const [viewOrderId, setViewOrderId] = useState(null);
    const handleViewOrder = async (orderId) => {
        setViewOrderId(orderId);
        setViewModalOpen(true);
        // جلب بيانات order_items مع بيانات المنتج المرتبطة
        const { data, error } = await supabase
            .from("order_items")
            .select(`
                *,
                product_id (
                    name,
                    image
                )
            `)
            .eq("order_id", orderId);

        if (!error) setOrderItems(data || []);
        else setOrderItems([]);
    };

        // دالة طباعة الفاتورة
    const handlePrintInvoice = () => {
        const printContents = document.getElementById("order-invoice-print").innerHTML;
        const win = window.open('', '', 'height=700,width=900');
        win.document.write('<html><head><title>فاتورة الطلب</title>');
        win.document.write(`
      <style>
        body{direction:rtl;font-family:tahoma,Arial,sans-serif;background:#fff;}
        .invoice-container{border-radius:12px;padding:24px;max-width:700px;margin:0 auto;background:#fff;}
        h2{color:#007bff;text-align:center;font-weight:bold;}
        .invoice-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;}
        .invoice-header .order-id{font-size:15px;}
        .customer-info{font-size:16px;margin-bottom:8px;}
        .table{width:100%;border-collapse:collapse;margin:24px 0;}
        .table th,.table td{border:1px solid #ccc;padding:8px;text-align:center;}
        .table th{background:#f8f9fa;}
        .summary{display:flex;justify-content:start;align-items:center;margin-top:24px;font-size:18px;}
        .summary-box{border:1px solid #eee;padding:16px;border-radius:8px;background:#f7f7f7;min-width:250px;}
        .summary-box div{display:flex;justify-content:space-between;margin-bottom:8px;} 
        .thanks{text-align:center;margin-top:32px;font-size:15px;color:#888;}
      </style>
    `);
        win.document.write('</head><body >');
        win.document.write(`<div class="invoice-container">${printContents}</div>`);
        win.document.write('</body></html>');
        win.document.close();
        win.focus();
        win.print();
        win.close();
    };





    // دالة لتنسيق التاريخ: يوم-شهر-سنة بالأرقام العربية
    const formatArabicDate = (dateString) => {
        if (!dateString) return "--";
        const date = new Date(dateString);
        // تحويل الأرقام إلى أرقام عربية
        const toArabicDigits = n => n.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
        const day = toArabicDigits(date.getDate());
        const month = toArabicDigits(date.getMonth() + 1);
        const year = toArabicDigits(date.getFullYear());
        return `${day}-${month}-${year}`;
    };


    return (
        <>{loading?<Loading/>:
          <div>
              <ReturnsFilter
                searchName={searchName}
                setSearchName={setSearchName}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                selectedGovernorate={selectedGovernorate}
                setSelectedGovernorate={setSelectedGovernorate}
                onResetFilters={onResetFilters}
            />
            <div className="user-table">
                <table border="1" width="100%" dir="rtl" className="table">
                    <thead>
                        <tr>
                            <th >
                                <label className="checkbox-wrapper">
                                    <input
                                        type="checkbox"
                                        checked={
                                            currentReturns.length > 0 &&
                                            currentReturns.every((ret) => SelectedReturns.includes(ret.id))
                                        }
                                        onChange={e => {
                                            if (e.target.checked) {
                                                SetSelectedReturns(prev => [
                                                    ...prev,
                                                    ...currentReturns
                                                        .map(o => o.id)
                                                        .filter(id => !prev.includes(id))
                                                ]);
                                            } else {
                                                SetSelectedReturns(prev => prev.filter(id => !currentReturns.map(o => o.id).includes(id)));
                                            }
                                        }}
                                    />
                                </label>
                            </th>
                            <th>
                                <label htmlFor="select-all">اسم العميل</label>
                            </th>
                            <th>رقم العميل</th>
                            <th>المحافظة</th>
                            <th>الحالة</th>
                            <th>اجمالى</th>
                           
                            
                            <th>تاريخ الاسترجاع</th>
                            <th>عرض </th>
                            <th style={{ position: "relative", zIndex: 1 }}>

                                <LabeledMenu
                                    id="bulkActions"
                                    label="إجراءات جماعية"
                                    options={[
                                        {
                                            label: "تعديل الحالة", icon: "fa-solid fa-user-pen", color: "blue", onClick: () => {
                                                if (SelectedReturns.length === 0) {
                                                    alert("من فضلك اختر طلبات أولاً");
                                                    return;
                                                }
                                                setBulkStateModalOpen(true);
                                            }
                                        },
                                        {
                                            label: "مسح المحدد", icon: "fa-solid fa-trash", color: "red", onClick: () => {
                                                if (SelectedReturns.length === 0) {
                                                    alert("من فضلك اختر طلبات أولاً");
                                                    return;
                                                }
                                                handleBulkDeleteReturns()
                                            }
                                        }
                                    ]}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentReturns.map((ret) => (
                            <tr key={ret.id}>
                                <td >
                                    <label className="checkbox-wrapper">
                                        <input
                                            type="checkbox"
                                            checked={SelectedReturns.includes(ret.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    SetSelectedReturns((prev) => [...prev, ret.id]);
                                                } else {
                                                    SetSelectedReturns((prev) => prev.filter((id) => id !== ret.id));
                                                }
                                            }}
                                        />

                                    </label>
                                </td>
                                <td>{ret.user?.name || "--"}</td>
                                <td>{ret.user?.phone || "--"}</td>
                                <td>{ret.user?.governorate || "--"}</td>
                                 <td style={{ color: getStatusBgColor(ret.status), fontWeight: 'bold' }}>
                                    {
                                    ret.status=='returns'&&'مرتجع'
                                    }
                                </td>
                                <td>{ret.total || "--"} ج.م</td>
                               
                              
                                <td>{formatArabicDate(ret.created_at) || "--"}</td>
                                <td>
                                    <button className="btn btn-link p-0" title="عرض الطلب" onClick={() => handleViewOrder(ret.id)}>
                                        <FaEye size={20} color="#000000" />
                                    </button>
                                </td>
                               <td style={{}}>

                                    <CustomMenu
                                        id={ret.id}
                                        options={[
                                            {
                                                label: "تعديل الحالة", icon: "fa-solid fa-user-pen", color: "blue", onClick: () => handleOpenStateModal(ret)
                                            },
                                            { label: "مسح الطلب", icon: "fa-solid fa-trash", color: "red", onClick: () => handleDeleteReturn(ret.id) }
                                        ]}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

                <div className="pagination-container mt-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                    {/* اليمين: السليكتور */}
                    <div>
                        <RowsPerPageSelector value={rowsPerPage} onChange={setRowsPerPage} />
                    </div>

                    {/* الوسط: الباجينيشن */}
                    <div className="pagination d-flex gap-1 flex-wrap justify-content-center">
                        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                            &laquo;
                        </button>
                        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                            &lt;
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={currentPage === index + 1 ? "active" : ""}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                            &gt;
                        </button>
                        <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
                            &raquo;
                        </button>
                    </div>

                    {/* الشمال: رسالة عرض العناصر */}
                    <p className="mt-4 small text-muted">
                    {returns.length === 0 ? (
                        "لا يوجد شكاوى للعرض"
                    ) : (
                            <>عرض {(currentPage - 1) * rowsPerPage + 1} - {Math.min(currentPage * rowsPerPage, returns.length)} من أصل {returns.length} مرتجع</>
                    )}
                        
                    </p>
                </div>
          </div>
        }
        


            {/* مودال تعديل حالة الطلب */}
            {stateModalOpen && returnToEdit && (
                <div className="modal show fade d-block " tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content text-end">
                            <div className="modal-header">
                                <h5 className="modal-title w-100 text-center fw-bold">
                                    تعديل حالة الطلب
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setStateModalOpen(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <label className="form-label fw-bold">اختر الحالة الجديدة:</label>
                                <select
                                    className="form-control text-end"
                                    value={newStatus}
                                    onChange={e => setNewStatus(e.target.value)}
                                >
                                    <option value="">اختر الحالة</option>
                                    {returnStatuses.map(status => (
                                        <option key={status} value={status}>
                                           {status=='done'&&'تم الاستلام'||
                                    status=='pending'&&'معلق'||
                                    status=='inprogress'&&'قيد التنفيذ'
                                    }
                                            </option>
                                    ))}
                                </select>
                            </div>
                            <div className="modal-footer justify-content-end">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setStateModalOpen(false)}
                                >
                                    إلغاء
                                </button>
                                <button
                                    className="btn btn-primary"
                                    disabled={!newStatus || newStatus === returnToEdit.status}
                                    onClick={handleUpdateReturnStatus}
                                >
                                    تأكيد
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* مودال تعديل حالة  الطلبات */}
            {bulkStateModalOpen && (
                <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content text-end">
                            <div className="modal-header">
                                <h5 className="modal-title w-100 text-center fw-bold">
                                    تعديل حالة {SelectedReturns.length} طلب
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setBulkStateModalOpen(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <label className="form-label fw-bold">اختر الحالة الجديدة:</label>
                                <select
                                    className="form-control text-end"
                                    value={bulkNewStatus}
                                    onChange={e => setBulkNewStatus(e.target.value)}
                                >
                                    <option value="">اختر الحالة</option>
                                    {returnStatuses.map(status => (
                                        <option key={status} value={status}>
                                            {status=='done'&&'تم الاستلام'||
                                    status=='pending'&&'معلق'||
                                    status=='inprogress'&&'قيد التنفيذ'
                                    }
                                            </option>
                                    ))}
                                </select>
                            </div>
                            <div className="modal-footer justify-content-end">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setBulkStateModalOpen(false)}
                                >
                                    إلغاء
                                </button>
                                <button
                                    className="btn btn-primary"
                                    disabled={!bulkNewStatus}
                                    onClick={handleBulkUpdateReturnStatus}
                                >
                                    تأكيد
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {viewModalOpen && (
                            <div className="modal show fade d-block modal-lg" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content text-end">
                                        <div className="modal-header">
                                            <h5 className="modal-title w-100 text-center fw-bold">
                                                فاتورة الطلب رقم {viewOrderId}
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={() => setViewModalOpen(false)}
                                            ></button>
                                        </div>
                                        <div className="modal-body" id="order-invoice-print">
                                            <div style={{ border: '0.1rem solid #00000073', borderRadius: 12, padding: 24, background: '#fff', maxWidth: 700, margin: '0 auto' }}>
                                                {/* رأس الفاتورة */}
                                                <div className="d-flex justify-content-between align-items-center mb-4">
                                                    <div>
                                                        <h2 className="fw-bold mb-1" >فاتورة بيع</h2>
                                                        <div style={{ fontSize: 15 }}>رقم الطلب: <span className="fw-bold">{viewOrderId}</span></div>
                                                    </div>
                                                    {/* <div>
                            <img src="/logo192.png" alt="شعار" style={{height:60}} />
                          </div> */}
                                                </div>
                                                {/* بيانات العميل */}
                                                {returns.filter(x => x.id === viewOrderId).map(order => (
                                                    <>
                                                        <div className="mb-2" style={{ fontSize: 16 }}>
                                                            <span className="fw-bold">اسم العميل:</span> {order.orders?.users?.name || "--"}
                                                        </div>
                                                        <div className="mb-2" style={{ fontSize: 16 }}>
                                                            <span className="fw-bold"> رقم الهاتف:</span> {order.orders?.users?.phone || "--"}
                                                        </div>
                                                        <div className="mb-2" style={{ fontSize: 16 }}>
                                                            <span className="fw-bold">المدينة:</span> {order.orders?.users?.city || "--"}
                                                        </div>
                                                        <div className="mb-2" style={{ fontSize: 16 }}>
                                                            <span className="fw-bold">العنوان:</span> {order.orders?.users?.location || "--"}
                                                        </div>
                                                        <div className="mb-2" style={{ fontSize: 16 }}>
                                                            <span className="fw-bold">سبب الارتجاع:</span> {order.reason || "--"}
                                                        </div>
                                                        <div className="mb-2" style={{ fontSize: 16 }}>
                                                            <span className="fw-bold">تاريخ الطلب:</span> {formatArabicDate(order.created_at)}
                                                        </div>
                                                    </>
                                                ))}
                                                {/* جدول المنتجات */}
                                                <table className="table table-bordered text-center mb-4 mt-4" style={{ fontSize: 16 }}>
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th>م</th>
                                                            <th>اسم المنتج</th>
                                                            <th>صورة المنتج</th>
                                                            <th>الكمية</th>
                                                            <th>السعر</th>
                                                            <th>الإجمالي</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {orderItems.map((item, idx) => (
                                                            <tr key={item.id}>
                                                                <td>{idx + 1}</td>
                                                                <td>{item.product_id?.name || item.name || '--'}</td>
                                                                <td>
                                                                    {item.product_id?.image || item.image ? (
                                                                        <img
                                                                            src={item.product_id?.image || item.image}
                                                                            alt={item.product_id?.name || item.name || '--'}
                                                                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }}
                                                                        />
                                                                    ) : (
                                                                        <span>--</span>
                                                                    )}
                                                                </td>
                                                                <td>{item.quantity}</td>
                                                                <td>{item.price}</td>
                                                                <td>{item.price * item.quantity}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                {/* ملخص */}
                                                {returns.filter(x => x.id === viewOrderId).map(order => (
                                                    <div key={order.id} className="d-flex justify-content-start align-items-center mt-3" style={{ fontSize: 18 }}>
                                                        <div className="border p-3 rounded bg-light" style={{ minWidth: 250 }}>
                                                            <div className="d-flex justify-content-between mb-2">
                                                                <span>المجموع الكلي:</span>
                                                                <span className="fw-bold">{order.total} ج.م</span>
                                                            </div>
                                                            <div className="d-flex justify-content-between mb-2">
                                                                <span>طريقة الدفع:</span>
                                                                <span>{order.payment_method}</span>
                                                            </div>
                                                            <div className="d-flex justify-content-between mb-2">
                                                                <span>حالة الطلب:</span>
                                                                <span style={{ color: getStatusBgColor(order.status), fontWeight: 'bold' }}> {
                                    order.status=='returns'&&'مرتجع'
                                    }</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="text-center mt-4" style={{ fontSize: 15, color: '#888' }}>شكرًا لتعاملكم معنا</div>
                                            </div>
                                        </div>
                                        <div className="modal-footer justify-content-end">
                                            <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handlePrintInvoice}>
                                                <FaPrint size={18} />
                                                <span>طباعة</span>
                                            </button>
                                            <button className="btn btn-secondary" onClick={() => setViewModalOpen(false)}>
                                                إغلاق
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

        </>
    );
};

export default ReturnsTbl;
