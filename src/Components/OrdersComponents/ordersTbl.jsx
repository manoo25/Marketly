import React, { useEffect, useState } from "react";
import "../../css/Table.css";
import { useDispatch, useSelector } from "react-redux";
import {
    getOrders,
    deleteOrder,
    updateOrder,
} from "../../Redux/Slices/OrdersSlice";
import OrdersFilter from "./OrdersFilter";
import CustomMenu from "../globalComonents/CustomMenu";
import LabeledMenu from "../globalComonents/LabeledMenu";
import { supabase } from "../../Supabase/supabaseClient";
import { FaEye } from "react-icons/fa";

const rowsPerPage = 4;

const OrdersTbl = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.Orders);
    console.log(orders);

    const [currentPage, setCurrentPage] = useState(1);

    const [currentOrders, setcurrentOrders] = useState([]);
    const [SelectedOrders, SetSelectedOrders] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [selectedGovernorate, setselectedGovernorate] = useState("");
    const [selectedState, setselectedState] = useState("");

    // fetch all Orders once
    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    // update current Orders based on pagination or full list change
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const sliced = orders.slice(startIndex, startIndex + rowsPerPage);
        setcurrentOrders(sliced);
    }, [orders, currentPage]);

    const totalPages = Math.ceil(orders.length / rowsPerPage);





    const handleSearchClick = () => {
        const filtered = orders.filter((x) => {
            const matchName =
                searchName === "" ||
                (x.name && x.name.toLowerCase().includes(searchName.toLowerCase()));

            const matchState =
                selectedState === "" ||
                (x.state?.name &&
                    x.category.name.toLowerCase().includes(selectedState.toLowerCase()));

            const matchGov =
                selectedGovernorate === "" ||
                (x.trader?.name &&
                    x.trader.name.toLowerCase().includes(selectedGovernorate.toLowerCase()));

            // ابحث بجميع القيم المدخلة (اللي مش فاضية)
            return matchName && matchState && matchGov;
        });

        setcurrentOrders(filtered);
    };
    function onResetFilters() {
        setSearchName("");
        setselectedState("");
        setselectedGovernorate("");
        setCurrentPage(1); // اختياري، لو عايز ترجع لأول
        setcurrentOrders(orders); // رجّع كل المنتجات الأصلية
    }

    // Checkbox for select Orders and select all page 
    // const [selectedOrderIds, setSelectedOrderIds] = useState([]);



    // Order Status
    const orderStatuses = [
        "قيد التنفيذ",
        "تم التوصيل",
        "ملغي"
    ];

    const getStatusBgColor = (status) => {
        switch (status) {
            case "قيد التنفيذ":
                return "gold";
            case "تم التوصيل":
                return "#065f12ff";
            case "ملغي":
                return "#ca1c1cff";
            default:
                return "#000000ff";
        }
    };

    // Order Status Modal
    const [stateModalOpen, setStateModalOpen] = useState(false);
    const [orderToEdit, setOrderToEdit] = useState(null);
    const [newStatus, setNewStatus] = useState("");

    const handleOpenStateModal = (order) => {
        setOrderToEdit(order);
        setNewStatus(order.status || "");
        setStateModalOpen(true);
    };

    const handleUpdateOrderStatus = async () => {
        if (!orderToEdit || !newStatus) return;
        await dispatch(updateOrder({ id: orderToEdit.id, updatedData: { status: newStatus } }));
        setStateModalOpen(false);
        setOrderToEdit(null);
    };

    // مودال تعديل حالة مجموعة طلبات
    const [bulkStateModalOpen, setBulkStateModalOpen] = useState(false);
    const [bulkNewStatus, setBulkNewStatus] = useState("");

    const handleBulkUpdateOrderStatus = async () => {
        if (!bulkNewStatus || SelectedOrders.length === 0) return;
        for (const id of SelectedOrders) {
            await dispatch(updateOrder({ id, updatedData: { status: bulkNewStatus } }));
        }
        setBulkStateModalOpen(false);
        setBulkNewStatus("");
        SetSelectedOrders([]);
    };

    // حذف مجموعة طلبات مع حذف order_items المرتبطة
    const handleBulkDeleteOrders = async () => {
        if (SelectedOrders.length === 0) return;
        if (!window.confirm(`هل أنت متأكد أنك تريد حذف ${SelectedOrders.length} طلب؟`)) return;
        for (const id of SelectedOrders) {
            // حذف order_items المرتبطة أولاً
            await supabase.from("order_items").delete().eq("order_id", id);
            // ثم حذف الطلب نفسه
            await dispatch(deleteOrder(id));
        }
        SetSelectedOrders([]);
        dispatch(getOrders());
    };

    // حذف طلب فردي مع حذف order_items المرتبطة
    const handleDeleteOrder = async (orderId) => {
        if (window.confirm("هل أنت متأكد أنك تريد حذف هذا الطلب؟")) {
            await supabase.from("order_items").delete().eq("order_id", orderId);
            await dispatch(deleteOrder(orderId));
            SetSelectedOrders(prev => prev.filter(id => id !== orderId));
            dispatch(getOrders());
        }
    };

    // State لمودال عرض تفاصيل الطلب
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [orderItems, setOrderItems] = useState([]);
    const [viewOrderId, setViewOrderId] = useState(null);
  const handleViewOrder = async (orderId) => {
    setViewOrderId(orderId);
    setViewModalOpen(true);
    // جلب بيانات order_items مع بيانات المنتج المرتبط
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

    return (
        <>

            <OrdersFilter
                searchName={searchName}
                setSearchName={setSearchName}
                selectedState={selectedState}
                setselectedState={setselectedState}
                selectedGovernorate={selectedGovernorate}
                setselectedGovernorate={setselectedGovernorate}
                onSearchClick={handleSearchClick}
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
                                            currentOrders.length > 0 &&
                                            currentOrders.every((order) => SelectedOrders.includes(order.id))
                                        }
                                        onChange={e => {
                                            if (e.target.checked) {
                                                SetSelectedOrders(prev => [
                                                    ...prev,
                                                    ...currentOrders
                                                        .map(o => o.id)
                                                        .filter(id => !prev.includes(id))
                                                ]);
                                            } else {
                                                SetSelectedOrders(prev => prev.filter(id => !currentOrders.map(o => o.id).includes(id)));
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
                            <th>العنوان</th>
                            <th>الحاله</th>
                            <th>طريقة الدفع</th>
                            <th>المجموع</th>
                            <th>تاريخ الطلب</th>
                            <th>عرض الطلب</th>
                            <th style={{ position: "relative", zIndex: 1 }}>

                                <LabeledMenu
                                    id="bulkActions"
                                    label="إجراءات جماعية"
                                    options={[
                                        {
                                            label: "تعديل الحالة", icon: "fa-solid fa-user-pen", color: "blue", onClick: () => {
                                                if (SelectedOrders.length === 0) {
                                                    alert("من فضلك اختر طلبات أولاً");
                                                    return;
                                                }
                                                setBulkStateModalOpen(true);
                                            }
                                        },
                                        {
                                            label: "مسح المحدد", icon: "fa-solid fa-trash", color: "red", onClick: () => {
                                                if (SelectedOrders.length === 0) {
                                                    alert("من فضلك اختر طلبات أولاً");
                                                    return;
                                                }
                                                handleBulkDeleteOrders()
                                            }
                                        }
                                    ]}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map((order) => (
                            <tr key={order.id}>
                                <td >
                                    <label className="checkbox-wrapper">
                                        <input
                                            type="checkbox"
                                            checked={SelectedOrders.includes(order.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    SetSelectedOrders((prev) => [...prev, order.id]);
                                                } else {
                                                    SetSelectedOrders((prev) => prev.filter((id) => id !== order.id));
                                                }
                                            }}
                                        />

                                    </label>
                                </td>

                                <td>{order.user?.name || "--"}</td>
                                <td>{order.user?.phone || "--"}</td>
                                <td>{order.user?.city || "--"}</td>
                                <td>{order.user?.location || "--"}</td>
                                <td style={{ color: getStatusBgColor(order.status), fontWeight: 'bold' }}>
                                    {order.status}
                                </td>
                                <td>{order.payment_method}</td>
                                <td>{order.total} <span className="px-1">ج.م</span></td>
                                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                <td>
                                    <button className="btn btn-link p-0" title="عرض الطلب" onClick={() => handleViewOrder(order.id)}>
                                        <FaEye size={20} color="#000000" />
                                    </button>
                                </td>
                                <td style={{}}>

                                    <CustomMenu
                                        id={order.id}
                                        options={[
                                            {
                                                label: "تعديل الحالة", icon: "fa-solid fa-user-pen", color: "blue", onClick: () => handleOpenStateModal(order)
                                            },
                                            { label: "مسح الطلب", icon: "fa-solid fa-trash", color: "red", onClick: () => handleDeleteOrder(order.id) }
                                        ]}
                                    />

                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
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

                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                >
                    &gt;
                </button>
                <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    &raquo;
                </button>
            </div>

            {/* مودال تعديل حالة الطلب */}
            {stateModalOpen && orderToEdit && (
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
                                    {orderStatuses.map(status => (
                                        <option key={status} value={status}>{status}</option>
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
                                    disabled={!newStatus || newStatus === orderToEdit.status}
                                    onClick={handleUpdateOrderStatus}
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
                                    تعديل حالة {SelectedOrders.length} طلب
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
                                    {orderStatuses.map(status => (
                                        <option key={status} value={status}>{status}</option>
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
                                    onClick={handleBulkUpdateOrderStatus}
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
            تفاصيل الطلب رقم {viewOrderId}
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setViewModalOpen(false)}
          ></button>
        </div>
        <div className="modal-body">
          {/* جدول المنتجات */}
          {orderItems.length === 0 ? (
            <div className="text-center">لا توجد عناصر لهذا الطلب</div>
          ) : (
            <table className="table table-bordered text-center mb-4">
              <thead>
                <tr>
                  <th>صورة المنتج</th>
                  <th>اسم المنتج</th>
                  <th>الكمية</th>
                  <th>السعر</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      {item.product_id?.image ? (
                        <img
                          src={item.product_id.image}
                          alt={item.product_id.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "6px",
                          }}
                        />
                      ) : (
                        <span>--</span>
                      )}
                    </td>
                    <td>{item.product_id?.name || item.name || '--'}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* تفاصيل الطلب تحت المنتجات */}
          {orders.filter(x => x.id === viewOrderId).map(order => (
            <div key={order.id} className="order-details-box p-3 border rounded bg-light mb-2">
             <div className="d-flex justify-content-between px-3">
                 <p><strong>اسم العميل:</strong> {order.user?.name || "--"}</p>
              <p><strong>رقم الهاتف:</strong> {order.user?.phone || "--"}</p>
             </div>
             <div className="d-flex justify-content-between px-3">
                <p><strong>المدينة:</strong> {order.user?.city || "--"}</p>
              <p><strong>العنوان:</strong> {order.user?.location || "--"}</p>
             </div>
             <div className="d-flex justify-content-between px-3">
                <p>
                <strong>حالة الطلب:</strong>
                <span style={{ color: getStatusBgColor(order.status), fontWeight: 'bold', marginRight: 8 }}>
                  {order.status}
                </span>
              </p>
              <p><strong>طريقة الدفع:</strong> {order.payment_method}</p>
             </div>
             <div className="d-flex justify-content-between px-3">
                <p><strong>المجموع:</strong> {order.total} <span className="px-1">ج.م</span></p>
              <p><strong>تاريخ الطلب:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
             </div>
             
             
             
             
            </div>
          ))}
        </div>
        <div className="modal-footer justify-content-end">
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

export default OrdersTbl;