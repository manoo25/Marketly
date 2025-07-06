import React from "react";

export default function PrimarySearch({
    label = "بحث",
    icon = "+",
    className = "",
    type = "search",
    value = "",
    onChange = () => { },
}) {
    return (
        <div className={`position-relative ${className}`}>
            <input
                style={{ width:"100%" }}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="input-search pe-5"
                placeholder={label}
            />
            <span
                className="position-absolute top-50 translate-middle-y end-0 pe-3 text-muted"
                style={{ pointerEvents: "none" }}
            >
                {typeof icon === "string" ? <i className={icon}></i> : icon}
            </span>
        </div>
    );
}
