import React from "react"

export default function DangerButton({ label = "", icon = null, className = "", type = "button", onClick = () => { console.log("You Clicked on Danger Button") }, size = "md" }) {



    const sizeClasses = {
        sm: "btn-sm",
        md: "",
        lg: "btn-lg",
    };
    const selectedSize = sizeClasses[size] || sizeClasses["md"];

    return (
        <button
            type={type}
            className={`btn-danger ${className} ${selectedSize}`}
            onClick={onClick}
        >
            {icon && <span className="icon">{icon} </span>}
            {label && <span>{label}</span>}

        </button>
    )

}