import PrimarySearch from "../Components/globalComonents/PrimarySearch"
import LightButton from "../Components/globalComonents/LightButton"
import DangerButton from "../Components/globalComonents/DangerButton"
import PrimaryButton from "../Components/globalComonents/PrimaryButton"
import SecondaryButton from "../Components/globalComonents/SecondaryButton"
import PrimarySelector from "../Components/globalComonents/PrimarySelector"



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
