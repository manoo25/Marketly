import React from 'react';
import GovernorateFilter from './FilteredComponents/GovernorateFilter';
import LightButton from '../globalComonents/LightButton';
import RoleFilter from './FilteredComponents/RoleFilter';
import NameSearch from './FilteredComponents/NameSearch';
import EmailSearch from './FilteredComponents/EmailSearch';
import DangerButton from '../globalComonents/DangerButton';
import PrimaryButton from '../globalComonents/PrimaryButton';

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
    onResetFilters
}) {
    return (
        <div className="d-flex gap-3 align-items-center justify-content-between w-100  px-2">

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
                setSelectedRole={setSelectedRole}

            />

            <div style={{ width: "120px" }}>
                <LightButton label='بحث' onClick={onSearchClick} className='' />
            </div>

            <PrimaryButton
                label="مسح "
                onClick={onResetFilters}
            // className="btn btn-outline-secondary me-2"
            />


        </div>
    );
}

export default UsersFilter;
