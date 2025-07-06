import React, { useState } from "react";

import "./UsersTbl.css";

const fakeUsers = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  username: `user${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ["أدمن", "تاجر", "مستخدم"][i % 3],
  governorate: "القاهرة",
  city: "القاهرة",
}));

const rowsPerPage = 10;

const UsersTbl = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(fakeUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentUsers = fakeUsers.slice(startIndex, startIndex + rowsPerPage);

  return (
    <>
      <div className="user-table ">
        <table border="1" width="100%" dir="rtl" className="table">
          <thead>
            <tr>
              <th>
                <div className="checkbox-header">
                  <input type="checkbox" id="select-all" />

                  <label htmlFor="select-all">اسم المستخدم</label>
                </div>
              </th>

              <th>البريد الإلكتروني</th>
              <th>الصلاحية</th>
              <th>المحافظة</th>
              <th>المدينة</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <label className="checkbox-wrapper">
                    <input type="checkbox" />

                    <span>{user.username}</span>
                  </label>
                </td>

                <td>{user.email}</td>
                <td
                  style={{
                    color:
                      user.role === "أدمن"
                        ? "blue"
                        : user.role === "تاجر"
                        ? "green"
                        : "orange",
                  }}
                >
                  {user.role}
                </td>
                <td>{user.governorate}</td>
                <td>{user.city}</td>
                <td style={{ position: "relative" }}>
                  <div className="dropdown">
                    <button
                      className="btn"
                      type="button"
                      id={`dropdownMenu${user.id}`}
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
                      aria-labelledby={`dropdownMenu${user.id}`}
                    >
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => console.log("Edit", user.id)}
                        >
                          تعديل
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => console.log("Delete", user.id)}
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

export default UsersTbl;
