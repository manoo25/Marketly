import React from "react"

export default function GlobalButton({ label = "", icon = null, className = "", type = "button", onClick = () => { }, size = "md" }) {



    const sizeClasses = {
        sm: "text-sm px-2 py-1",
        md: "text-base px-4 py-2",
        lg: "text-lg px-6 py-3",
    };
    const selectedSize = sizeClasses[size] || sizeClasses["md"];



    return (
        <button
        type={type}
            className={`${className} ${selectedSize}`}
        onClick={onClick}
        >
            {icon && <span className="icon">{icon}</span>}
            {label && <span>{label}</span>}
            
        </button>
    )

}