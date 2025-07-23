import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetCategories } from "../Redux/Slices/Categories";
import { GetUnits } from "../Redux/Slices/units";
import Loading from "../Components/globalComonents/loading";
import PrimarySelector from "../Components/globalComonents/PrimarySelector";
import TableComponent from "../Components/CategoriesComponents/TableComponent";
import CategoriesFilter from "../Components/CategoriesComponents/CategoriesFilter";
import CustomMenu from "../Components/globalComonents/CustomMenu";
import ModalConfirm from "../Components/UsersComponents/ModalConfirm";
import { DeleteUnit } from "../Redux/Slices/units";
import { DeleteCategory } from "../Redux/Slices/Categories";
import CategoriesPageHeader from "../Components/CategoriesComponents/CategoriesPageHeader";
import { UserRole } from "../Redux/Slices/token";
import RowsPerPageSelector from "../Components/globalComonents/RowsPerPageSelector";
// const rowsPerPage = 8;


function Categories() {
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const dispatch = useDispatch();
  const [flag, setFlag] = useState("categories");
  const { categories,loading } = useSelector((state) => state.Categories);
  const { Units } = useSelector((state) => state.Units);

  // Search & selection state
  const [searchName, setSearchName] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    message: "",
    confirmText: "تأكيد",
    confirmClass: "btn-primary",
    onConfirm: () => {},
  });

  useEffect(() => {
   if(!categories||categories.length===0){
     dispatch(GetCategories());
    dispatch(GetUnits());
   }
  }, [dispatch,UserRole]);

  // Filtered data
  const data = flag === "categories" ? categories : Units;
  const [filteredData, setFilteredData] = useState(data);

  // Apply filter only when pressing search
  useEffect(() => {
    setFilteredData(data);
    setSelectedRows([]);
  }, [data, flag]);

  const handleSearchClick = () => {
    if (!searchName) {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter(
          (x) =>
            x.name && x.name.toLowerCase().includes(searchName.toLowerCase())
        )
      );
    }
    setSelectedRows([]);
  };

  // Selectors
  const handleSelectAll = () => {
    const currentVisibleIds = currentPageData.map((row) => row.id);

    const areAllSelected = currentVisibleIds.every((id) => selectedRows.includes(id));

    if (areAllSelected) {
      // شيّل بس الظاهرين من المختارين
      setSelectedRows(selectedRows.filter((id) => !currentVisibleIds.includes(id)));
    } else {
      // ضيف الظاهرين فقط من غير تكرار
      const newSelected = [...new Set([...selectedRows, ...currentVisibleIds])];
      setSelectedRows(newSelected);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Delete
  const handleDeleteRow = (row) => {
    setConfirmModal({
      open: true,
      message: `هل تريد حذف ${row.name}؟`,
      confirmText: "حذف",
      confirmClass: "btn-danger",
      onConfirm: async () => {
        if (flag === "categories") {
          await dispatch(DeleteCategory(row.id));
        } else {
          await dispatch(DeleteUnit(row.id));
        }
        setConfirmModal((prev) => ({ ...prev, open: false }));
        setSelectedRows((prev) => prev.filter((x) => x !== row.id));
        handleAdd();
      },
    });
  };
  const handleDeleteSelected = () => {
    setConfirmModal({
      open: true,
      message: `هل تريد حذف ${selectedRows.length} عنصر؟`,
      confirmText: "حذف الكل",
      confirmClass: "btn-danger",
      onConfirm: async () => {
        for (const id of selectedRows) {
          if (flag === "categories") {
            await dispatch(DeleteCategory(id));
          } else {
            await dispatch(DeleteUnit(id));
          }
        }
        setSelectedRows([]);
        setConfirmModal((prev) => ({ ...prev, open: false }));
        handleAdd();
      },
    });
  };

  // دالة لإعادة جلب الداتا بعد الإضافة
  const handleAdd = () => {
    if (flag === "categories") dispatch(GetCategories());
    else dispatch(GetUnits());
  };


  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentPageData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData, flag,rowsPerPage]);

  // Pagination

  // Table columns
  const columns = [
    {
      header: (
        <label className="checkbox-wrapper">
          <input
            type="checkbox"
            checked={
              currentPageData.length > 0 &&
              currentPageData.every((row) => selectedRows.includes(row.id))
            }

            onChange={handleSelectAll}
          />
        </label>
      ),
      accessor: "selector",
      render: (_, row) => (
        <label className="checkbox-wrapper">
          <input
            type="checkbox"
            checked={selectedRows.includes(row.id)}
            onChange={() => handleSelectRow(row.id)}
          />
        </label>
      ),
    },
    ...(flag === "categories"
      ? [
          {
            header: "صورة",
            accessor: "img",
            render: (val) => (
              <img
                src={val}
                alt="img"
                style={{ width: "50px", borderRadius: "5px" }}
              />
            ),
          },
        ]
      : []),
    { header: "الاسم", accessor: "name" },
    { header: "المعرف", accessor: "id" },
    {
      header: (
        <CustomMenu
          id="bulk-actions"
          options={[
            {
              label: `حذف المحدد (${selectedRows.length})`,
              icon: "fa-solid fa-trash",
              color: "red",
              disabled: selectedRows.length === 0,
              onClick: handleDeleteSelected,
            },
          ]}
        />
      ),
      accessor: "actions",
      render: (_, row) => (
        <CustomMenu
          id={row.id}
          options={[
            {
              label: "حذف",
              icon: "fa-solid fa-trash",
              color: "red",
              onClick: () => handleDeleteRow(row),
            },
          ]}
        />
      ),
    },
  ];



  return (
    <>
     {loading?<Loading/>:
      <div>
         <CategoriesPageHeader
        title={flag === "categories" ? "الأصناف" : "الوحدات"}
        flag={flag}
        onAdd={handleAdd}
      />
     <div className="d-flex justify-content-between gap-4 align-items-center">
       <div className="mt-2 px-2" style={{ Width:500 }}>
        <PrimarySelector
        className="w-100 px-3"
          value={flag}
          onChange={setFlag}
          options={[
            { value: "categories", label: "الأصناف" },
            { value: "units", label: "الوحدات" },
          ]}
          label="اختر الجدول"
        />
      </div>
     {flag === "categories"&&
      <div >
       <CategoriesFilter
        searchName={searchName}
        setSearchName={setSearchName}
        onSearchClick={handleSearchClick}
        onResetFilters={() => {
          setSearchName("");
          setFilteredData(data);
          setSelectedRows([]);
        }}
      />
     </div>
     }
     </div>
          <TableComponent data={currentPageData} columns={columns} />

      {/* Pagination */}
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
            {filteredData.length === 0 ? (
              flag === "categories" ? "لا يوجد أصناف للعرض" : "لا يوجد وحدات للعرض"
            ) : (
              <>
                عرض {startIndex + 1} - {Math.min(startIndex + rowsPerPage, filteredData.length)} من أصل {filteredData.length}{" "}
                {flag === "categories" ? "صنف" : "وحدة"}
              </>
            )}
              
            </p>
          </div>




      {/* Pagination */}
      <ModalConfirm
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal((prev) => ({ ...prev, open: false }))}
        onConfirm={confirmModal.onConfirm}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        confirmClass={confirmModal.confirmClass}
      />
      </div>
     }
    </>
  );
}

export default Categories;
