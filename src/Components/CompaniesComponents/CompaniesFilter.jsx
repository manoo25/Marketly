import LightButton from "../globalComonents/LightButton";
import NameSearch from "../UsersComponents/FilteredComponents/NameSearch";
import PrimaryButton from "../globalComonents/PrimaryButton";
import DateSearch from "./FilteredComponents/DateSearch";

function CompaniesFilter({
  searchName,
  setSearchName,
  onSearchClick,
  onResetFilters,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
  return (
    <div className="d-flex gap-3 align-items-center justify-content-between w-100 px-2 mt-2">
      <NameSearch
        searchName={searchName}
        setSearchName={setSearchName}
        onSearchClick={onSearchClick}
      />
      <DateSearch
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <div style={{ width: "120px" }}>
        <LightButton label="بحث" onClick={onSearchClick} className="" />
      </div>

      <PrimaryButton
        label="مسح "
        onClick={onResetFilters}
        // className="btn btn-outline-secondary me-2"
      />
    </div>
  );
}

export default CompaniesFilter;
