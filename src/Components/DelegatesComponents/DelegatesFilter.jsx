// ✅ DelegatesFilter.js
import React from 'react';
import GovernorateFilter from '../UsersComponents/FilteredComponents/GovernorateFilter';
import NameSearch from '../UsersComponents/FilteredComponents/NameSearch';
import LightButton from '../globalComonents/LightButton';
import PrimaryButton from '../globalComonents/PrimaryButton';
import PrimarySelector from '../globalComonents/PrimarySelector';
import PrimarySearch from '../globalComonents/PrimarySearch';

import { FaSearch } from 'react-icons/fa';
// import PhoneSearch from './FilteredComponents/PhoneSearch';

function DelegatesFilter({
    searchName,
    setSearchName,
    searchPhone,
    setSearchPhone,
    searchTrader,
    setSearchTrader,
    selectedGovernorate,
    setSelectedGovernorate,
    selectedDay,
    setSelectedDay,
    onSearchClick,
    onResetFilters
}) {


    const daysOfWeek = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
    return (
        <div className="d-flex gap-3 align-items-center justify-content-between w-100 px-2 py-2">

            <NameSearch
                searchName={searchName}
                setSearchName={setSearchName}
            />

            <PrimarySearch
                label="بحث برقم الهاتف"
                icon={<FaSearch size={16} color="#888" />}
                value={searchPhone}
                onChange={setSearchPhone}
            />

            <PrimarySearch
                label="بحث باسم التاجر"
                icon={<FaSearch size={16} color="#888" />}
                value={searchTrader}
                onChange={setSearchTrader}
            />

            <GovernorateFilter
                selectedGovernorate={selectedGovernorate}
                setSelectedGovernorate={setSelectedGovernorate}
            />

            <div>
                <PrimarySelector
                    label="اليوم"
                    value={selectedDay}
                    onChange={setSelectedDay}
                    options={[
                        { value: "", label: "بدون تحديد يوم" },
                        { value: "ALL_DAYS", label: "جميع الأيام" },
                        ...daysOfWeek.map(day => ({ value: day, label: day }))
                    ]}
                />
            </div>



            <div style={{ width: "120px" }}>
                <LightButton label='بحث' onClick={onSearchClick} />
            </div>

            <PrimaryButton
                label="إلغاء"
                onClick={onResetFilters}
            />

        </div>
    );
}

export default DelegatesFilter;
