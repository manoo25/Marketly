import Namesearch from "../SalesComponents/FilterdComponents/Namesearch";
import GovernorateFilter from "../globalComonents/GovernorateFilter";
import LightButton from '../globalComonents/LightButton';
import PrimaryButton from '../globalComonents/PrimaryButton';
import DateSearch from "./DateSearch";




function ComplaintsFilter({
    searchName,
    setSearchName,
    selectedGovernorate,
    setSelectedGovernorate,
    filterDate,
    setFilterDate,
    onSearchClick,
    PendingComplaints,
    onResetFilters
}) {
    return (
        <div className="d-flex gap-3 align-items-center justify-content-between w-100 px-2 mt-2">

            <Namesearch
                searchName={searchName}
                setSearchName={setSearchName}
                onSearchClick={onSearchClick}
            />

            <GovernorateFilter
                selectedGovernorate={selectedGovernorate}
                setSelectedGovernorate={setSelectedGovernorate}
            />
<div style={{ minWidth: "250px" }}>
     <DateSearch
        filterDate={filterDate}
        setFilterDate={setFilterDate}
      />
</div>
    <div style={{ minWidth: "140px" }}>
        <LightButton
          label="شكاوى معلقة"
          onClick={PendingComplaints}
          className="bg-warning text-white w-100"
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

export default ComplaintsFilter;