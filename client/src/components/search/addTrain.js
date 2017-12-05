import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import SignIn from '../auth/signin';

import {
  selectTrain,
  deselectTrain,
  resetSelection,
  addTrainList
} from '../../actions';

class AddTrain extends Component {
  constructor(props) {
    super(props);
    this.renderTrip = this.renderTrip.bind(this);
    this.renderSegment = this.renderSegment.bind(this);

    this.state = {
      passwordModal: false
    };

    this.passwordToggle = this.passwordToggle.bind(this);
    this.updateMyPassword = this.updateMyPassword.bind(this);
  }

  passwordToggle() {
    this.setState({
      passwordModal: !this.state.passwordModal
    });
  }

  updateMyPassword() {
    this.refs.password.getWrappedInstance().submit();
  }

  submitPassword(values) {
    console.log(this.props);
  }

  onClick(id) {
    console.log(this.props.auth);
    if (this.props.auth) {
      this.props.addTrainList(id);
    } else {
      this.passwordToggle();
    }
  }

  onChange(id) {
    this.props.selectTrain(id);
  }
  renderSegment(segment) {
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

  renderTrip(trainTrip) {
    const passengers = [1, 2, 3, 4];
    return trainTrip.map(trip => {
      return (
        <li className="list-group-item" key={trip.trip_id}>
          <Field
            name="trip"
            component="input"
            type="radio"
            value={trip.trip_id}
            onChange={() => this.onChange(trip.trip_id)}
          />
          <table>
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
        </li>
      );
    });
  }

  render() {
    if (this.props.search == null) {
      return <div>Loading...</div>;
    }
    const { goTripInfoAggregation } = this.props.search;
    return (
      <div>
        <h3>Result</h3>
        {goTripInfoAggregation &&
        goTripInfoAggregation.normal && (
          <div>
            <h4>Normal Train</h4>
            <ul>{this.renderTrip(goTripInfoAggregation.normalTrainTrips)}</ul>
          </div>
        )}
        {goTripInfoAggregation &&
        goTripInfoAggregation.fast && (
          <div>
            <h4>Normal Train</h4>
            <ul>{this.renderTrip(goTripInfoAggregation.fastTrainTrips)}</ul>
          </div>
        )}
        <div>
          <Field name="passengers" component="select">
            <option />
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </Field>
        </div>
        <button
          className="btn btn-primary"
          disabled={!this.props.select}
          onClick={() => this.onClick(this.props.select)}
        >
          Purchase
        </button>
        <div>
          <Modal
            isOpen={this.state.passwordModal}
            toggle={this.passwordToggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.passwordToggle}>
              Update Password
            </ModalHeader>
            <ModalBody>
              <SignIn
                ref={'password'}
                onSubmit={this.submitPassword.bind(this)}
              />
            </ModalBody>
            <ModalFooter>
              <button
                className="btn profile-btn"
                onClick={this.updateMyPassword}
              >
                Update
              </button>{' '}
              <Button color="secondary" onClick={this.passwordToggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = state => {
  return {
    auth: state.authenticated,
    search: state.search,
    select: state.select
  };
};

export default connect(mapStatesToProps, {
  addTrainList,
  selectTrain,
  deselectTrain,
  resetSelection
})(
  reduxForm({
    form: 'addtrainlist'
  })(AddTrain)
);
