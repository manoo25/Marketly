import React, { useEffect, useState } from "react";
import "../../css/Table.css";
import { useDispatch, useSelector } from "react-redux";

import CustomMenu from "../globalComonents/CustomMenu";
import ModalConfirm from "../UsersComponents/ModalConfirm";

import Loading from "../globalComonents/loading";
import { UserRole } from "../../Redux/Slices/token";
import { deleteComplaint, fetchcomplaints } from "../../Redux/Slices/Complaints";
import ComplaintsFilter from "./ComplaintsFilter";

const rowsPerPage = 10;

const ComplaintsTable = () => {
  const dispatch = useDispatch();
  const { complaints, loading } = useSelector((state) => state.Complaints);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [currentComplaints, setCurrentComplaints] = useState([]);
  const [filterDate, setFilterDate] = useState(null);


  const [confirmModal, setConfirmModal] = useState({
    open: false,
    message: "",
    confirmText: "تأكيد",
    confirmClass: "btn-primary",
    onConfirm: () => {},
  });
  const [selectedComplaints, setSelectedComplaints] = useState([]);

  useEffect(() => {
    if (!complaints || complaints.length === 0) {
      dispatch(fetchcomplaints());
    }
  }, [dispatch, UserRole]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const sliced = complaints.slice(startIndex, startIndex + rowsPerPage);
    setCurrentComplaints(sliced);
  }, [complaints, currentPage]);
  
  const totalPages = Math.ceil(complaints.length / rowsPerPage);

  // for filtering
  const handleSearchClick = () => {
    const filtered = complaints.filter((x) => {
      const matchName =
        searchName === "" ||
        (x.user?.name && x.user.name.toLowerCase().includes(searchName.toLowerCase()));

      

      const matchDate =
        (!filterDate || new Date(x.created_at) >= new Date(filterDate));

      const matchGovernorate =
        selectedGovernorate === "" ||
        (x.user?.selectedGovernorate && x.user.selectedGovernorate.toLowerCase() === selectedGovernorate.toLowerCase());

      return matchName && matchDate && matchGovernorate;
    });

    setCurrentComplaints(filtered);
  };

  function PendingComplaints() {
  const matchPending =complaints.filter((x) => {
        (x.user?.state && x.user.state!=='done')})
    setCurrentComplaints(matchPending);
  }
  function onResetFilters() {
    setSearchName("");
    setFilterDate(null);
    setSelectedGovernorate("");
  
    setCurrentPage(1);
    setCurrentComplaints(complaints);
  }

  // for confirm deleting
  const handleDeleteComplaint = (complaint) => {
    setConfirmModal({
      open: true,
      message: `هل تريد حذف شكوى المستخدم ${complaint.user?.name}؟`,
      confirmText: "حذف",
      confirmClass: "btn-danger",
      onConfirm: async () => {
        try {
          dispatch(deleteComplaint(complaint.id));
          setConfirmModal((prev) => ({ ...prev, open: false }));
          console.log("✅ Complaint deleted:", complaint.id);
        } catch (error) {
          console.error("❌ Error deleting complaint:", error.message);
        }
      },
    });
  };

  // تحديد أو إلغاء تحديد كل الشكاوى المعروضة
  const handleSelectAll = () => {
    if (selectedComplaints.length === currentComplaints.length) {
      setSelectedComplaints([]);
    } else {
      setSelectedComplaints(currentComplaints.map((c) => c.id));
    }
  };

  // تحديد أو إلغاء تحديد شكوى واحدة
  const handleSelectComplaint = (id) => {
    setSelectedComplaints((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // حذف جماعي
  const handleDeleteSelected = () => {
    setConfirmModal({
      open: true,
      message: `هل تريد حذف ${selectedComplaints.length} شكوى؟`,
      confirmText: "حذف الكل",
      confirmClass: "btn-danger",
      onConfirm: async () => {
        for (const id of selectedComplaints) {
          dispatch(deleteComplaint(id));
        }
        setSelectedComplaints([]);
        setConfirmModal((prev) => ({ ...prev, open: false }));
      },
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <ComplaintsFilter
            searchName={searchName}
            setSearchName={setSearchName}
            onSearchClick={handleSearchClick}
            PendingComplaints={PendingComplaints}
            onResetFilters={onResetFilters}
            filterDate={filterDate}
            setFilterDate={setFilterDate}
            selectedGovernorate={selectedGovernorate}
            setSelectedGovernorate={setSelectedGovernorate}
          />
          <div className="user-table z-0">
            <table border="1" width="100%" dir="rtl" className="table">
              <thead>
                <tr>
                  <th>
                    <label className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        checked={
                          selectedComplaints.length === currentComplaints.length &&
                          currentComplaints.length > 0
                        }
                        onChange={handleSelectAll}
                      />
                    </label>
                  </th>
                  <th>صورة المستخدم</th>
                  <th>اسم المستخدم</th>
                  <th>الهاتف </th>
                  <th>وصف الشكوى</th>
                  <th>المحافظة</th>
                  <th>تاريخ الشكوى</th>
                  <th>حالة الشكوى</th>
                  <th>
                    <CustomMenu
                      id="bulk-actions"
                      options={[
                        {
                          label: `حذف المحدد (${selectedComplaints.length})`,
                          icon: "fa-solid fa-trash",
                          color: "red",
                          disabled: selectedComplaints.length === 0,
                          onClick: handleDeleteSelected,
                        },
                      ]}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentComplaints.map((complaint) => {
                  const createdDate = complaint.created_at ? new Date(complaint.created_at) : null;
                  return (
                    <tr key={complaint.id}>
                      <td>
                        <label className="checkbox-wrapper">
                          <input
                            type="checkbox"
                            checked={selectedComplaints.includes(complaint.id)}
                            onChange={() => handleSelectComplaint(complaint.id)}
                          />
                        </label>
                      </td>
                      <td>
                        {complaint.user?.image ? (
                          <img
                            src={complaint.user.image}
                            alt={complaint.user.name}
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
                      <td>{complaint.user?.name || "--"}</td>
                      <td>{complaint.user?.phone || "--"}</td>
                      <td>{complaint.description || "--"}</td>
                      <td>{complaint.user?.governorate || "--"}</td>
                      <td>
                        {createdDate ? createdDate.toLocaleDateString("ar-EG") : "--"}
                      </td>
                      <td>
                        <p
                          className={
                            complaint.state === 'done'
                              ? "tdcontentstate tdcontentstateSuc"
                              : "tdcontentstate tdcontentstatePending"
                          }
                        >
                          {complaint.state === 'done' ? 'تم التواصل' : "معلق"}
                        </p>
                      </td>
                      <td>
                        <CustomMenu
                          id={complaint.id}
                          options={[
                            {
                              label: "حذف",
                              icon: "fa-solid fa-trash",
                              color: "red",
                              onClick: () => {
                                handleDeleteComplaint(complaint);
                              },
                            },
                          ]}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

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
        </div>
      )}

      <ModalConfirm
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal((prev) => ({ ...prev, open: false }))}
        onConfirm={confirmModal.onConfirm}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        confirmClass={confirmModal.confirmClass}
      />
    </>
  );
};

export default ComplaintsTable;