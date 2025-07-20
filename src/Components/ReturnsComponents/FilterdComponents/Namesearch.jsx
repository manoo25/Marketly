import React from 'react'
import PrimarySearch from '../../globalComonents/PrimarySearch'
import { FaSearch } from 'react-icons/fa';


function NameSearch({ searchName, setSearchName, onSearchClick }) {
  return (
    <div style={{ width: "" }}>
      <PrimarySearch
        label='بحث بالأسم'
        icon={<FaSearch size={16} color="#888" />}
        value={searchName}
        onChange={(val) => {
          setSearchName(val);
          onSearchClick();
        }}
      />
    </div>
  )
}

export default NameSearch