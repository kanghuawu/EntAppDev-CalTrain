import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector, reset } from 'redux-form';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import _ from 'lodash';

import { renderDropdownList, renderDateTimePicker } from '../util/reactWidgets';
import { searchTrainList, clearSearch, showErrorModal } from '../../actions';
import station from './stationList';

// moment.locale('en');
// momentLocalizer(moment);

class SearchTrain extends Component {
  formatGoTime(date) {
    const newTime = {};
    newTime.goYear = date.getFullYear();
    newTime.goMonth = date.getMonth() + 1;
    newTime.goDay = date.getDate();
    newTime.goHour = date.getHours();
    newTime.goMinute = date.getMinutes();
    return newTime;
  }

  formatBackTime(date) {
    const newTime = {};
    newTime.backYear = date.getFullYear();
    newTime.backMonth = date.getMonth() + 1;
    newTime.backDay = date.getDate();
    newTime.backHour = date.getHours();
    newTime.backMinute = date.getMinutes();
    return newTime;
  }

  validation(form) {
    const error = {};
    if (!form.normal && !form.fast) {
      error.normal = 'Select at least normal or fast';
    }
    if (!form.connection) {
      error.connection = 'Connection is missing';
    }
    if (!form.goStartStation) {
      error.goStartStation = 'Go start station is missing';
    }
    if (!form.goEndStation) {
      error.goEndStation = 'Go End station is missing';
    }
    if (!form.goTime) {
      error.goTime = 'Go time missing';
    }
    if (form.round) {
      if (!form.backStartStation) {
        error.backStartStation = 'Back start station is missing';
      }
      if (!form.backEndStation) {
        error.backEndStation = 'Back end station is missing';
      }
      if (!form.backTime) {
        error.backTime = 'Back time missing';
      }
    }
    return error;
  }

  onSubmit(searchTrain, formProps) {
    const error = this.validation(formProps);
    if (!_.isEmpty(error)) {
      this.props.showErrorModal(error);
      return;
    }
    if (searchTrain) {
      let res = {};
      if (formProps.goTime) {
        const newGoTime = this.formatGoTime(formProps.goTime);
        res = { ...res, ...newGoTime };
        res.round = false;
        res.goStartStation = formProps.goStartStation;
        res.goEndStation = formProps.goEndStation;
      }

      if (formProps.round) {
        const newBackTime = this.formatBackTime(formProps.backTime);
        res = { ...res, ...newBackTime };
        res.round = true;
        res.backStartStation = formProps.backStartStation;
        res.backEndStation = formProps.backEndStation;
      }
      this.props.searchTrainList(res);
    }
  }
  clearForm(event) {
    event.preventDefault();
    this.props.reset('searchtrain');
  }

  render() {
    const { isRound, handleSubmit } = this.props;
    const searchTrain = true;
    const connection = [1, 2, 3];

    return (
      <div style={{ maxWidth: '500px' }}>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this, searchTrain))}>
          <div>
            <div>
              <label>Fast Train</label>{' '}
              <Field name="fast" id="fast" component="input" type="checkbox" />
            </div>
            <div>
              <label>Normal Train</label>{' '}
              <Field
                name="normal"
                id="normal"
                component="input"
                type="checkbox"
              />
            </div>
            <div>
              <label>Connection</label>{' '}
              <Field
                data={connection}
                name="connection"
                id="connection"
                component={renderDropdownList}
              />
            </div>
            <div>
              <label>Exactly</label>{' '}
              <Field
                name="exactly"
                id="exactly"
                component="input"
                type="checkbox"
              />
            </div>
            <div>
              <label>Go Time</label>
              <Field
                name="goTime"
                showTime={true}
                id="goTime"
                component={renderDateTimePicker}
              />
            </div>
            <div>
              <label>Go Start Station</label>{' '}
              <Field
                data={station}
                name="goStartStation"
                id="goStartStation"
                component={renderDropdownList}
              />
            </div>
            <div>
              <label>Go End Station</label>{' '}
              <Field
                data={station}
                name="goEndStation"
                id="goEndStation"
                component={renderDropdownList}
              />
            </div>
            <div>
              <label>Round Trip</label>{' '}
              <Field
                name="round"
                id="round"
                component="input"
                type="checkbox"
              />
            </div>

            {isRound && (
              <div>
                <div>
                  <label>Back Time</label>
                  <Field
                    name="backTime"
                    id="backTime"
                    showTime={true}
                    component={renderDateTimePicker}
                  />
                </div>
                <div>
                  <label>Back Start Station</label>{' '}
                  <Field
                    data={station}
                    name="backStartStation"
                    id="backStartStation"
                    component={renderDropdownList}
                  />
                </div>
                <div>
                  <label>Back End Station</label>{' '}
                  <Field
                    data={station}
                    name="backEndStation"
                    id="backEndStation"
                    component={renderDropdownList}
                  />
                </div>
              </div>
            )}
          </div>
          <div>
            <button className="btn btn-primary" type="submit">
              Search
            </button>{' '}
            <button
              className="btn btn-secondary"
              onClick={this.clearForm.bind(this)}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    );
  }
}
const selector = formValueSelector('searchtrain');

export default connect(
  state => ({
    isRound: selector(state, 'round')
  }),
  { searchTrainList, clearSearch, showErrorModal }
)(
  reduxForm({
    form: 'searchtrain'
  })(SearchTrain)
);
