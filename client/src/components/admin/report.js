import React, { Component } from 'react';
import ReportOne from './reportOne';
import ReportTwo from './reportTwo';
import ReportThree from './reportThree';

export default class Report extends Component {
  render() {
    return (
      <div style={{ marginBottom: '300px' }}>
        <ReportOne />
        <hr />
        <ReportTwo />
        <hr />
        <ReportThree />
      </div>
    );
  }
}
