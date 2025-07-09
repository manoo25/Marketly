import React, { useEffect, useRef, useState } from 'react';

function LabeledMenu({ label = "", id = "", options = [] }) {
    const [openIndex, setOpenIndex] = useState(null);
    const popupRefs = useRef([]);
    const [menuDirection, setMenuDirection] = useState("down");

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

    const handleToggle = () => {
        const rect = popupRefs.current[id]?.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const spaceBelow = windowHeight - rect.bottom;
        const menuHeight = 150;
        setMenuDirection(spaceBelow < menuHeight ? "up" : "down");
        setOpenIndex((prev) => (prev === id ? null : id));
    };

    return (
        <div
            className="popup"
            ref={(el) => (popupRefs.current[id] = el)}
            style={{ position: "relative", display: "inline-block" }}
        >
            <input
                type="checkbox"
                checked={openIndex === id}
                onChange={handleToggle}
                style={{ display: "none" }} // ✅ إخفاء الـ input
            />
            <div
                onClick={handleToggle}
                className="custom-label-menu"
                style={{
                    padding: "8px 16px",
                    backgroundColor: "#F8F9FA",
                    border: "1px solid #DDE0E5",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#333",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    userSelect: "none",
                    transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e9ecef")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F8F9FA")}
            >
                <span>{label}</span>
                <i className="fa-solid fa-chevron-down" style={{ fontSize: "12px" }}></i>
            </div>

            {openIndex === id && (
                <nav
                    className="popup-window"
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
                        marginTop: menuDirection === "down" ? "10px" : 0,
                        marginBottom: menuDirection === "up" ? "10px" : 0,
                    }}
                >
                    <ul style={{ listStyle: "none", margin: 0, padding: "8px 0" }}>
                        {options.map((option, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => {
                                        option.onClick();
                                        setOpenIndex(null);
                                    }}
                                    className="custom-btn-menu"
                                    style={{
                                        background: "none",
                                        border: "none",
                                        width: "100%",
                                        textAlign: "start",
                                        padding: "8px 16px",
                                        color: "#000",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        cursor: "pointer",
                                        transition: "background 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                >
                                    <span style={{ color: option.color }} className={`${option.icon}`}></span>
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
}

export default LabeledMenu;
