import React from 'react'
import PrimarySearch from '../../globalComonents/PrimarySearch'
import { FaSearch } from 'react-icons/fa';


function NameSearch({ searchName, setSearchName }) {
  return (
    <div style={{ width:"" }}>
      <PrimarySearch
        label='بحث بالأسم'
        icon={<FaSearch size={16} color="#888" />}
        value={searchName}
        onChange={(val) => setSearchName(val)}
      />
    </div>
  )
}

export default NameSearch