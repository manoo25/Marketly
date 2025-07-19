import React from 'react'
import PrimarySelector from '../../globalComonents/PrimarySelector'

function GovernorateFilter({ selectedGovernorate, setSelectedGovernorate }) {

  const governorates = [{ label: "كل المحافظات", value: "" }, { label: "القاهرة", value: "cairo" }, { label: "الغربية", value: "gharbia" }, { label: "الدقهلية", value: "dakahlia" }, { label: "الجيزة", value: "giza" }]

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