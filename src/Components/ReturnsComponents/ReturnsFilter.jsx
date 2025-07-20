import GovFilter from "./FilterdComponents/GovFilter";
import NameSearch from "./FilterdComponents/Namesearch";
import LightButton from '../globalComonents/LightButton';
import PrimaryButton from '../globalComonents/PrimaryButton';
import DateSearch from "../CompaniesComponents/FilteredComponents/DateSearch";




function ReturnsFilter({
    searchName,
    setSearchName,
    selectedGovernorate,
    setSelectedGovernorate,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    onSearchClick,
    onResetFilters
}) {
    return (
        <div className="d-flex gap-3 align-items-center justify-content-between w-100 px-2 mt-2">

            <NameSearch
                searchName={searchName}
                setSearchName={setSearchName}
            />

            <GovFilter
                selectedGovernorate={selectedGovernorate}
                setSelectedGovernorate={setSelectedGovernorate}
            />

            <div style={{ minWidth: "500px" }}>
                <DateSearch
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
            </div>

            <div style={{ width: "120px" }}>
                <LightButton label="بحث" onClick={onSearchClick} className="" />
            </div>
            <PrimaryButton
                label="إلغاء "
                onClick={onResetFilters}
            />

        </div>
    );
}

export default ReturnsFilter;