import React, { useEffect, useState } from "react";
import "../../css/Table.css";
import { useDispatch, useSelector } from "react-redux";
import ModalConfirm from "../UsersComponents/ModalConfirm";
import { fetchOrderItems } from "../../Redux/Slices/OrderItems";
import BestProFilter from "./bestProFilter";
import Loading from "../globalComonents/loading";
import { UserRole } from "../../Redux/Slices/token";
import RowsPerPageSelector from "../globalComonents/RowsPerPageSelector";

// const rowsPerPage = 8;

const MostSellingTbl = () => {
  
    const [rowsPerPage, setRowsPerPage] = useState(8);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.OrderItems.items);
  const { loading } = useSelector((state) => state.OrderItems);

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const [confirmModal, setConfirmModal] = useState({
    open: false,
    message: "",
    confirmText: "تأكيد",
    confirmClass: "btn-primary",
    onConfirm: () => {},
  });

  // ✅ استدعاء البيانات دائمًا عند أول تحميل
  useEffect(() => {
  
     dispatch(fetchOrderItems());
   
  }, [dispatch,UserRole]);

  // ✅ دمج المنتجات بعد التأكد أن البيانات ليست فارغة
  useEffect(() => {
    if (data.length > 0) {
      const mergeByProductName = (items) => {
        const mergedMap = new Map();

        for (const item of items) {
          const key = item.product_id?.name;
          if (!mergedMap.has(key)) {
            mergedMap.set(key, { ...item });
          } else {
            const existing = mergedMap.get(key);
            existing.quantity += item.quantity;
            existing.price += item.price;
          }
        }

        return Array.from(mergedMap.values());
      };

      const merged = mergeByProductName(data);
      setProducts(merged);
    }
  }, [data]);

  // ✅ فلترة المنتجات
  const filteredProducts = products
    .filter((x) => x.order_id?.status === "تم التوصيل")
    .filter((x) => {
      const matchName =
        searchName === "" ||
        (x.product_id?.name &&
          x.product_id.name.toLowerCase().includes(searchName.toLowerCase()));

      const matchCat =
        selectedCat === "" ||
        (x.product_id?.category_id?.name &&
          x.product_id.category_id.name.toLowerCase().includes(selectedCat.toLowerCase()));

      const matchCompany =
        selectedCompany === "" ||
        (x.product_id?.company_id?.name &&
          x.product_id.company_id.name.toLowerCase().includes(selectedCompany.toLowerCase()));

      return matchName && matchCat && matchCompany;
    })
    .sort((a, b) => b.quantity - a.quantity);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchName, selectedCat, selectedCompany,setRowsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + rowsPerPage);

  const onResetFilters = () => {
    setSearchName("");
    setSelectedCat("");
    setSelectedCompany("");
    setCurrentPage(1);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <BestProFilter
            searchName={searchName}
            setSearchName={setSearchName}
            selectedCat={selectedCat}
            setselectedCat={setSelectedCat}
            selectedCompany={selectedCompany}
            setselectedCompany={setSelectedCompany}
            onSearchClick={() => {}}
            onResetFilters={onResetFilters}
          />

          <div className="user-table">
            <table border="1" width="100%" dir="rtl" className="table">
              <thead>
                <tr>
                  <th>صورة</th>
                  <th>اسم المنتج</th>
                  <th>التصنيف</th>
                  <th>الشركة</th>
                  <th>الكمية المباعة</th>
                  <th>سعر المنتج</th>
                  <th>الإجمالى</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      {product.product_id?.image ? (
                        <img
                          src={product.product_id.image}
                          alt={product.product_id.name}
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
                    <td>{product.product_id?.name}</td>
                    <td>{product.product_id?.category_id?.name || "--"}</td>
                    <td>{product.product_id?.company_id?.name || "--"}</td>
                    <td>{product.quantity}</td>
                    <td>{product.product_id?.traderprice}</td>
                    <td>{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ModalConfirm
            isOpen={confirmModal.open}
            onClose={() => setConfirmModal((prev) => ({ ...prev, open: false }))}
            onConfirm={confirmModal.onConfirm}
            message={confirmModal.message}
            confirmText={confirmModal.confirmText}
            confirmClass={confirmModal.confirmClass}
          />


          {/* Pagination */}
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
              {filteredProducts.length === 0 ? (
                "لا يوجد منتجات للعرض"
              ) : (
                <>عرض {startIndex + 1} - {Math.min(startIndex + rowsPerPage, filteredProducts.length)} من أصل {filteredProducts.length} منتج</>
              )}
                
              </p>
            </div>

        </div>
      )}
    </>
  );
};

export default MostSellingTbl;
