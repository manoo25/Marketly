import React from 'react'
import PrimarySearch from '../../globalComonents/PrimarySearch'
import { FaSearch } from 'react-icons/fa';


function IdSearch({ searchId, setSearchId }) {
  return (
    <div style={{ width:"" }}>
      <PrimarySearch
        label='بحث برقم الطلب'
        icon={<FaSearch size={16} color="#888" />}
        value={searchId}
        onChange={(val) => setSearchId(val)}
      />
    </div>
  )
}

export default IdSearch