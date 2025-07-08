import React, { useEffect, useState } from "react";
import "../../css/Table.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../Redux/Slices/CompaniesSlice";

const rowsPerPage = 10;

const CompaniesTbl = () => {
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.Companies);
  console.log(companies);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const totalPages = Math.ceil(companies.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentCompanies = companies.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  return (
    <>
      <div className="user-table">
        <table border="1" width="100%" dir="rtl" className="table">
          <thead>
            <tr>
              <th>
                <label className="checkbox-wrapper">
                  <input type="checkbox" />
                </label>
              </th>
              <th>شعار / صورة</th>
              <th>اسم الشركة</th>
              <th>معرف الشركة </th>
              <th>تاريخ الإضافة</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {currentCompanies.map((company) => (
              <tr key={company.id}>
                <td>
                  <label className="checkbox-wrapper">
                    <input type="checkbox" />
                  </label>
                </td>
                <td>
                  {company.image ? (
                    <img
                      src={company.image}
                      alt={company.name}
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
                <td>{company.name}</td>
                <td>{company.id}</td>
                <td>
                  {new Date(company.created_at).toLocaleDateString("ar-EG")}
                </td>
                <td>
                  <div className="dropdown">
                    <button
                      className="btn"
                      type="button"
                      id={`dropdownMenu${company.id}`}
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
                      aria-labelledby={`dropdownMenu${company.id}`}
                    >
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => console.log("Edit", company.id)}
                        >
                          تعديل
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => console.log("Delete", company.id)}
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
            key={`page-${index}`}
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

export default CompaniesTbl;
