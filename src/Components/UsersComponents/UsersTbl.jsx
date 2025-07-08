import React, { useEffect, useState } from "react";
import "../../css/Table.css";
import "./CustomMenu.css";
import ModalConfirm from "./ModalConfirm";
import PrimaryButton from "../globalComonents/PrimaryButton";
import { SiLastdotfm } from "react-icons/si";
import CustomMenu from "../globalComonents/CustomMenu";
// const fakeUsers = Array.from({ length: 100 }, (_, i) => ({
//   id: i + 1,
//   username: `user${i + 1}`,
//   email: `user${i + 1}@example.com`,
//   role: ["أدمن", "تاجر", "مستخدم"][i % 3],
//   governorate: "القاهرة",
//   city: "القاهرة",
// }));



const rowsPerPage = 10;

const UsersTbl = ({ users, selectedGovernorate, selectedRole, searchName, searchEmail, onBlockUser }) => {


  const filteredUsers = users.filter((user) => {
    const matchGovernorate = selectedGovernorate
      ? user.governorate === selectedGovernorate
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
  

  const [confirmModal, setConfirmModal] = useState({
    open: false,
    message: "",
    confirmText: "تأكيد",
    confirmClass: "btn-primary",
    onConfirm: () => { },
  });
  
  // Modals for  Block And Delete Confirm  
  const handleBlockUser = (user) => {
    const isBlocked = user.isBlocked;
    setConfirmModal({
      open: true,
      message: isBlocked
        ? `هل تريد إلغاء حظر ${user.name}؟`
        : `هل تريد حظر ${user.name}؟`,
      confirmText: isBlocked ? "إلغاء الحظر" : "حظر",
      confirmClass: "btn-warning",
      onConfirm: () => {
        onBlockUser(user); 
        setConfirmModal((prev) => ({ ...prev, open: false }));
      },
    });
  };
  

  // const handleDeleteUser = (user) => {
  //   setConfirmModal({
  //     open: true,
  //     message: `هل تريد حذف ${user.name}؟`,
  //     confirmText: "حذف",
  //     confirmClass: "btn-danger",
  //     onConfirm: () => {
  //       onDeleteUser(user.id); // نديه الـ id بس
  //       setConfirmModal((prev) => ({ ...prev, open: false }));
  //     },
  //   });
  // };
  
  // Modals for  Block And Delete Confirm  

  function ShowMe(){
    console.log("Hello")
  }

  return (
    <>
      

      <div className="user-table  ">
        <table className="table" border="1" width="100%" dir="rtl" >
          <thead >
            <tr>
              <th>
                <label className="checkbox-wrapper">
                  <input type="checkbox" id="select-all" />

                  {/* <span>{}</span> */}
                </label>
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
          <tbody >
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
                <td>{user.governorate}</td>
                <td>{user.city}</td>
                <td style={{  }}>

                  <CustomMenu
                  id={user.id}
                  options={[
                    { label: "إرسال رسالة", icon: "fa-solid fa-paper-plane", color: "green", onClick:()=>{ShowMe()}},
                    { label: user.isBlocked ? "إالغاء الحظر" : "حظر" , icon: "fa-solid fa-ban", color: "red",
                      onClick:()=>{handleBlockUser(user)}}
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
