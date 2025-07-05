
import React from 'react'


export default function AllGlobalCopm() {
    return (
        <div>
            <PrimarySearch label="بحث عن مستخدم" icon="+_+" />
            <LightButton label="بحث" onClick={() => console.log("searchVal")} />
            <DangerButton label="حذف" />
            <PrimaryButton label="إضافة مستخدم" />
            <SecondaryButton label="إالغاء" />
            <PrimarySelector options={[{ value: "admin", label: "أدمن" }, { value: "trader", label: "تاجر" }, { value: "user", label: "عميل" }]} />
            <LightButton label="بحث" onClick={() => console.log("selectedRole")} />
        </div>
    )
}
