import React from "react";

const TableSwitcherDropdown = ({ value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="units">الوحدات</option>
      <option value="categories">الأصناف</option>
    </select>
  );
};

export default React.memo(TableSwitcherDropdown);