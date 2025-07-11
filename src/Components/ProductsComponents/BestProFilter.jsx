
import GovernorateFilter from './FilteredComponents/CatFilter';
import LightButton from '../globalComonents/LightButton';
import RoleFilter from './FilteredComponents/CompanyFilter';
import NameSearch from './FilteredComponents/NameSearch';
import PrimaryButton from '../globalComonents/PrimaryButton';
function BestProFilter({
    searchName,
    setSearchName,
   
    selectedCat,
    setselectedCat,
    selectedCompany,
    setselectedCompany,
    onSearchClick,
    onResetFilters
}) {
    return (
        <div className="d-flex gap-3 align-items-center justify-content-between w-100 px-2 mt-2">

            <NameSearch
                searchName={searchName}
                setSearchName={setSearchName}
                onSearchClick={onSearchClick}
            />
        

            <GovernorateFilter
                selectedCat={selectedCat}
                setselectedCat={setselectedCat}
            />

            <RoleFilter
                selectedRole={selectedCompany}
                setSelectedRole={setselectedCompany}

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

export default BestProFilter;
