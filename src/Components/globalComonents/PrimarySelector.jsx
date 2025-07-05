import React from "react";

export default function PrimarySelector({label="اختر" , icon ="", className="", value="", options=[], onChange=()=>{}}){

    return (
        <select
            value={value}
            onChange={(e)=>onChange(e.target.value)}
            className={`selector ${className}`}
        >
            <option value="" disabled>{icon} {label}</option>
            {options.map((option,index)=>(
                <option key={index} value={option.value}>{option.label}</option>
            ))}
        </select>
    )
}