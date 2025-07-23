import StateFilter from "./FilterdComponents/StateFilter";
import NameSearch from "./FilterdComponents/Namesearch";
import PrimaryButton from '../globalComonents/PrimaryButton';
import GovernorateFilter from "../globalComonents/GovernorateFilter";



function ReturnsFilter({
    searchName,
    setSearchName,
    selectedGovernorate,
    setSelectedGovernorate,
    selectedState,
    setSelectedState,
    onResetFilters
}) {
    return (
        <div className="d-flex gap-3 align-items-center justify-content-between w-100 px-2 mt-2">

            <NameSearch
                searchName={searchName}
                setSearchName={setSearchName}
            />

            <GovernorateFilter
                selectedGovernorate={selectedGovernorate}
                setSelectedGovernorate={setSelectedGovernorate}
            />

            <StateFilter
                selectedState={selectedState}
                setSelectedState={setSelectedState}
            />

            <PrimaryButton
                label="إلغاء "
                onClick={onResetFilters}
            />

        </div>
    );
}

export default ReturnsFilter;