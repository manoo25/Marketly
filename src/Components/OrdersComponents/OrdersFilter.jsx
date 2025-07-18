import GovFilter from "./FilterdComponents/GovFilter";
import StateFilter from "./FilterdComponents/StateFilter";
import NameSearch from "./FilterdComponents/Namesearch";
import LightButton from '../globalComonents/LightButton';
import PrimaryButton from '../globalComonents/PrimaryButton';



function OrdersFilter({
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

            <GovFilter
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