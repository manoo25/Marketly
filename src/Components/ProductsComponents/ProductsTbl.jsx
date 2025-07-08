import React, { useEffect, useState } from "react";
import "../../css/Table.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedProduct, fetchProducts } from "../../Redux/Slices/ProductSlice";

const rowsPerPage = 4;

const ProductsTbl = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.Products);

  const [currentPage, setCurrentPage] = useState(1);
  const [SelectedProducts, SetSelectedProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const totalPages = Math.ceil(products.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + rowsPerPage);

  const selectAll = (checked) => {
    if (checked) {
      SetSelectedProducts(currentProducts);
    } else {
      SetSelectedProducts([]);
    }
  };

  const isSelected = (id) => SelectedProducts.some((p) => p.id === id);

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

  return (
    <>
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
                  <button className="bg-transparent" onClick={handleDeleteSelected}>
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
                <td>
                  <div className="dropdown">
                    <button
                      className="btn"
                      type="button"
                      id={`dropdownMenu${product.id}`}
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
                      aria-labelledby={`dropdownMenu${product.id}`}
                    >
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => console.log("Edit", product.id)}
                        >
                          تعديل
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => console.log("Delete", product.id)}
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
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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

export default ProductsTbl;
