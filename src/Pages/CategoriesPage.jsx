import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetCategories } from "../Redux/Slices/Categories";
import { GetUnits } from "../Redux/Slices/units";

import PrimarySelector from "../Components/globalComonents/PrimarySelector";
import TableComponent from "../Components/CategoriesComponents/TableComponent";
import CategoriesFilter from "../Components/CategoriesComponents/CategoriesFilter";
import CustomMenu from "../Components/globalComonents/CustomMenu";
import ModalConfirm from "../Components/UsersComponents/ModalConfirm";
import { DeleteUnit } from "../Redux/Slices/units";
import { DeleteCategory } from "../Redux/Slices/Categories";
import CategoriesPageHeader from "../Components/CategoriesComponents/CategoriesPageHeader";

function Categories() {
  const dispatch = useDispatch();
  const [flag, setFlag] = useState("categories");
  const { categories } = useSelector((state) => state.Categories);
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
    dispatch(GetCategories());
    dispatch(GetUnits());
  }, [dispatch]);

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
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((c) => c.id));
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

  // Table columns
  const columns = [
    {
      header: (
        <label className="checkbox-wrapper">
          <input
            type="checkbox"
            checked={
              selectedRows.length === filteredData.length &&
              filteredData.length > 0
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
      <CategoriesPageHeader
        title={flag === "categories" ? "الأصناف" : "الوحدات"}
        flag={flag}
        onAdd={handleAdd}
      />
      <div className="p-2" style={{ maxWidth: 220 }}>
        <PrimarySelector
          value={flag}
          onChange={setFlag}
          options={[
            { value: "categories", label: "الأصناف" },
            { value: "units", label: "الوحدات" },
          ]}
          label="اختر الجدول"
        />
      </div>
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
      <TableComponent data={filteredData} columns={columns} />
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
}

export default Categories;
