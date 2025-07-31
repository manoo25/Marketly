// ✅ مكون ChatModal (لا تنس تضمينه في الأعلى)
import React, { useEffect, useState } from "react";
import "../../css/Table.css";
import "./CustomMenu.css";
import "./RoleMenuStyle.css";
import ModalConfirm from "./ModalConfirm";
import PrimaryButton from "../globalComonents/PrimaryButton";
import { SiLastdotfm } from "react-icons/si";
import CustomMenu from "../globalComonents/CustomMenu";
import Dropdown from 'react-bootstrap/Dropdown';
import LabeledMenuButton from "../globalComonents/LabeledMenu";
import LabeledMenu from "../globalComonents/LabeledMenu";
import UpdateRolesModal from "../modalsComponents/UpdateRolesModal";
import RowsPerPageSelector from "../globalComonents/RowsPerPageSelector";
// import ChatModal from "../UsersComponents/ChatModal";
// import { generateConversationId } from "../../utils/generateConversationId";
// import { getCurrentUserId } from "../../utils/getCurrentUserId";

// const rowsPerPage = 8;

const UsersTbl = ({ users, selectedGovernorate, selectedRole, searchName, searchEmail, onBlockUser, onUpdateUserRole, onUpdateSelectedUseresRole, onBlockSelectedUsers, onUnblockSelectedUsers }) => {

  const [rowsPerPage, setRowsPerPage] = useState(8);
  const filteredUsers = users.filter((user) => {
    const matchGovernorate = selectedGovernorate ? user.governorate === selectedGovernorate : true;
    const matchRole = selectedRole ? user.role === selectedRole : true;
    const matchName = searchName ? user.name.toLowerCase().includes(searchName.toLowerCase()) : true;
    const matchEmail = searchEmail ? user.email.toLowerCase().includes(searchEmail.toLowerCase()) : true;
    return matchGovernorate && matchRole && matchName && matchEmail;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + rowsPerPage);
  useEffect(() => setCurrentPage(1), [selectedRole, selectedGovernorate, rowsPerPage]);

  const [confirmModal, setConfirmModal] = useState({ open: false, message: "", confirmText: "تأكيد", confirmClass: "btn-primary", onConfirm: () => { } });
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [bulkRoleModalOpen, setBulkRoleModalOpen] = useState(false);
  // const [chatModalOpen, setChatModalOpen] = useState(false);
  // const [conversationId, setConversationId] = useState(null);
  // const [targetUser, setTargetUser] = useState(null);


  // const [currentAdminId, setCurrentAdminId] = useState(null);
  // useEffect(() => { getCurrentUserId().then(setCurrentAdminId); }, []);

  // const openChatModal = (user) => {
  //   const convId = generateConversationId(currentAdminId, user.id);
  //   setConversationId(convId);
  //   setTargetUser(user);
  //   setChatModalOpen(true);
  // };

  // const openMessageModal = (userIds) => {
  //   if (!userIds || userIds.length === 0) {
  //     alert("من فضلك اختر مستخدمين لإرسال الرسالة");
  //     return;
  //   }
  //   if (userIds.length === 1) {
  //     const target = users.find((u) => u.id === userIds[0]);
  //     openChatModal(target);
  //   } else {
  //     setMessageTargetIds(userIds);
  //     setShowMessageModal(true);
  //   }
  // };
  
  // Modals for  Block And Delete Confirm  
  // const handleBlockUser = (user) => {
  //   console.log("🚨 USER:", user);

  //   const isBlocked = user.isBlocked;
  //   setConfirmModal({
  //     open: true,
  //     message: isBlocked
  //       ? `هل تريد إلغاء حظر ${user.name}؟`
  //       : `هل تريد حظر ${user.name}؟`,
  //     confirmText: isBlocked ? "إلغاء الحظر" : "حظر",
  //     confirmClass: "btn-warning",
  //     onConfirm: () => {
  //       onBlockUser(user); 
  //       setConfirmModal((prev) => ({ ...prev, open: false }));
  //     },
  //   });
  // };
  const handleBlockUser = (user) => {
    const selectedUser = user;

    setConfirmModal({
      open: true,
      message: selectedUser.isBlocked
        ? `هل تريد إلغاء حظر ${selectedUser.name}؟`
        : `هل تريد حظر ${selectedUser.name}؟`,
      confirmText: selectedUser.isBlocked ? "إلغاء الحظر" : "حظر",
      confirmClass: "btn-warning",
      onConfirm: () => {
        if (!selectedUser || !selectedUser.id) return;
        onBlockUser(selectedUser);
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

  // DropMenu for Roles
  const roles = ["admin", "trader", "user"];

  const getRoleLabel = (role) => {
    switch (role) {
      case "admin": return "أدمن";
      case "trader": return "تاجر";
      case "user": return "مستخدم";
      case "delegate": return "مندوب";
      default: return role;
    }
  };
  
  const getRoleBgColor = (role) => {
    switch (role) {
      case "admin": return "#D6E4FF"; 
      case "trader": return "#D3F9D8"; 
      case "user": return "#FFF3CD";
      default: return "#f0f0f0";
    }
  };
  
  const handleRoleChangeConfirm = (user, newRole) => {
    setConfirmModal({
      open: true,
      message: `هل أنت متأكد أنك تريد تحويل صلاحية ${user.name} إلى "${getRoleLabel(newRole)}"؟`,
      confirmText: "تأكيد",
      confirmClass: "btn-warning",
      onConfirm: () => {
        onUpdateUserRole(user.id, newRole); 
        setConfirmModal((prev) => ({ ...prev, open: false }));
      },
    });
  };
  
  // DropMenu for Roles


  // Checkbox for select users and select all page 
  // const [selectedUserIds, setSelectedUserIds] = useState([]);



    // start select all Users 
  const handleSelectAllCurrentUsers = (e) => {
    const currentIds = currentUsers.map((u) => u.id);
    if (e.target.checked) {
      setSelectedUserIds((prev) => [...new Set([...prev, ...currentIds])]);
    } else {
      setSelectedUserIds((prev) => prev.filter((id) => !currentIds.includes(id)));
    }
  };
    
    // end select all Users 
  // Checkbox for select users and select all page 

  // Update Role for selected Users
  // const [bulkRoleModalOpen, setBulkRoleModalOpen] = useState(false);  
  // Update Role for selected Users

  // Block Selected Users Confirm
  const handleBulkBlockConfirm = () => {
    if (selectedUserIds.length === 0) {
      alert("من فضلك اختر مستخدمين أولاً");
      return;
    }

    setConfirmModal({
      open: true,
      message: `هل أنت متأكد أنك تريد حظر ${selectedUserIds.length} مستخدم؟`,
      confirmText: "تأكيد الحظر",
      confirmClass: "btn-danger",
      onConfirm: () => {
        onBlockSelectedUsers(selectedUserIds);
        setConfirmModal((prev) => ({ ...prev, open: false }));
      },
    });
  };
  
  // Block Selected Users Confirm

  // UnBlock Selected Users Confirm
  const handleBulkUnblockConfirm = () => {
    if (selectedUserIds.length === 0) {
      alert("من فضلك اختر مستخدمين أولاً");
      return;
    }

    setConfirmModal({
      open: true,
      message: `هل تريد فك الحظر عن ${selectedUserIds.length} مستخدم؟`,
      confirmText: "تأكيد فك الحظر",
      confirmClass: "btn-success",
      onConfirm: () => {
        onUnblockSelectedUsers(selectedUserIds);
        setConfirmModal((prev) => ({ ...prev, open: false }));
      },
    });
  };
  
  // UnBlock Selected Users Confirm


  // Send Msg to User or Users
  // const [showMessageModal, setShowMessageModal] = useState(false);
  // const [messageText, setMessageText] = useState("");
  // const [messageTargetIds, setMessageTargetIds] = useState([]);

  // Send Msg to User or Users

  // const openMessageModal = (userIds) => {
  //   if (!userIds || userIds.length === 0) {
  //     alert("من فضلك اختر مستخدمين لإرسال الرسالة");
  //     return;
  //   }
  //   setMessageTargetIds(userIds);
  //   setShowMessageModal(true);
  // };
  

  return (
    <>
      

      <div className="user-table  ">
        <table className="table" border="1" width="100%" dir="rtl" >
          <thead >
            <tr>
              <th>
                <label className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={
                      currentUsers.length > 0 &&
                      currentUsers.every((user) => selectedUserIds.includes(user.id))
                    }
                    onChange={handleSelectAllCurrentUsers}
                  />

                </label>
              </th>
              <th>

                  <label htmlFor="select-all">اسم المستخدم</label>
              </th>

              <th>البريد الإلكتروني</th>
              <th>الصلاحية</th>
              <th>المحافظة</th>
              <th>المدينة</th>
              <th style={{ position:"relative", zIndex:1 }}>
                <CustomMenu
                  options={[
                    {
                      label: "تعديل الصلاحية", icon: "fa-solid fa-user-pen", color: "blue", onClick: () => {
                        if (selectedUserIds.length === 0) {
                          alert("من فضلك اختر مستخدمين أولاً");
                          return;
                        }
                        setBulkRoleModalOpen(true);
                      }
                    },
                    { label: "حظر المحدد", icon: "fa-solid fa-ban", color: "red", onClick: handleBulkBlockConfirm, },
                    { label: "إلغاء الحظر", icon: "fa-solid fa-unlock", color: "orange", onClick: handleBulkUnblockConfirm },
                  ]}
                />
                {/* <LabeledMenu
                  id="bulkActions"
                  label="إجراءات جماعية"
                  options={[
                    // {
                    //   label: "إرسال رسالة", icon: "fa-solid fa-paper-plane", color: "green", onClick: () => openMessageModal(selectedUserIds)
                    // },
                    {
                      label: "تعديل الصلاحية", icon: "fa-solid fa-user-pen", color: "blue", onClick: () => {
                        if (selectedUserIds.length === 0) {
                          alert("من فضلك اختر مستخدمين أولاً");
                          return;
                        }
                        setBulkRoleModalOpen(true);
                    }},
                    { label: "حظر المحدد", icon: "fa-solid fa-ban", color: "red", onClick: handleBulkBlockConfirm, },
                    { label: "إلغاء الحظر", icon: "fa-solid fa-unlock", color: "orange", onClick: handleBulkUnblockConfirm },
                  ]}
                /> */}


              </th>

            </tr>
          </thead>
          <tbody >
            {currentUsers.map((user) => (
              <tr className={user.isBlocked ? "blocked-row" : "not-blocked-row"}
              key={user.id}>
                <td>
                  <label className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      checked={selectedUserIds.includes(user.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUserIds((prev) => [...prev, user.id]);
                        } else {
                          setSelectedUserIds((prev) => prev.filter((id) => id !== user.id));
                        }
                      }}
                    />

                  </label>
                </td>
                <td>
                  <p>{user.name}</p>
                </td>

                <td>{user.email}</td>
                <td>
                  <div style={{ position: "relative", width: "85%", margin:"auto" }}>
                    <Dropdown
                      drop="down"
                      autoClose="outside"
                    >
                      <Dropdown.Toggle
                        variant="light"
                        className="w-100 d-flex justify-content-between align-items-center"
                        style={{
                          backgroundColor: getRoleBgColor(user.role),
                          color: "#000",
                          borderRadius: "6px",
                          fontWeight: "bold",
                        }}
                      >
                        {getRoleLabel(user.role)}
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="custom-drop"
                        align="end"
                        style={{
                          width: "100%",
                          minWidth: "unset", 
                          textAlign:"right"
                        }}
                      >
                        {roles
                          .filter((role) => role !== user.role)
                          .map((role) => (
                            <Dropdown.Item
                              key={role}
                              className={`role-item role-${role}`}
                              onClick={() => handleRoleChangeConfirm(user, role)}
                            >
                              {getRoleLabel(role)}
                            </Dropdown.Item>
                          ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </td>

                <td>{user.governorate}</td>
                <td>{user.city}</td>
                <td style={{  }}>

                  <CustomMenu
                  id={user.id}
                  options={[
                    // {
                    //   label: "إرسال رسالة", icon: "fa-solid fa-paper-plane", color: "green", onClick: () => openMessageModal([user.id])
                    // },
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

      <UpdateRolesModal
        show={bulkRoleModalOpen}
        selectedCount={selectedUserIds.length}
        onClose={() => setBulkRoleModalOpen(false)}
        onConfirm={(selectedRole) => {
          setConfirmModal({
            open: true,
            message: `هل تريد تأكيد تغيير صلاحية ${selectedUserIds.length} مستخدم إلى "${getRoleLabel(selectedRole)}"؟`,
            confirmText: "تأكيد",
            confirmClass: "btn-success",
            onConfirm: () => {
              console.log("Selected IDs:", selectedUserIds);
              console.log("Selected Role:", selectedRole);

              onUpdateSelectedUseresRole(selectedUserIds, selectedRole);
              setBulkRoleModalOpen(false);
              setConfirmModal((prev) => ({ ...prev, open: false }));
            },
          });
        }}
      />


      <ModalConfirm
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal((prev) => ({ ...prev, open: false }))}
        onConfirm={confirmModal.onConfirm}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        confirmClass={confirmModal.confirmClass}
      />
      
      {/* {chatModalOpen && (
        <ChatModal
          receiver={targetUser}
          conversationId={conversationId}
          onClose={() => setChatModalOpen(false)}
          currentUserId={currentAdminId}
        />
      )} */}


      {/* Send msg Modal */}
      {/* {showMessageModal && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content text-end">
              <div className="modal-header">
                <h5 className="modal-title w-100 text-center fw-bold">
                  إرسال رسالة إلى {messageTargetIds.length > 1 ? "المستخدمين المحددين" : "المستخدم"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowMessageModal(false);
                    setMessageText("");
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <label className="form-label fw-bold">محتوى الرسالة:</label>
                <textarea
                  className="form-control text-end"
                  rows="4"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>
              <div className="modal-footer justify-content-end">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowMessageModal(false);
                    setMessageText("");
                  }}
                >
                  إلغاء
                </button>
                <button
                  className="btn btn-primary"
                  disabled={!messageText.trim()}
                  onClick={() => {
                    onSendMessage(messageTargetIds, messageText);
                    setShowMessageModal(false);
                    setMessageText("");
                  }}
                >
                  إرسال
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}


      {/* Send msg Modal */}

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
          {filteredUsers.length === 0 ? (
            "لا يوجد مستخدمين للعرض"
          ) : (
            <>عرض {startIndex + 1} - {Math.min(startIndex + rowsPerPage, filteredUsers.length)} من أصل {filteredUsers.length} مستخدم</>
          )}
        </p>
      </div>


    </>
  );
};

export default UsersTbl;
