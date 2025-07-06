import React from 'react'
import PrimarySearch from '../../globalComonents/PrimarySearch'
import { FaSearch } from 'react-icons/fa';

function EmailSearch({ searchEmail, setSearchEmail }) {
  return (
    <div style={{ width:"" }}>
      <PrimarySearch
        label='بحث بالبريد الإلكتروني   '
        icon={<FaSearch size={16} color="#888" />}
        value={searchEmail}
        onChange={(val) => setSearchEmail(val)}
      />
    </div>
  )
}

export default EmailSearch