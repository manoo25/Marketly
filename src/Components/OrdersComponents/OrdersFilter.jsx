
import StateFilter from "./FilterdComponents/StateFilter";
import NameSearch from "./FilterdComponents/Namesearch";
import LightButton from '../globalComonents/LightButton';
import PrimaryButton from '../globalComonents/PrimaryButton';
import GovernorateFilter from "../globalComonents/GovernorateFilter";
import IdSearch from "./FilterdComponents/IdSearch";



function OrdersFilter({
    searchName,
    setSearchName,
    searchId,
    setSearchId,
    selectedGovernorate,
    setSelectedGovernorate,
    selectedState,
    setSelectedState,
    onResetFilters
}) {
    return (
        <div className="d-flex gap-3 align-items-center justify-content-between w-100 px-2 mt-2">

            <IdSearch
                searchId={searchId}
                setSearchId={setSearchId}
            />
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

export default OrdersFilter;