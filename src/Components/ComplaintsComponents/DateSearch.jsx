import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/Table.css";


function DateSearch({ filterDate, setFilterDate }) {
  return (
    <div className="d-flex gap-2 align-items-center ">
      <div>
      
        <DatePicker
        placeholderText="اختر التاريخ"
          selected={filterDate}
          onChange={(date) => setFilterDate(date)}
          dateFormat="yyyy-MM-dd"
          className="form-control LayerDate "
          popperPlacement="bottom-end"
          portalId="root-portal"
          popperClassName="datepicker-popper"
        />
      </div>
    
    </div>
  );
}

export default DateSearch;
