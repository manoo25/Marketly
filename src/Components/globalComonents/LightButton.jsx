import React from "react"

export default function LightButton({ label = "", icon = null, className = "", type = "button", onClick = () => {console.log("You Clicked on Primary Button")}, size = "md" }) {



    const sizeClasses = {
        sm: "btn-sm",
        md: "",
        lg: "btn-lg",
    };
    const selectedSize = sizeClasses[size] || sizeClasses["md"];

    return (
        <button
        style={{ width:"100%" }}
        type={type}
            className={`btn-light ${className} ${selectedSize}`}
        onClick={onClick}
        >
            {icon && <span className="icon">{icon} </span>}
            {label && <span>{label}</span>}
            
        </button>
    )

}