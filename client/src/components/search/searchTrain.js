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
    if (!(form.connections >= 0 && form.connections <= 2)) {
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
    let now = new Date();
    let thirtyDay = new Date();
    thirtyDay.setDate(now.getDate() + 30);

    if (form.goTime < now) {
      error.goLessThanNow = 'Can not searh go time less than now';
    }

    if (form.goTime > thirtyDay) {
      error.goGreaterThanThirdyDay =
        'Can not search go time greater than thirty days';
    }

    if (form.round) {
      if (!form.backTime) {
        error.backTime = 'Back time missing';
      }
      if (form.backTime < form.goTime) {
        // console.log('backTime < goTime');
        error.timeError = 'Back time is smaller than go time';
      }
      let sevenDay = new Date();
      sevenDay.setTime(sevenDay.getTime() + 7 * 24 * 60 * 60 * 1000);
      console.log(sevenDay);
      if (form.backTime > sevenDay) {
        // console.log('backTime < goTime');
        error.timeSevenError =
          'Back time is greater than go time for more than 7 days';
      }
      if (!form.backStartStation) {
        error.backStartStation = 'Back start station is missing';
      }
      if (!form.backEndStation) {
        error.backEndStation = 'Back end station is missing';
      }
      if (form.backTime > thirtyDay) {
        error.backGreaterThanThirdyDay =
          'Can not search back time greater than thirty days';
      }
    }
    return error;
  }

  onSubmit(searchTrain, formProps) {
    console.log(formProps);
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
      if (formProps.normal) {
        res.normal = formProps.normal;
      } else {
        res.normal = false;
      }
      if (formProps.fast) {
        res.fast = formProps.fast;
      } else {
        res.fast = false;
      }
      if (formProps.exactly) {
        res.exactly = formProps.exactly;
      } else {
        res.exactly = false;
      }
      res.connections = formProps.connections;
      console.log(res);
      this.props.searchTrainList(res);
    }
  }
  clearForm(event) {
    // event.preventDefault();
    this.props.reset('searchtrain');
  }

  render() {
    const { isRound, handleSubmit } = this.props;
    const searchTrain = true;
    const connections = [0, 1, 2];

    return (
      <div style={{ maxWidth: '500px' }}>
        <form>
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
                data={connections}
                name="connections"
                id="connections"
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
            <button
              className="search-btn"
              onClick={handleSubmit(this.onSubmit.bind(this, searchTrain))}
            >
              Search
            </button>{' '}
            <button className="search-btn" onClick={this.clearForm.bind(this)}>
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
