import React from "react"

export default function PrimarySearch({label="بحث", icon="+",className="" ,type="search", value="" ,onChange= ()=>{}}){
    return (
        <input
        type = {type}
        value = {value}
        onChange = {(e)=>onChange(e.target.value)}
        className={`input-search ${className}`}
        placeholder={`${icon} ${label}`}
        />
    )
}