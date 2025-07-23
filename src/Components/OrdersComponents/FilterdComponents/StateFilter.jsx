import PrimarySelector from '../../globalComonents/PrimarySelector'

function StateFilter({ selectedState, setSelectedState }) {

        // const states = [{ label: "كل الحالات", value: "" }, { label: "قيد التنفيذ", value: "قيد التنفيذ" }, { label: "تم التوصيل", value: "تم التوصيل" }, { label: "ملغي", value: "ملغي" }]
    const states = [
        { label: "كل الحالات", value: "" },
        { label: "قيد التنفيذ", value: "inprogress" },
        { label: "تم الاستلام", value: "done" },
        { label: "مرتجع", value: "returns" },
        { label: "معلق", value: "pending" }
    ];


    return (
        <div style={{ width: "220px" }}>
            <PrimarySelector
                options={states}
                label='إختر الحالة'
                value={selectedState}
                onChange={(val) => setSelectedState(val)}
            />
        </div>
    )
}

export default StateFilter;