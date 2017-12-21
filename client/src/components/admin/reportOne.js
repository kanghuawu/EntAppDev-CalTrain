import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import { generateReportOne } from '../../actions';
import renderField from '../util/formHelper';

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

class ReportOne extends Component {
  formatTime(date) {
    const newTime = {};
    newTime.year = date.getFullYear();
    newTime.month = date.getMonth() + 1;
    newTime.day = date.getDate();
    return newTime;
  }
  handleFormSubmit(form) {
    if (!form.trainName || !form.reportTime) {
      return;
    }
    let res = {};
    res.trainName = form.trainName;
    res = { ...res, ...this.formatTime(form.reportTime) };
    console.log(res);
    this.props.generateReportOne(res);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div style={{ maxWidth: '500px' }}>
        <h3>Per Train Reservation Rate</h3>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <label>Time</label>
          <Field
            name="reportTime"
            showTime={false}
            id="reportTime"
            component={renderDateTimePicker}
          />
          <Field
            label="Train Name"
            placeholder="Train Name"
            name="trainName"
            component={renderField}
            type="input"
          />
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
  return { report: state.report.one };
}
export default connect(mapStateToProp, { generateReportOne })(
  reduxForm({
    form: 'reportone'
  })(ReportOne)
);
