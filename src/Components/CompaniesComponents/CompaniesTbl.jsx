import React, { useEffect, useState } from "react";
import "../../css/Table.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCompany,
  fetchCompanies,
} from "../../Redux/Slices/CompaniesSlice";
import CompaniesFilter from "./CompaniesFilter";
import EditCompaniesModal from "../modalsComponents/EditCompaniesModal";
import CustomMenu from "../globalComonents/CustomMenu";
import ModalConfirm from "../UsersComponents/ModalConfirm";
import { deleteImageFromStore } from "../../Redux/uploadingImage";

const rowsPerPage = 10;

const CompaniesTbl = () => {
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.Companies);
  console.log(companies);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [currentCompanies, setCurrentCompanies] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [show, setShow] = useState(false);
  const [editCompany, setEditCompany] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    message: "",
    confirmText: "تأكيد",
    confirmClass: "btn-primary",
    onConfirm: () => {},
  });
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const sliced = companies.slice(startIndex, startIndex + rowsPerPage);
    setCurrentCompanies(sliced);
  }, [companies, currentPage]);
  const totalPages = Math.ceil(companies.length / rowsPerPage);

  // for filtering
  const handleSearchClick = () => {
    const filtered = companies.filter((x) => {
      const matchName =
        searchName === "" ||
        (x.name && x.name.toLowerCase().includes(searchName.toLowerCase()));

      const matchDate =
        (!startDate || new Date(x.created_at) >= new Date(startDate)) &&
        (!endDate || new Date(x.created_at) <= new Date(endDate));

      return matchName && matchDate;
    });

    setCurrentCompanies(filtered);
  };
  function onResetFilters() {
    setSearchName("");
    setStartDate(null);
    setEndDate(null);
    setCurrentPage(1); // اختياري، لو عايز ترجع لأول صفحة
    setCurrentCompanies(companies); // رجّع كل المنتجات الأصلية
  }

  // for confirm deleteing
  const handleDeleteCompany = (company) => {
    const isBlocked = company.isBlocked;
    setConfirmModal({
      open: true,
      message: isBlocked
        ? `هل تريد إلغاء حذف ${company.name}؟`
        : `هل تريد حذف ${company.name}؟`,
      confirmText: isBlocked ? "إلغاء الحذف" : "حذف",
      confirmClass: "btn-danger",
      onConfirm: async () => {
        try {
          // حذف الصورة من الستوريج
          if (company.image) {
            await deleteImageFromStore(company.image, "companies");
          }

          // حذف الشركة من الداتا بيز
          dispatch(deleteCompany(company.id));

          // قفل المودال
          setConfirmModal((prev) => ({ ...prev, open: false }));

          console.log("✅ Company and image deleted:", company.name);
          console.log(company.image);
        } catch (error) {
          console.error("❌ Error deleting company or image:", error.message);
        }
      },
    });
  };

  // تحديد أو إلغاء تحديد كل الشركات المعروضة
  const handleSelectAll = () => {
    if (selectedCompanies.length === currentCompanies.length) {
      setSelectedCompanies([]);
    } else {
      setSelectedCompanies(currentCompanies.map((c) => c.id));
    }
  };
  // تحديد أو إلغاء تحديد شركة واحدة
  const handleSelectCompany = (id) => {
    setSelectedCompanies((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  // حذف جماعي
  const handleDeleteSelected = () => {
    setConfirmModal({
      open: true,
      message: `هل تريد حذف ${selectedCompanies.length} شركة؟`,
      confirmText: "حذف الكل",
      confirmClass: "btn-danger",
      onConfirm: async () => {
        for (const id of selectedCompanies) {
          const company = companies.find((c) => c.id === id);
          if (company?.image) {
            await deleteImageFromStore(company.image, "companies");
          }
          dispatch(deleteCompany(id));
        }
        setSelectedCompanies([]);
        setConfirmModal((prev) => ({ ...prev, open: false }));
      },
    });
  };

  return (
    <>
      <CompaniesFilter
        searchName={searchName}
        setSearchName={setSearchName}
        onSearchClick={handleSearchClick}
        onResetFilters={onResetFilters}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
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
                      selectedCompanies.length === currentCompanies.length &&
                      currentCompanies.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </label>
              </th>
              <th>شعار / صورة</th>
              <th>اسم الشركة</th>
              <th>معرف الشركة </th>
              <th>تاريخ الإضافة</th>
              <th>
                <CustomMenu
                  id="bulk-actions"
                  options={[
                    {
                      label: `حذف المحدد (${selectedCompanies.length})`,
                      icon: "fa-solid fa-trash",
                      color: "red",
                      disabled: selectedCompanies.length === 0,
                      onClick: handleDeleteSelected,
                    },
                  ]}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {currentCompanies.map((company) => (
              <tr key={company.id}>
                <td>
                  <label className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      checked={selectedCompanies.includes(company.id)}
                      onChange={() => handleSelectCompany(company.id)}
                    />
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

                <td style={{}}>
                  <CustomMenu
                    id={company.id}
                    options={[
                      {
                        label: "تعديل",
                        icon: "fa-solid fa-paper-plane",
                        color: "green",
                        onClick: () => {
                          setShow(true);
                          setEditCompany(company);
                        },
                      },
                      {
                        label: "حذف",
                        icon: "fa-solid fa-trash",
                        color: "red",
                        onClick: () => {
                          handleDeleteCompany(company);
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
      <EditCompaniesModal show={show} setShow={setShow} company={editCompany} />
    </>
  );
};

export default CompaniesTbl;
