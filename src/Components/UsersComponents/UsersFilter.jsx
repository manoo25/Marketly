import React from 'react';
import GovernorateFilter from './FilteredComponents/GovernorateFilter'; // أو أي اسم فلترك
import LightButton from '../globalComonents/LightButton';
import RoleFilter from './FilteredComponents/RoleFilter';
import NameSearch from './FilteredComponents/NameSearch';
import EmailSearch from './FilteredComponents/EmailSearch';

function UsersFilter({
    searchName,
    setSearchName,
    searchEmail,
    setSearchEmail,
    selectedGovernorate,
    setSelectedGovernorate,
    selectedRole,
    setSelectedRole,
    onSearchClick,
}) {
    return (
        <div className="d-flex gap-2 align-items-center justify-content-center">

            <NameSearch
                searchName={searchName}
                setSearchName={setSearchName}
            />

            <EmailSearch
                searchEmail={searchEmail}
                setSearchEmail={setSearchEmail}
            />

            <GovernorateFilter
                selectedGovernorate={selectedGovernorate}
                setSelectedGovernorate={setSelectedGovernorate}
            />
    
            <RoleFilter
                selectedRole={selectedRole}
                setSelectedRole = {setSelectedRole}

            />

            <div style={{ width:"120px" }}>
                <LightButton label='بحث' onClick={onSearchClick} className='' />
            </div>
        </div>
    );
}

export default UsersFilter;
