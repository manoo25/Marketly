import React from 'react'
import PrimarySelector from '../../globalComonents/PrimarySelector'

function RoleFilter({ selectedRole, setSelectedRole }) {

    const roles = [{ label: "كل الصلاحيات", value: "" }, { label: "أدمن", value: "admin" }, { label: "تاجر", value: "trader" }, { label: "مستخدم", value: "user" }, { label: "مندوب", value: "delegate" }]

    return (
        <div style={{width:"220px"}}>
            <PrimarySelector
                options={roles}
                label='اختيار صلاحية'
                value={selectedRole}
                onChange={(val) => setSelectedRole(val)}
            />
        </div>
    )
}

export default RoleFilter;