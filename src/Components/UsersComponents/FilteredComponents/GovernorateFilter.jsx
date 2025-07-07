import React from 'react'
import PrimarySelector from '../../globalComonents/PrimarySelector'

function GovernorateFilter({ selectedGovernorate, setSelectedGovernorate }) {

  const governorates = [{ label: "كل المحافظات", value: "" }, { label: "القاهرة", value: "Cairo" }, { label: "الأسكندرية", value: "Alex" }]

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

export default GovernorateFilter;