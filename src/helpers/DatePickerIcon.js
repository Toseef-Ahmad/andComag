/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // import reat-datepicker module
import 'react-datepicker/dist/react-datepicker.css'; // import reat-datepicker css
import { FiCalendar } from 'react-icons/fi'; // import calendar icon from reat-icon

const style = {
  display: 'flex',
  justifyContent: 'space-evenly',
  height: '2rem',
  borderRadius: '7px',
  width: '15rem',
  color: '#32e0c4',
  cursor: 'pointer',
  background: '#293B50',
  paddingTop: '0.4rem',
  marginBottom: '0.5rem'
};


const ref = React.createRef(); // we need to add a Dom ref to the new Component to avoid Dom reffrence Error

const DatePickerIcon = ({selectedDate,handleSelectedDate}) => {

  return (
    <div className="datepicker-wrapper" style={style}>
      <span style={{ color: 'white' }}>Date:</span>{' '}
      {selectedDate ? selectedDate.toDateString() : '     '}
      <div className="datepicker">
        <DatePicker
          selected={selectedDate}
          onChange={handleSelectedDate}
          customInput={<FiCalendar />}
          dateFormat="yyyy/MM/dd"
          placeholder="Select Date"
        />
      </div>
    </div>
  );
};

export default DatePickerIcon;
