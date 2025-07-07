import React, { useEffect, useState } from "react";
import "../../css/Table.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../Redux/Slices/OrdersSlice";

const rowsPerPage = 10;

const OrdersTbl = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.Orders);
    console.log(orders);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    const totalPages = Math.ceil(orders.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentOrders = orders.slice(startIndex, startIndex + rowsPerPage);

    return (
        <>
            <div className="user-table">
                <table border="1" width="100%" dir="rtl" className="table">
                    <thead>
                        <tr>
                            <th >
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" />
                                </label>
                            </th>
                            <th>رقم مسلسل</th>
                            <th>رقم العميل</th>
                            <th>التاريخ</th>
                            <th>الحاله</th>
                            <th>طريقة الدفع</th>
                            <th>المجموع</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map((order) => (
                            <tr key={order.id}>
                                <td >
                                    <label className="checkbox-wrapper">
                                        <input type="checkbox" />
                                    </label>
                                </td>
                                <td>
                                    {order.image ? (
                                        <img
                                            src={order.image}
                                            alt={order.name}
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
                                <td>{order.name}</td>
                                <td>{order.category?.name || "--"}</td>
                                <td>{order.traderprice}</td>
                                <td>{order.endprice}</td>
                                <td>{order.company?.name || "--"}</td>
                                <td>{order.trader?.name || "--"}</td>
                                <td>{order.unit || "--"}</td>
                                <td>{order.quantity_per_unit || "--"}</td>
                                <td>{order.quantity}</td>
                                <td>
                                    <div className="dropdown">
                                        <button
                                            className="btn"
                                            type="button"
                                            id={`dropdownMenu${order.id}`}
                                            data-bs-toggle="dropdown"
                                            data-bs-auto-close="outside"
                                            aria-expanded="false"
                                            style={{
                                                width: "42px",
                                                height: "42px",
                                                borderRadius: "12px",
                                                padding: "12px",
                                                background: "#FFFFFF",
                                                border: "1px solid #EFECF3",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#424047"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <circle cx="5" cy="12" r="1" />
                                                <circle cx="12" cy="12" r="1" />
                                                <circle cx="19" cy="12" r="1" />
                                            </svg>
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby={`dropdownMenu${order.id}`}
                                        >
                                            <li>
                                                <button
                                                    className="dropdown-item"
                                                    onClick={() => console.log("Edit", order.id)}
                                                >
                                                    تعديل
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="dropdown-item text-danger"
                                                    onClick={() => console.log("Delete", order.id)}
                                                >
                                                    حذف
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
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
        </>
    );
};

export default OrdersTbl;