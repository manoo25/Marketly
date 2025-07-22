import React from 'react'
import PrimarySelector from '../../globalComonents/PrimarySelector'
const citiesByGovernorate = [
  "الإسكندرية",
  "الإسماعيلية",
  "الأقصر",
  "البحر الأحمر",
  "البحيرة",
  "الجيزة",
  "الدقهلية",
  "السويس",
  "الشرقية",
  "الغربية",
  "الفيوم",
  "القاهرة",
  "القليوبية",
  "المنوفية",
  "المنيا",
  "الوادي الجديد",
  "بني سويف",
  "بورسعيد",
  "جنوب سيناء",
  "دمياط",
  "سوهاج",
  "شمال سيناء",
  "قنا",
  "كفر الشيخ",
  "مطروح",
  "أسوان",
  "أسيوط"
];
function GovernorateFilter({ selectedGovernorate, setSelectedGovernorate }) {

  const governorates = [
    { label: "كل المحافظات", value: "" },
    ...citiesByGovernorate.map((city) => ({
      label: city,
      value: city
    }))
  ];
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


<option value="cairo">القاهرة</option>

export default GovernorateFilter;