import React from 'react';
import DatePicker from 'react-native-datepicker';

const DateView = ({
  placeholder,
  minDate,
  maxDate,
  date,
  onDateChange,
  style,
}) => {
  return (
    <DatePicker
      style={style}
      date={date} // Initial date from state
      mode="date" // The enum of date, datetime and time
      showIcon={false}
      placeholder={placeholder}
      format="YYYY-MM-DD"
      minDate={minDate}
      maxDate={maxDate}
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      onDateChange={onDateChange}
    />
  );
};

export default DateView;
