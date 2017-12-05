import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import DropdownList from 'react-widgets/lib/DropdownList';
// import DateTimePicker from 'react-widgets/lib/DateTimePicker';
// import Calendar from 'react-widgets/lib/Calendar';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
Moment.locale('en');
momentLocalizer();

const colors = [
  { color: 'Red', value: 'ff0000' },
  { color: 'Green', value: '00ff00' },
  { color: 'Blue', value: '0000ff' }
];

export default class App extends Component {
  render() {
    return (
      <div>
        <h1 className="error">Hello World</h1>
      </div>
    );
  }
}
