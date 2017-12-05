import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DropdownList from 'react-widgets/lib/DropdownList';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import renderField from '../util/formHelper';
import renderSelectField from '../util/formSelectHelper';

import { searchTrainList, clearSearch } from '../../actions';

moment.locale('en');
momentLocalizer(moment);

const formatter = moment().format('MM DD YYYY, h:mm');

const renderDropdownList = ({ input, data, valueField, textField }) => (
  <DropdownList
    {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onChange={input.onChange}
  />
);

const renderSelectList = ({ input, data }) => (
  <SelectList {...input} onBlur={() => input.onBlur()} data={data} />
);

const renderDateTimePicker = ({ input: { onChange, value }, showTime }) => (
  <DateTimePicker
    onChange={onChange}
    format="DD MMM YYYY, hh:mm"
    time={showTime}
    value={!value ? null : new Date(value)}
  />
);

function formatTime(date) {
  const newTime = {};
  newTime.goYear = date.getFullYear();
  newTime.goMonth = date.getMonth();
  newTime.goDay = date.getDate();
  newTime.goHour = date.getHours();
  newTime.goMinute = date.getMinutes();
  return newTime;
}

class SearchTrain extends Component {
  componentWillMount() {
    this.props.clearSearch();
  }
  onSubmit(searchTrain, formProps) {
    if (formProps.goTime) {
      const newGoTime = formatTime(formProps.goTime);
      delete formProps.goTime;
      Object.assign(formProps, newGoTime);
    }

    if (formProps.backTime) {
      const newBackTime = formatTime(formProps.backTime);
      delete formProps.backTime;
      Object.assign(formProps, newBackTime);
    }

    if (searchTrain) {
      this.props.searchTrainList(formProps);
    }
  }
  onReset() {
    this.props.reset();
  }

  render() {
    const { isRound, handleSubmit } = this.props;
    const searchTrain = true;
    const station = ['1', '2', '3', '4'];
    const connection = [1, 2, 3];
    return (
      <div style={{ maxWidth: '500px' }}>
        <h3>Search</h3>
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
              className="btn btn-primary"
              onClick={handleSubmit(this.onSubmit.bind(this, searchTrain))}
            >
              Search
            </button>{' '}
            <button className="btn btn-secondary" onClick={this.props.reset}>
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
  { searchTrainList, clearSearch }
)(
  reduxForm({
    form: 'searchtrain'
  })(SearchTrain)
);
