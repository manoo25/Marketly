import React, { useEffect } from 'react'
import PrimarySelector from '../../globalComonents/PrimarySelector'
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../Redux/Slices/OrdersSlice';

function StateFilter({ selectedState, setSelectedState }) {

    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.Orders);
    let OptionsData = [];

    if (Array.isArray(status)) {
        status.forEach(statu => {
            OptionsData.push({
                label: statu.name,
                value: statu.name
            });
        });
    }

    useEffect(() => {
        dispatch(getOrders());
    }, []);

    return (
        <div style={{ width: "220px" }}>
            <PrimarySelector
                options={OptionsData}
                label='إختر الحالة'
                value={selectedState}
                onChange={(val) => setSelectedState(val)}
            />
        </div>
    )
}

export default StateFilter;