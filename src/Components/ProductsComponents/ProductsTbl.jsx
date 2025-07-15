import React, { useEffect, useState } from "react";
import "../../css/Table.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  deleteSelectedProduct,
  fetchProducts,
} from "../../Redux/Slices/ProductSlice";
import ProductsFilter from "./ProductsFilter";
import CustomMenu from "../globalComonents/CustomMenu";
import ModalConfirm from "../UsersComponents/ModalConfirm";
import EditProductModal from "../modalsComponents/EditProductModal";

const rowsPerPage = 4;

const ProductsTbl = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.Products);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [EditProduct, setEditProduct] = useState({});

  const [currentProducts, setcurrentProducts] = useState([]);
  const [SelectedProducts, SetSelectedProducts] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [selectedCat, setselectedCat] = useState("");
  const [searchTrader, setSearchTrader] = useState("");
  const [selectedCompany, setselectedCompany] = useState("");
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    message: "",
    confirmText: "تأكيد",
    confirmClass: "btn-primary",
    onConfirm: () => {},
  });

  // fetch all products once
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // update current products based on pagination or full list change
  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const sliced = products.slice(startIndex, startIndex + rowsPerPage);
    setcurrentProducts(sliced);
  }, [products, currentPage]);

  const totalPages = Math.ceil(products.length / rowsPerPage);

  const selectAll = (checked) => {
    if (checked) {
      SetSelectedProducts(currentProducts);
    } else {
      SetSelectedProducts([]);
    }
  };

  const isSelected = (id) =>
    SelectedProducts.some((product) => product.id === id);

  const handleCheckboxChange = (e, product) => {
    if (e.target.checked) {
      SetSelectedProducts((prev) => [...prev, product]);
    } else {
      SetSelectedProducts((prev) => prev.filter((p) => p.id !== product.id));
    }
  };

  const handleDeleteSelected = async () => {
    await dispatch(deleteSelectedProduct(SelectedProducts));
    SetSelectedProducts([]);
    dispatch(fetchProducts());
  };

  const handleSearchClick = () => {
    const filtered = products.filter((x) => {
      const matchName =
        searchName === "" ||
        (x.name && x.name.toLowerCase().includes(searchName.toLowerCase()));

      const matchCat =
        selectedCat === "" ||
        (x.category?.name &&
          x.category.name.toLowerCase().includes(selectedCat.toLowerCase()));

      const matchTrader =
        searchTrader === "" ||
        (x.trader?.name &&
          x.trader.name.toLowerCase().includes(searchTrader.toLowerCase()));

      const matchCompany =
        selectedCompany === "" ||
        (x.company?.name &&
          x.company.name.toLowerCase().includes(selectedCompany.toLowerCase()));

      // ابحث بجميع القيم المدخلة (اللي مش فاضية)
      return matchName && matchCat && matchTrader && matchCompany;
    });

    setcurrentProducts(filtered);
  };
  function onResetFilters() {
    setSearchName("");
    setselectedCat("");
    setSearchTrader("");
    setselectedCompany("");
    setCurrentPage(1); // اختياري، لو عايز ترجع لأول صفحة
    setcurrentProducts(products); // رجّع كل المنتجات الأصلية
  }

  const handleDeletePro = (product) => {
    const isBlocked = product.isBlocked;
    setConfirmModal({
      open: true,
      message: isBlocked
        ? `هل تريد إلغاء حذف ${product.name}؟`
        : `هل تريد حذف ${product.name}؟`,
      confirmText: isBlocked ? "إلغاء الحذف" : "حذف",
      confirmClass: "btn-danger",
      onConfirm: () => {
        dispatch(deleteProduct({ id: product.id, image: product.image }));
        setConfirmModal((prev) => ({ ...prev, open: false }));
      },
    });
  };

  return (
    <>
      <ProductsFilter
        searchName={searchName}
        setSearchName={setSearchName}
        selectedCat={selectedCat}
        setselectedCat={setselectedCat}
        searchTrader={searchTrader}
        setSearchTrader={setSearchTrader}
        selectedCompany={selectedCompany}
        setselectedCompany={setselectedCompany}
        onSearchClick={handleSearchClick}
        onResetFilters={onResetFilters}
      />

      <div className="user-table">
        <table border="1" width="100%" dir="rtl" className="table">
          <thead>
            <tr>
              <th>
                <label className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={
                      currentProducts.length > 0 &&
                      currentProducts.every((p) =>
                        SelectedProducts.some((sp) => sp.id === p.id)
                      )
                    }
                    onChange={(e) => selectAll(e.target.checked)}
                  />
                </label>
              </th>
              <th>صورة</th>
              <th>اسم المنتج</th>
              <th>الصنف</th>
              <th>سعر التاجر</th>
              <th>سعر العميل</th>
              <th>الشركة</th>
              <th>التاجر</th>
              <th>الوحدة</th>
              <th>الكمية فى الوحدة</th>
              <th>الكمية</th>
              <th>
                {SelectedProducts.length > 0 && (
                  <button
                    className="bg-transparent"
                    onClick={handleDeleteSelected}
                  >
                    <i className="fa-solid fa-trash ms-2"></i>
                  </button>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <label className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      checked={isSelected(product.id)}
                      onChange={(e) => handleCheckboxChange(e, product)}
                    />
                  </label>
                </td>
                <td>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
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
                <td>{product.name}</td>
                <td>{product.category?.name || "--"}</td>
                <td>{product.traderprice}</td>
                <td>{product.endprice}</td>
                <td>{product.company?.name || "--"}</td>
                <td>{product.trader?.name || "--"}</td>
                <td>{product.unit || "--"}</td>
                <td>{product.quantity_per_unit || "--"}</td>
                <td>{product.quantity}</td>
                <td style={{}}>
                  <CustomMenu
                    id={product.id}
                    options={[
                      {
                        label: "تعديل",
                        icon: "fa-solid fa-paper-plane",
                        color: "green",
                        onClick: () => {
                          setShow(true);
                          setEditProduct(product);
                        },
                      },
                      {
                        label: "حذف",
                        icon: "fa-solid fa-trash",
                        color: "red",
                        onClick: () => {
                          handleDeletePro(product);
                        },
                      },
                    ]}
                  />
                </td>
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
      <EditProductModal show={show} setShow={setShow} product={EditProduct} />
    </>
  );
};

export default ProductsTbl;
