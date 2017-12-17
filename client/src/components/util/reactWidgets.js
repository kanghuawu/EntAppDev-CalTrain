import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import SelectList from 'react-widgets/lib/DateTimePicker';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

export const renderDropdownList = ({ input, data, valueField, textField }) => (
  <DropdownList
    {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onChange={input.onChange}
  />
);

export const renderSelectList = ({ input, data }) => (
  <SelectList {...input} onBlur={() => input.onBlur()} data={data} />
);

export const renderDateTimePicker = ({
  input: { onChange, value },
  showTime
}) => (
  <DateTimePicker
    onChange={onChange}
    format="DD MMM YYYY, HH:mm"
    step={15}
    time={showTime}
    value={!value ? null : new Date(value)}
  />
);
