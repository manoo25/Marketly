import React, { useEffect, useRef, useState } from "react";
import "./UsersTbl.css";
import "./CustomMenu.css";
import ModalConfirm from "./ModalConfirm";
// const fakeUsers = Array.from({ length: 100 }, (_, i) => ({
//   id: i + 1,
//   username: `user${i + 1}`,
//   email: `user${i + 1}@example.com`,
//   role: ["أدمن", "تاجر", "مستخدم"][i % 3],
//   governorate: "القاهرة",
//   city: "القاهرة",
// }));



const rowsPerPage = 10;

const UsersTbl = ({ users, selectedGovernorate, selectedRole, searchName, searchEmail, onDeleteUser, onBlockUser }) => {


  const filteredUsers = users.filter((user) => {
    const matchGovernorate = selectedGovernorate
      ? user.location === selectedGovernorate
      : true;

    const matchRole = selectedRole
      ? user.role === selectedRole
      : true;

    const matchName = searchName ? user.name.toLowerCase().includes(searchName.toLowerCase()) : true;

    const matchEmail = searchEmail ? user.email.toLowerCase().includes(searchEmail.toLowerCase()) : true;

    return matchGovernorate && matchRole && matchName && matchEmail;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + rowsPerPage);


  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRole, selectedGovernorate]);

  // Open Menu and Close it by any Click and View Control
  const [openIndex, setOpenIndex] = useState(null);
  const popupRefs = useRef([]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      const currentPopup = popupRefs.current[openIndex];
      if (currentPopup && !currentPopup.contains(e.target)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openIndex]);
  const [menuDirection, setMenuDirection] = useState("down");
  // Open Menu and Close it by any Click and View Control
  


  const [confirmModal, setConfirmModal] = useState({
    open: false,
    message: "",
    confirmText: "تأكيد",
    confirmClass: "btn-primary",
    onConfirm: () => { },
  });
  
  // Modals for  Block And Delete Confirm  
  const handleBlockUser = (user) => {
    setOpenIndex(null);
    const isBlocked = user.isBlocked;

    setConfirmModal({
      open: true,
      message: isBlocked
        ? `هل تريد إلغاء حظر ${user.name}؟`
        : `هل تريد حظر ${user.name}؟`,
      confirmText: isBlocked ? "إلغاء الحظر" : "حظر",
      confirmClass: "btn-warning",
      onConfirm: () => {
        onBlockUser(user); // بنديله الـ user كامل عشان نعرف حالته
        setConfirmModal((prev) => ({ ...prev, open: false }));
      },
    });
  };
  

  const handleDeleteUser = (user) => {
    setOpenIndex(null);
    setConfirmModal({
      open: true,
      message: `هل تريد حذف ${user.name}؟`,
      confirmText: "حذف",
      confirmClass: "btn-danger",
      onConfirm: () => {
        onDeleteUser(user.id); // نديه الـ id بس
        setConfirmModal((prev) => ({ ...prev, open: false }));
      },
    });
  };
  
  // Modals for  Block And Delete Confirm  

  return (
    <>
      

      <div className="user-table ">
        <table border="1" width="100%" dir="rtl" className="table">
          <thead>
            <tr>
              <th>
                <div className="checkbox-header">
                  <input type="checkbox" id="select-all" />

                </div>
              </th>
              <th>

                  <label htmlFor="select-all">اسم المستخدم</label>
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
              <tr className={user.isBlocked ? "blocked-row" : "not-blocked-row"}
              key={user.id}>
                <td>
                  <label className="checkbox-wrapper">
                    <input type="checkbox" />

                    {/* <span>{}</span> */}
                  </label>
                </td>
                <td>
                  <p>{user.name}</p>
                </td>

                <td>{user.email}</td>
                <td
                  style={{
                    color:
                      user.role === "admin"
                        ? "blue"
                        : user.role === "trader"
                        ? "green"
                        : "orange",
                  }}
                >
                  {user.role}
                </td>
                <td>{user.location}</td>
                <td>{user.location}</td>
                <td style={{  }}>

                  <label style={{ position:"relative" }} class="popup" ref={(el) => (popupRefs.current[user.id] = el)}>
                    <input
                      type="checkbox"
                      checked={openIndex === user.id}
                      onChange={() => {
                        const rect = popupRefs.current[user.id]?.getBoundingClientRect();
                        const windowHeight = window.innerHeight;

                        // هل المساحة اللي تحت العنصر تكفي لعرض القائمة؟
                        const spaceBelow = windowHeight - rect.bottom;
                        const menuHeight = 150; // عدّلها حسب ارتفاع المنيو عندك

                        setMenuDirection(spaceBelow < menuHeight ? "up" : "down");
                        setOpenIndex((prev) => (prev === user.id ? null : user.id));
                      }}
                      
                    />
                    <div tabIndex="0" className="burger" style={{
                      width: "42px",
                      height: "42px",
                      border: "1px solid #EFECF3",
                      borderRadius: "12px",
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      position:"relative",
                      // zIndex:-1
                    }}>
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
                    </div>

                    <nav class="popup-window" 
                      style={{
                        position: "absolute",
                        width: "fit-content",
                        top: menuDirection === "down" ? "100%" : "auto",
                        bottom: menuDirection === "up" ? "100%" : "auto",
                        left: 0,
                        background: "#fff",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                        borderRadius: "8px",
                        zIndex: 1000,
                        marginBottom: menuDirection === "up" ? "10px" : 0,
                        marginTop: menuDirection === "down" ? "10px" : 0,
                    }}
                    >
                     
                      <ul style={{ position:"relative", zIndex:999}}>
                       
                        <li>
                          <button
                            className="custom-btn-menu"
                            onClick={() => {

                              setOpenIndex(null);
                            }}

                          >
                           <span style={{ color:"blue" }} className='fa-regular fa-user  '></span>
                            <span className='mb-2'>إرسال رسالة</span>
                            
                          </button>
                        </li>
                        <li>
                          <button
                            className="custom-btn-menu"
                            onClick={() => {

                              setOpenIndex(null);
                            }}

                          >
                           <span style={{ color:"green" }} className='fa-regular fa-user  '></span>
                            <span className='mb-2'>تعديل</span>
                            
                          </button>
                        </li>
                        <li>
                          <button
                            className="custom-btn-menu"
                            onClick={() => {
                              handleDeleteUser(user)
                              setOpenIndex(null);
                            }}
                          >
                          <span style={{ color:"red" }} className='fa-regular fa-user  '></span>
                            <span className='mb-2'>حذف</span>
                            
                          </button>
                        </li>
                        <li>
                          <button
                            className="custom-btn-menu"
                            onClick={() => {
                              handleBlockUser(user)

                              setOpenIndex(null);
                            }}
                            >
                              <span style={{ color:"orange" }} className='fa-solid fa-right-from-bracket fa-rotate-180  '></span>
                            <span className='mb-2'>{user.isBlocked ? "إلغاء الحظر" : "حظر"}</span>
                            
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </label>


                  {/* <div className="dropdown">
                    <button
                      className="btn dropdown-toggle"
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
                      className="dropdown-menu dropdown-menu-end"
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
                  </div> */}
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
