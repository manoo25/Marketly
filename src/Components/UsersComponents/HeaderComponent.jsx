import React from 'react'
import PrimaryButton from '../globalComonents/PrimaryButton'

function HeaderComponent() {
  return (
       <>
        <header className="d-flex justify-content-between w-100 px-1 pt-3"> 
<h3>المستخدمين</h3>
  <PrimaryButton
                  className="py-3"
                  icon={<i className="fa-solid fa-user-plus ps-2"></i>}
                  label="إضافة مستخدم"
                  onClick={() => {
                    console.log("Adding new User Fun")
                  }}
              />
        </header>
        </>
  )
}

export default HeaderComponent