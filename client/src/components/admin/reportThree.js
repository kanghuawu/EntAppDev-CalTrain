import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import { generateReportThree } from '../../actions';
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

class ReportThree extends Component {
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
    this.props.generateReportThree(this.formatTime(form.reportTime));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div style={{ maxWidth: '500px' }}>
        <h3>Daily ticket reservation stats</h3>
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
        {this.props.report && (
          <ul>
            <li key={1}>Total Request: {this.props.report.totalRequest}</li>
            <li key={2}>Non Request: {this.props.report.noneRequest}</li>
            <li key={3}>One Request: {this.props.report.oneRequest}</li>
            <li key={4}>Any Request: {this.props.report.anyRequest}</li>
            <li key={5}>None Percentage: {this.props.report.nonePercentage}</li>
            <li key={6}>One Percentage: {this.props.report.onePercentage}</li>
            <li key={7}>Any Percentage: {this.props.report.anyPercentage}</li>
            <li key={8}>Non Average: {this.props.report.noneAverage}</li>
            <li key={9}>One Average: {this.props.report.oneAverage}</li>
          </ul>
        )}
      </div>
    );
  }
}

function mapStateToProp(state) {
  return { report: state.report.three };
}
export default connect(mapStateToProp, { generateReportThree })(
  reduxForm({
    form: 'reportthree'
  })(ReportThree)
);
