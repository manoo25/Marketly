import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../css/global.css";
import "./DatePickerCustom.css";

function DateSearch({ startDate, endDate, setStartDate, setEndDate }) {
  return (
    <div className="d-flex gap-2 align-items-center">
      <div>
        <label>من</label>
        <DatePicker
        
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          className="form-control LayerDate "
          popperPlacement="bottom-end"
          portalId="root-portal"
          popperClassName="datepicker-popper"
        />
      </div>
      <div>
        <label>إلى</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
          className="form-control"
          popperPlacement="bottom-end"
          portalId="root-portal"
          popperClassName="datepicker-popper"
        />
      </div>
    </div>
  );
}

export default DateSearch;
