import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import { generateReportTwo } from '../../actions';

const renderDateTimePicker = ({ input: { onChange, value }, showTime }) => {
  return (
    <DateTimePicker
      onChange={onChange}
      format="DD MMM YYYY"
      time={false}
      value={!value ? null : new Date(value)}
    />
  );
};

class ReportTwo extends Component {
  formatTime(date) {
    const newTime = {};
    newTime.year = date.getFullYear();
    newTime.month = date.getMonth() + 1;
    newTime.day = date.getDate();
    return newTime;
  }
  handleFormSubmit(form) {
    if (!form.reportTime) {
      return;
    }
    console.log(this.formatTime(form.reportTime));
    this.props.generateReportTwo(this.formatTime(form.reportTime));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div style={{ maxWidth: '500px' }}>
        <h3>Daily System Reservation Rate</h3>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <label>Time</label>
          <Field
            name="reportTime"
            showTime={false}
            id="reportTime"
            component={renderDateTimePicker}
          />
          <br />
          <button type="submit" className="login-btn">
            Submit
          </button>
        </form>
        <br />
        {this.props.report && <h3>Result: {this.props.report}</h3>}
      </div>
    );
  }
}

function mapStateToProp(state) {
  return { report: state.report.two };
}
export default connect(mapStateToProp, { generateReportTwo })(
  reduxForm({
    form: 'reporttwo'
  })(ReportTwo)
);
