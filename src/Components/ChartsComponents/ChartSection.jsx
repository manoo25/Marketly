import React from 'react'
import RevnueChart from './RevnueChart'
import SalesChart from './SalesChart'

function ChartSection() {
  return (
    <div className='row g-4'>
        <div className='col-xl-8'>
            <RevnueChart/>
        </div>
        <div className='col-xl-4'>
            <SalesChart/>
        </div>
    </div>
  )
}

export default ChartSection