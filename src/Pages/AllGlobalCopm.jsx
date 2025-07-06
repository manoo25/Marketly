import PrimarySearch from "../Components/globalComonents/PrimarySearch"
import LightButton from "../Components/globalComonents/LightButton"
import DangerButton from "../Components/globalComonents/DangerButton"
import PrimaryButton from "../Components/globalComonents/PrimaryButton"
import SecondaryButton from "../Components/globalComonents/SecondaryButton"
import PrimarySelector from "../Components/globalComonents/PrimarySelector"
import { useState } from "react"



export default function AllGlobalCopm() {
    const [value, setValue] = useState("");
    const [selected, setSelected] = useState("");
    console.log({selected})
    return (
        <div>
            <PrimarySearch label="بحث عن مستخدم" icon="+_+" value={value} onChange={(val)=>setValue(val)}/>
            <LightButton label="بحث" onClick={() => console.log({value})} />
            <DangerButton label="حذف" />
            <PrimaryButton label="إضافة مستخدم" />
            <SecondaryButton label="إالغاء" />
            <PrimarySelector options={[{ value: "admin", label: "أدمن" }, { value: "trader", label: "تاجر" }, { value: "user", label: "عميل" }]} value={selected} onChange={(val)=>setSelected(val)} />
            <LightButton label="بحث" onClick={() => console.log({selected})} />
        </div>
    )
}
