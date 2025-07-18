import React from "react"

export default function SecondaryButton({ label = "", icon = null, className = "", type = "button", onClick = () => { console.log("You Clicked on Secondary Button") }, size = "md" }) {



    const sizeClasses = {
        sm: "btn-sm",
        md: "",
        lg: "btn-lg",
    };
    const selectedSize = sizeClasses[size] || sizeClasses["md"];

    return (
        <button
            type={type}
            style={{ width:"100%" }}
            className={`btn-secondary ${className} ${selectedSize}`}
            onClick={onClick}
        >
            {icon && <span className="icon">{icon} </span>}
            {label && <span>{label}</span>}

        </button>
    )

}