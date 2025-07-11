import React, { useEffect, useState } from "react";
import "../../css/Table.css";
import { useDispatch, useSelector } from "react-redux";
import ModalConfirm from "../UsersComponents/ModalConfirm";
import { getAllOrderItems } from "../../Redux/Slices/OrderItems";
import BestProFilter from "./bestProFilter";

const rowsPerPage = 4;

const MostSellingTbl = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.OrderItems.items);
console.log(data);


  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
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
if (currentProducts) {
    console.log(currentProducts);
}
  useEffect(() => {
    dispatch(getAllOrderItems());
  }, [dispatch]);

  useEffect(() => {
    const mergeByProductName = (items) => {
      const mergedMap = new Map();

      for (const item of items) {
        const key = item.ProductName?.name;
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
  }, [data]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const sliced = products.slice(startIndex, startIndex + rowsPerPage);
    setCurrentProducts(sliced);
  }, [products, currentPage]);

  const totalPages = Math.ceil(products.length / rowsPerPage);

  const handleSearchClick = () => {
    const filtered = products.filter((x) => {
      const matchName =
        searchName === "" ||
        (x.ProductName.name &&
          x.ProductName.name.toLowerCase().includes(searchName.toLowerCase()));

      const matchCat =
        selectedCat === "" ||
        (x.ProductName.Category?.name &&
          x.ProductName.Category.name.toLowerCase().includes(selectedCat.toLowerCase()));

      const matchCompany =
        selectedCompany === "" ||
        (x.ProductName.Company?.name &&
          x.ProductName.Company.name.toLowerCase().includes(selectedCompany.toLowerCase()));

      return matchName && matchCat && matchCompany;
    });

    setCurrentProducts(filtered);
  };

  const onResetFilters = () => {
    setSearchName("");
    setSelectedCat("");
    setSelectedCompany("");
    setCurrentPage(1);
    setCurrentProducts(products);
  };

  return (
    <>
      <BestProFilter
        searchName={searchName}
        setSearchName={setSearchName}
        selectedCat={selectedCat}
        setselectedCat={setSelectedCat}
       
        selectedCompany={selectedCompany}
        setselectedCompany={setSelectedCompany}
        onSearchClick={handleSearchClick}
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
            {currentProducts
  .filter((x) => x.OrderState?.status === "done")
  .sort((a, b) => b.quantity - a.quantity).map((product) => (
              <tr key={product.id}>
                <td>
                  {product.ProductName.image ? (
                    <img
                      src={product.ProductName.image}
                      alt={product.ProductName.name}
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
                <td>{product.ProductName.name}</td>
                <td>{product.ProductName.Category?.name || "--"}</td>
                <td>{product.ProductName.Company?.name || "--"}</td>
                <td>{product.quantity}</td>
                <td>{product.ProductName.endprice}</td>
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

        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
          &gt;
        </button>
        <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
          &raquo;
        </button>
      </div>
    </>
  );
};

export default MostSellingTbl;
