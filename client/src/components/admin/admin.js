import React, { Component } from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import axios from 'axios';

const ROOT_URL = "http://localhost:7000";

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                trainName: "",
                direction: "NB",
                dateTime: new Date(),
                resetNumber : 1000
            }
        };
        this.updateState = this.updateState.bind(this);
        this.updateDateTime = this.updateDateTime.bind(this);
        this.updateRadio = this.updateRadio.bind(this);
        this.updateSubmitReset = this.updateSubmitReset.bind(this);
        this.updateSubmitCancel = this.updateSubmitCancel.bind(this);
    }
    updateState(e) {
        let tempData = this.state.data;
        tempData[e.target.name] = e.target.value;
        this.setState({tempData});
        console.log(this.state.data);
    }
    updateDateTime(date) {
        let current = new Date();
        current.setTime(current.getTime() + 3*3600000);
        if (date.valueOf() > current.valueOf()){
            let tempData = this.state.data;
            tempData['dateTime'] = date;
            tempData['trainName'] = tempData['direction'] + ('0' + date.getHours()).slice(-2) + ('0' + date.getMinutes()).slice(-2);
            this.setState({tempData});
            console.log(this.state.data);
        }
        else {
            console.log("You can't cancel train within 3 hours or from the past.");
            console.log(date);
            console.log(current);
        }
    }
    updateRadio(e){
        let tempData = this.state.data;
        tempData['direction'] = e.target.value;
        tempData['trainName'] = tempData['direction'] + ('0' + tempData['dateTime'].getHours()).slice(-2) + ('0' + tempData['dateTime'].getMinutes()).slice(-2);
        this.setState({tempData});
    }
    updateSubmitCancel(e) {
        // Trigger resetNumber Validation
        let tempResetNumber = parseInt(this.state.data.resetNumber);
        if (Number.isInteger(tempResetNumber)){
            // Validation pass, then send to reset API
            axios.get(`${ROOT_URL}/api/reset/` + tempResetNumber)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            console.log("Reset Number input is not an Integer: " + this.state.data.resetNumber);
        }
    }
    updateSubmitReset(e) {
        // Trigger resetNumber Validation
        let tempResetNumber = parseInt(this.state.data.resetNumber);
        if (Number.isInteger(tempResetNumber)){
            // Validation pass, then send to reset API
            axios.get(`${ROOT_URL}/api/reset/` + tempResetNumber)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            console.log("Reset Number input is not an Integer: " + this.state.data.resetNumber);
        }
    }
    render() {
        return (
            <div>
            <CancelTrain
        updateStateProp = {this.updateState}
        updateDateTimeProp = {this.updateDateTime}
        updateRadioProp = {this.updateRadio}
        updateSubmitCancelProp = {this.updateSubmitCancel}
        trainNameProp = {this.state.data.trainName}
        dateTimeProp = {this.state.data.dateTime}
        />
        <ResetNumber
        updateStateProp = {this.updateState}
        updateSubmitResetProp = {this.updateSubmitReset}
        resetNumberProp = {this.state.data.resetNumber}
        />
        </div>
    );
    }
}
class CancelTrain extends React.Component {
    render() {
        return (
            <div>
            Cancel Train
        <br/>
        Date&Time:&nbsp;
    <DateTimePicker
        name="dateTime"
        format="DD-MM-YYYY, HH:mm"
        step={15}
        onChange = {this.props.updateDateTimeProp}
        />
        <input type="radio" name="direction" value="NB" onChange = {this.props.updateRadioProp} /> NB&nbsp;
        <input type="radio" name="direction" value="SB" onChange = {this.props.updateRadioProp} /> SB<br/>
        Train Name:&nbsp;
    <input type = "text"
        name = "trainName"
        value = {this.props.trainNameProp }
        disabled
        />
        <br/>
        <button name = "submitCancel" onClick = {this.props.updateSubmitCancelProp}>Submit</button>
        </div>
    );
    }
}
class ResetNumber extends React.Component {
    render() {
        return (
            <div>
            Please input the reset number for train ticket (5 ~ 1000):&nbsp;
    <input  type = "number"
        min="5"
        max="1000"
        name = "resetNumber"
        value = {this.props.resetNumberProp}
        onChange = {this.props.updateStateProp}
        />
        <br/>
        <button name = "submitReset" onClick = {this.props.updateSubmitResetProp}>Submit</button>

        </div>
    );
    }
}
class SystemReport extends React.Component {

}
export default Admin;

