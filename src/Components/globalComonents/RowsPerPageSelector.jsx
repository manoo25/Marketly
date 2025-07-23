// src/Components/globalComonents/RowsPerPageSelector.jsx
import React from "react";

const RowsPerPageSelector = ({ value, onChange, options = [8, 15, 20, 30] }) => {
    return (
        <div className="d-flex align-items-center gap-2 mt-3">
            <label className="small text-muted">عدد العناصر لكل صفحة:</label>
            <select
                className="form-select form-select-sm w-auto"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
            >
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default RowsPerPageSelector;
