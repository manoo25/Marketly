
export default function PrimaryButton({label,icon,type,onClick,size}) {

    const sizeClasses = {
        sm: "btn-sm",
        md: "",
        lg: "btn-lg",
    };

    const selectedSize = sizeClasses[size] || sizeClasses["md"];

    return (
        <button
        type={type}
        className={`btn-primary  ${selectedSize} d-flex align-items-center gap-2`}
        onClick={onClick}
        >
            {icon && <span className={icon}></span>}
            {label && <span>{label}</span>}
            
        </button>
    )

}