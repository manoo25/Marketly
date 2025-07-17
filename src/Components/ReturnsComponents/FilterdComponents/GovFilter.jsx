import React from 'react'
import PrimarySelector from '../../globalComonents/PrimarySelector'

function GovFilter({ selectedGovernorate, setSelectedGovernorate }) {

  const governorates = [{ label: "كل المحافظات", value: "" },
     { label: "القاهرة", value: "Cairo" },
     { label: "الجيزة", value: "Giza" },
     { label: "الإسكندرية", value: "Alexandria" },
     { label: "البحيرة", value: "Beheira" },
     { label: "المنوفية", value: "Menofia" },
     { label: "الغربية", value: "Gharbia" },
     { label: "الدقهلية", value: "Dakahlia" },
     { label: "الفيوم", value: "Faiyum" },
     { label: "بني سويف", value: "Beni Suef" },
     { label: "المنيا", value: "Minya" },
     { label: "أسيوط", value: "Assiut" },
     { label: "سوهاج", value: "Sohag" },
     { label: "الاقصر", value: "Luxor" },
     { label: "قنا", value: "Qena" },
     { label: "أسوان", value: "Aswan" },
     { label: "البحر الأحمر", value: "Red Sea" },
     { label: "مطروح", value: "Matrouh" },
     { label: "شمال سيناء", value: "North Sinai" },
     { label: "جنوب سيناء", value: "South Sinai" },
     { label: "السويس", value: "Suez" },
     { label: "بورسعيد", value: "Port Said" },
     { label: "الإسماعيلية", value: "Ismailia" },
     { label: "كفر الشيخ", value: "Kafr El Sheikh" },
     { label: "دمياط", value: "Damietta" },
     { label: "الشرقية", value: "Sharqia" },
     { label: "المنصورة", value: "Mansoura" },
     { label: "السويس", value: "Suez" },
     { label: "الفيوم", value: "Fayoum" }]

  return (
    <div style={{ width:"200px" }}>
      <PrimarySelector
        options={governorates}
        label='المحافظة'
        value={selectedGovernorate}
        onChange={(val) => setSelectedGovernorate(val)}
      />
    </div>
  )
}

export default GovFilter;