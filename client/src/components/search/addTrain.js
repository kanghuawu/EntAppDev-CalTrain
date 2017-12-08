import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { reduxForm, change, Field } from 'redux-form';

import { renderDropdownList, renderSelectList } from '../util/reactWidgets';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import RenderAlert from './renderAlert';
import LoginModal from './modal';
import {
  searchTrainList,
  createTransaction,
  clearSearch,
  showModal
} from '../../actions';

class AddTrain extends Component {
  formatResponse(data) {
    const startDay = String(data.startDay).split('-');
    data.year = parseInt(startDay[0]);
    data.month = parseInt(startDay[1]);
    data.day = parseInt(startDay[2]);
    const startTime = String(data.startTime).split(':');
    const endTime = String(data.endTime).split(':');
    data.startHour = parseInt(startTime[0]);
    data.startMinute = parseInt(startTime[1]);
    data.endHour = parseInt(endTime[0]);
    data.endMinute = parseInt(endTime[1]);
    delete data.startDay;
    delete data.endDay;
    delete data.startTime;
    delete data.endTime;
    return data;
  }
  onSubmit(formProps) {
    if (!this.props.auth) {
      this.props.showModal();
    } else {
      if (!formProps.passengers) {
        alert('Passenger is empty!');
        return;
      }
      const go = JSON.parse(
        JSON.stringify(
          this.props.search.goTripInfoAggregation.normalTrainTrips[
            formProps.go
          ] ||
            this.props.search.goTripInfoAggregation.fastTrainTrips[formProps.go]
        ) || null
      );

      let back = {};
      if (formProps.back) {
        back = JSON.parse(
        JSON.stringify(
            this.props.search.backTripInfoAggregation.normalTrainTrips[
              formProps.back
            ] ||
              this.props.search.backTripInfoAggregation.fastTrainTrips[
                formProps.back
              ] ||
              null
          )
        );
      }
      
      const res = {};
      if (formProps.go) {
        go.segments.forEach((o, i, a) => {
          o = this.formatResponse(o);
        });
        res.goSegments = go.segments;
        res.round = false;
      } else {
        alert('Go trip is empty!');
        return;
      }

      if (formProps.back) {
        back.segments.forEach((o, i, a) => {
          o = this.formatResponse(o);
        });
        res.round = true;
        res.backSegments = back.segments;
      }
      res.passengers = formProps.passengers;
      const userName = localStorage.getItem('userName');
      const password = localStorage.getItem('password');
      res.userName = userName;
      res.password = password;
      this.props.createTransaction(res, () =>
        this.props.history.push('/transaction')
      );
    }
  }

  // onChange(id) {
  //   this.props.selectTrain(id);
  // }

  renderSegment(segment, direction) {
    return segment.map(seg => {
      return (
        <tr
          key={
            seg.trainName +
            seg.fast +
            seg.startDay +
            seg.startTime +
            seg.endDay +
            seg.endTime
          }
        >
          <th>{seg.trainName}</th>
          <th>{seg.fast}</th>
          <th>{seg.startDay}</th>
          <th>{seg.startTime}</th>
          <th>{seg.endDay}</th>
          <th>{seg.endTime}</th>
          <th>{seg.startStation}</th>
          <th>{seg.endStation}</th>
          <th>{seg.price}</th>
          <th>{seg.ticketsLeft}</th>
        </tr>
      );
    });
  }

  renderTrip(trainTrips, direction) {
    return _.map(trainTrips, trip => {
      return (
        <li className="list-group-item" key={trip.segments_id}>
          <div className="row">
            <div className="col-auto">
              <Field
                name={direction ? 'go' : 'back'}
                component="input"
                type="radio"
                value={trip.segments_id}
              />
            </div>
            <div className="col-11">
              <table className="table-sm table-bordered">
                <thead>
                  <tr>
                    <th>Train Name</th>
                    <th>Fast</th>
                    <th>Start Day</th>
                    <th>Start Time</th>
                    <th>End Day</th>
                    <th>End Time</th>
                    <th>Start Station</th>
                    <th>End Station</th>
                    <th>Price</th>
                    <th>Tickets Left</th>
                  </tr>
                </thead>
                <tbody>{this.renderSegment(trip.segments)}</tbody>
              </table>
            </div>
          </div>
        </li>
      );
    });
  }

  render() {
    if (this.props.search == null) {
      return <div>Loading...</div>;
    }
    const {
      goTripInfoAggregation,
      backTripInfoAggregation
    } = this.props.search;
    const { handleSubmit } = this.props;
    const passengers = [1, 2, 3, 4, 5];
    return (
      <div>
        <LoginModal />
        <form>
          {goTripInfoAggregation &&
          goTripInfoAggregation.normal && (
            <div>
              <h4>Normal Go Train</h4>
              <ul>
                {this.renderTrip(goTripInfoAggregation.normalTrainTrips, true)}
              </ul>
            </div>
          )}
          {goTripInfoAggregation &&
          goTripInfoAggregation.fast && (
            <div>
              <h4>Fast Go Train</h4>
              <ul>
                {this.renderTrip(goTripInfoAggregation.fastTrainTrips, true)}
              </ul>
            </div>
          )}
          {backTripInfoAggregation &&
          backTripInfoAggregation.normal && (
            <div>
              <h4>Normal Back Train</h4>
              <ul>
                {this.renderTrip(
                  backTripInfoAggregation.normalTrainTrips,
                  false
                )}
              </ul>
            </div>
          )}
          {backTripInfoAggregation &&
          backTripInfoAggregation.fast && (
            <div>
              <h4>Fast Back Train</h4>
              <ul>
                {this.renderTrip(backTripInfoAggregation.fastTrainTrips, false)}
              </ul>
            </div>
          )}
          <div>
            <div style={{ maxWidth: '200px' }}>
              <label>Number of Passenger</label>{' '}
              <Field
                data={passengers}
                name="passengers"
                id="passengers"
                component={renderDropdownList}
              />
              {this.props.form.addtrainlist}
            </div>
          </div>
          <RenderAlert />
          <div>
            <button
              className="btn btn-primary"
              onClick={handleSubmit(this.onSubmit.bind(this))}
            >
              Purchase
            </button>{' '}
            <button
              className="btn btn-secondary"
              onClick={() => this.props.reset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStatesToProps = state => {
  return {
    auth: state.auth.authenticated,
    search: state.search,
    select: state.select
  };
};

export default connect(mapStatesToProps, {
  searchTrainList,
  createTransaction,
  clearSearch,
  showModal
})(
  reduxForm({
    form: 'addtrainlist'
  })(withRouter(AddTrain))
);
