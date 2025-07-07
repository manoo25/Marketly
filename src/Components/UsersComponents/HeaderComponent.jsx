import React from 'react'
import PrimaryButton from '../globalComonents/PrimaryButton'

function HeaderComponent() {
  return (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "1148px", margin: "auto" }}>
          <h2>المستخدمين</h2>
          <div className="my-3" style={{ width: "", }}>
              <PrimaryButton
                  className="py-3"
                  icon={<i className="fa-solid fa-user-plus ps-2"></i>}
                  label="إضافة مستخدم"
                  onClick={() => {
                    console.log("Adding new User Fun")
                  }}
              />
          </div>
      </div>
  )
}

export default HeaderComponent