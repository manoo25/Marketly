import React from 'react'
import PrimarySearch from '../../globalComonents/PrimarySearch'
import { FaSearch } from 'react-icons/fa';

function TraderSearch({ searchTrader, setSearchTrader,onSearchClick }) {
  return (
    <div style={{ width:"" }}>
      <PrimarySearch
        label='إسم التاجر '
        icon={<FaSearch size={16} color="#888" />}
        value={searchTrader}
        onChange={(val) => 
        {
          setSearchTrader(val)
          onSearchClick()
        }
          }
      />
    </div>
  )
}

export default TraderSearch