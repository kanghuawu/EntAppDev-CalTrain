import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";

import { renderDropdownList, renderDateTimePicker } from "../util/reactWidgets";
import { searchTrainList, clearSearch } from "../../actions";
import station from "./stationList";

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

  onSubmit(searchTrain, formProps) {
    // console.log(formProps);
    if (searchTrain) {
      const res = {};
      if (formProps.goTime) {
        const newGoTime = this.formatGoTime(formProps.goTime);
        Object.assign(res, newGoTime);
      }

      if (formProps.backTime) {
        const newBackTime = this.formatBackTime(formProps.backTime);
        Object.assign(res, newBackTime);
      }
      console.log(res);
      this.props.searchTrainList(res);
    }
  }

  onReset() {
    this.props.reset();
  }

  render() {
    const { isRound, handleSubmit } = this.props;
    const searchTrain = true;
    const connection = [1, 2, 3];
    return (
      <div style={{ maxWidth: "500px" }}>
        <form>
          <div>
            <div>
              <label>Fast Train</label>{" "}
              <Field name="fast" id="fast" component="input" type="checkbox" />
            </div>
            <div>
              <label>Normal Train</label>{" "}
              <Field
                name="normal"
                id="normal"
                component="input"
                type="checkbox"
              />
            </div>
            <div>
              <label>Connection</label>{" "}
              <Field
                data={connection}
                name="connection"
                id="connection"
                component={renderDropdownList}
              />
            </div>
            <div>
              <label>Exactly</label>{" "}
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
              <label>Go Start Station</label>{" "}
              <Field
                data={station}
                name="goStartStation"
                id="goStartStation"
                component={renderDropdownList}
              />
            </div>
            <div>
              <label>Go End Station</label>{" "}
              <Field
                data={station}
                name="goEndStation"
                id="goEndStation"
                component={renderDropdownList}
              />
            </div>
            <div>
              <label>Round Trip</label>{" "}
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
                  <label>Back Start Station</label>{" "}
                  <Field
                    data={station}
                    name="backStartStation"
                    id="backStartStation"
                    component={renderDropdownList}
                  />
                </div>
                <div>
                  <label>Back End Station</label>{" "}
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
            </button>{" "}
            <button className="btn btn-secondary" onClick={this.props.reset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    );
  }
}
const selector = formValueSelector("searchtrain");

export default connect(
  state => ({
    isRound: selector(state, "round")
  }),
  { searchTrainList, clearSearch }
)(
  reduxForm({
    form: "searchtrain"
  })(SearchTrain)
);
