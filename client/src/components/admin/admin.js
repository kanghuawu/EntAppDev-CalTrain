import React, { Component } from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import axios from 'axios';
import {
    Button,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    Modal,
    Table
} from 'react-bootstrap';

// const ROOT_URL = 'http://localhost:7000';
const ROOT_URL = '';

const modalStyle = {
    position: 'fixed',
    zIndex: 1040,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
};

const backdropStyle = {
    ...modalStyle,
    zIndex: 'auto',
    backgroundColor: '#000',
    opacity: 0.5
};

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                showModal: false,
                modalTitle: 'Modal Title',
                modalSubTitle: 'Modal SubTitle',
                modalMessage: [],
                tabNumber: '1',
                cancelTrainName: '',
                trainName: '',
                direction: 'NB',
                dateTime: new Date(),
                resetNumber: 1000,
                srDirection: 'NB',
                systemReportTrainName: '',
                srData: [],
                srAllData: []
            }
        };
        this.updateState = this.updateState.bind(this);
        this.updateDateTime = this.updateDateTime.bind(this);
        this.updateRadio = this.updateRadio.bind(this);
        this.updateSubmitCancel = this.updateSubmitCancel.bind(this);
        this.processCancelResult = this.processCancelResult.bind(this);
        this.processCancelResultError = this.processCancelResultError.bind(
            this
        );
        this.updateSubmitReset = this.updateSubmitReset.bind(this);
        this.processResetResult = this.processResetResult.bind(this);
        this.processResetError = this.processResetError.bind(this);
        this.updateSubmitSystemReport = this.updateSubmitSystemReport.bind(
            this
        );
        this.processReportData = this.processReportData.bind(this);
        this.processAllData = this.processAllData.bind(this);
        this.processSystemReportError = this.processSystemReportError.bind(
            this
        );

        this.cleanUpUserInfo = this.cleanUpUserInfo.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.updateModal = this.updateModal.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    updateState(e) {
        let tempData = this.state.data;
        tempData[e.target.name] = e.target.value;
        this.setState({ tempData });
    }
    updateDateTime(date) {
        let current = new Date();
        current.setTime(current.getTime() + 3 * 3600000);
        if (date.valueOf() > current.valueOf()) {
            let tempData = this.state.data;
            tempData['dateTime'] = date;
            tempData['cancelTrainName'] =
                tempData['direction'] +
                ('0' + date.getHours()).slice(-2) +
                ('0' + date.getMinutes()).slice(-2);
            this.setState({ tempData });
            console.log(this.state.data);
        } else {
            console.log(
                "You can't cancel train within 3 hours or from the past."
            );
            console.log(date);
            console.log(current);
        }
    }
    updateRadio(e) {
        let tempData = this.state.data;
        tempData['direction'] = e.target.value;
        tempData['cancelTrainName'] =
            tempData['direction'] +
            ('0' + tempData['dateTime'].getHours()).slice(-2) +
            ('0' + tempData['dateTime'].getMinutes()).slice(-2);
        this.setState({ tempData });
    }
    updateSubmitCancel(e) {
        let current = new Date();
        current.setTime(current.getTime() + 3 * 3600000);
        if (
            typeof this.state.data.dateTime.getMonth === 'function' &&
            this.state.data.cancelTrainName.length === 6 &&
            this.state.data.dateTime > current
        ) {
            // Process Date for year month and day
            // Process with cancelTrainName
            let para = {
                trainName: this.state.data.cancelTrainName,
                year: this.state.data.dateTime.getFullYear(),
                month: this.state.data.dateTime.getMonth() + 1,
                day: this.state.data.dateTime.getDate()
            };

            axios
                .post(`${ROOT_URL}/api/cancel`, para)
                .then(this.processCancelResult)
                .catch(this.processCancelResultError);
        } else {
            this.updateModal('Cancel Train Result', 'Failed To Cancel', [
                'Invalid Date or Train Name'
            ]);
            this.showModal();
        }
    }
    processCancelResult(response) {
        let subTitle = '';
        let msg = [];

        if (response.data.result === true) {
            subTitle = 'Canceled User List\n';
            response.data.canceledUsers.forEach(function(user) {
                msg.push(
                    <div>
                        UserName: {user.userName} Eamil: {user.email}
                    </div>
                );
            });
        } else {
            subTitle = 'Failed To Cancel';
            msg.push(response.data.reason);
        }

        this.updateModal('Cancel Train', subTitle, msg);
        this.showModal();
    }
    processCancelResultError(error) {
        this.updateModal('Cancel Train', 'Failed To Cancel: ERROR', [
            error.message
        ]);
        this.showModal();
    }
    updateSubmitReset(e) {
        // Trigger resetNumber Validation
        let tempResetNumber = parseInt(this.state.data.resetNumber);
        if (Number.isInteger(tempResetNumber)) {
            // Validation pass, then send to reset API
            let msg = '';
            axios
                .get(`${ROOT_URL}/api/reset/` + tempResetNumber)
                .then(this.processResetResult)
                .catch(this.processResetError);
        } else {
            this.updateModal('Reset Ticket', 'Failed to Reset', [
                'Reset Number input is not a proper Integer: ' +
                    this.state.data.resetNumber
            ]);
            this.showModal();
        }
    }
    processResetResult(response) {
        let subTitle = '';
        let msg = [];

        if (response.data.result === true) {
            subTitle = 'Reset Result\n';
            msg.push('Success!');
        } else {
            subTitle = 'Failed to Reset';
            msg.push(response.data.reason);
        }

        this.updateModal('Reset Ticket', subTitle, msg);
        this.cleanUpUserInfo();
        this.showModal();
    }
    processResetError(error) {
        this.updateModal('Reset Ticket', 'Failed To Reset: ERROR', [
            error.message
        ]);
        this.cleanUpUserInfo();
        this.showModal();
    }
    updateSubmitSystemReport(e) {
        // Trigger resetNumber Validation
        let tempsystemReportTrainName = this.state.data.systemReportTrainName;
        if (
            tempsystemReportTrainName.length === 6 &&
            (tempsystemReportTrainName.startsWith('NB') ||
                tempsystemReportTrainName.startsWith('SB')) &&
            /^\d+$/.test(tempsystemReportTrainName.slice(-4)) &&
            tempsystemReportTrainName.charAt(2) +
                tempsystemReportTrainName.charAt(3) >=
                6 &&
            tempsystemReportTrainName.charAt(2) +
                tempsystemReportTrainName.charAt(3) <=
                21
        ) {
            // Validation pass, then send to API
            let msg = '';
            axios
                .get(
                    `${ROOT_URL}/api/report/train/` + tempsystemReportTrainName
                )
                .then(this.processReportData)
                .catch(this.processSystemReportError);
        } else if (
            tempsystemReportTrainName.length === 3 &&
            tempsystemReportTrainName.toLowerCase() === 'all'
        ) {
            // Report all
            let msg = '';
            axios
                .get(`${ROOT_URL}/api/report/system`)
                .then(this.processAllData)
                .catch(this.processSystemReportError);
        } else {
            this.updateModal('System Report', 'Failed generate Report', [
                'Invalid Train Name: ' + this.state.data.systemReportTrainName
            ]);
            this.showModal();
        }
    }
    processReportData(response) {
        let tempData = this.state.data;
        tempData.srData = response.data;
        tempData.srAllData = [];
        this.setState({ tempData });
    }
    processAllData(response) {
        let tempData = this.state.data;
        tempData.srAllData = response.data;
        tempData.srData = [];
        this.setState({ tempData });
    }
    processSystemReportError(error) {
        this.updateModal('System Report', 'Failed generate Report: ERROR', [
            error.message
        ]);
        this.showModal();
    }
    cleanUpUserInfo() {
        localStorage.clear();
    }
    updateModal(title, subTitle, message) {
        let tempData = this.state.data;
        tempData.modalTitle = title;
        tempData.modalSubTitle = subTitle;
        tempData.modalMessage = message;
        this.setState({ tempData });
    }
    showModal() {
        let tempData = this.state.data;
        tempData.showModal = true;
        this.setState({ tempData });
    }
    hideModal() {
        let tempData = this.state.data;
        tempData.showModal = false;
        this.setState({ tempData });
        window.location.reload();
    }
    handleSelect(eventKey) {
        event.preventDefault();
        let tempData = this.state.data;
        tempData.tabNumber = `${eventKey}`;
        this.setState({ tempData });
    }
    render() {
        return (
            <div className="nav-admin-main">
                <div className="nav-admin-tabs">
                    <Nav
                        className="nav-admin"
                        bsStyle="pills"
                        stacked
                        onSelect={this.handleSelect}
                    >
                        <NavItem eventKey={1}>Cancel Train</NavItem>
                        <NavItem eventKey={2}>Reset Ticket Number</NavItem>
                        <NavItem eventKey={3}>System Report</NavItem>
                    </Nav>
                </div>
                <Modal
                    aria-labelledby="modal-label"
                    style={modalStyle}
                    backdropStyle={backdropStyle}
                    show={this.state.data.showModal}
                    onHide={this.hideModal}
                >
                    <div id="modelDialog" className="modalDialog">
                        <h4 id="modal-label">{this.state.data.modalTitle}</h4>
                        <h5 id="modal-label">
                            {this.state.data.modalSubTitle}
                        </h5>
                        <p>{this.state.data.modalMessage}</p>
                    </div>
                </Modal>
                {this.state.data.tabNumber === '1' ? (
                    <div className="nav-admin-content">
                        <CancelTrain
                            updateStateProp={this.updateState}
                            updateDateTimeProp={this.updateDateTime}
                            updateRadioProp={this.updateRadio}
                            updateSubmitCancelProp={this.updateSubmitCancel}
                            cancelTrainNameProp={
                                this.state.data.cancelTrainName
                            }
                            dateTimeProp={this.state.data.dateTime}
                        />
                    </div>
                ) : this.state.data.tabNumber === '2' ? (
                    <div className="nav-admin-content">
                        <ResetNumber
                            updateStateProp={this.updateState}
                            updateSubmitResetProp={this.updateSubmitReset}
                            resetNumberProp={this.state.data.resetNumber}
                        />
                    </div>
                ) : (
                    <div className="nav-admin-content">
                        <SystemReport
                            updateStateProp={this.updateState}
                            updateSubmitSystemReportProp={
                                this.updateSubmitSystemReport
                            }
                            systemReportcancelTrainNameProp={
                                this.state.data.systemReportTrainName
                            }
                            srDataProp={this.state.data.srData}
                            srAllDataProp={this.state.data.srAllData}
                        />
                    </div>
                )}
            </div>
        );
    }
}
class CancelTrain extends React.Component {
    render() {
        return (
            <div>
                <div className="admin-content-title">Cancel Train</div>
                <div className="admin-content-task">
                    Date&Time:&nbsp;
                    <DateTimePicker
                        name="dateTime"
                        format="DD-MM-YYYY, HH:mm"
                        step={15}
                        onChange={this.props.updateDateTimeProp}
                    />
                </div>
                <div className="admin-content-task">
                    <input
                        type="radio"
                        name="direction"
                        value="NB"
                        onChange={this.props.updateRadioProp}
                    />{' '}
                    NB&nbsp;
                    <input
                        type="radio"
                        name="direction"
                        value="SB"
                        onChange={this.props.updateRadioProp}
                    />{' '}
                    SB<br />
                </div>
                <div className="admin-content-task group-item">
                    Train Name:&nbsp;
                    <input
                        type="text"
                        name="trainName"
                        value={this.props.cancelTrainNameProp}
                        disabled
                    />
                </div>
                <button
                    className="submit-btn group-item"
                    name="submitCancel"
                    onClick={this.props.updateSubmitCancelProp}
                >
                    Submit
                </button>
            </div>
        );
    }
}
class ResetNumber extends React.Component {
    render() {
        return (
            <div>
                <div className="admin-content-title">Reset Ticket of Train</div>
                <div className="admin-content-task group-item">
                    Please input the reset number for train ticket (5 ~
                    1000):&nbsp;
                    <input
                        type="number"
                        min="5"
                        max="1000"
                        name="resetNumber"
                        value={this.props.resetNumberProp}
                        onChange={this.props.updateStateProp}
                    />
                </div>
                <button
                    className="submit-btn group-item"
                    name="submitReset"
                    onClick={this.props.updateSubmitResetProp}
                >
                    Submit
                </button>
            </div>
        );
    }
}
class SystemReport extends React.Component {
    render() {
        let rows = [];
        let title = '';
        if (this.props.srAllDataProp.length > 0) {
            rows = [];
            title = 'Report for all Trains';
            this.props.srAllDataProp.forEach(function(train) {
                rows.push(
                    <tr>
                        <td key="TrainName">{train.trainName}</td>
                        <td key="LeftDays">{train.leftDays}</td>
                    </tr>
                );
            });
        }
        if (this.props.srDataProp.length > 0) {
            rows = [];
            title = 'Report of ' + this.props.systemReportcancelTrainNameProp;
            this.props.srDataProp.forEach(function(train) {
                rows.push(
                    <tr>
                        <td key="Date">{train.date}</td>
                        <td key="Canceled">
                            {train.canceled === true ? 'Yes' : 'No'}
                        </td>
                        <td key="AB">{train.AB}</td>
                        <td key="BC">{train.BC}</td>
                        <td key="CD">{train.CD}</td>
                        <td key="DE">{train.DE}</td>
                        <td key="EF">{train.EF}</td>
                        <td key="FG">{train.FG}</td>
                        <td key="GH">{train.GH}</td>
                        <td key="HI">{train.HI}</td>
                        <td key="IJ">{train.IJ}</td>
                        <td key="JK">{train.JK}</td>

                        <td key="KL">{train.KL}</td>
                        <td key="LM">{train.LM}</td>
                        <td key="MN">{train.MN}</td>
                        <td key="NO">{train.NO}</td>
                        <td key="OP">{train.OP}</td>
                        <td key="PQ">{train.PQ}</td>
                        <td key="QR">{train.QR}</td>
                        <td key="RS">{train.RS}</td>
                        <td key="ST">{train.ST}</td>
                        <td key="TU">{train.TU}</td>

                        <td key="UV">{train.UV}</td>
                        <td key="VW">{train.VW}</td>
                        <td key="WX">{train.WX}</td>
                        <td key="XY">{train.XY}</td>
                        <td key="YZ">{train.YZ}</td>
                    </tr>
                );
            });
        }
        return (
            <div>
                <div className="admin-content-title">System Report</div>
                <div className="admin-content-task">
                    Please enter the proper train name. Type "all" for all
                    trains
                    <input
                        type="text"
                        name="systemReportTrainName"
                        value={this.props.systemReportcancelTrainNameProp}
                        onChange={this.props.updateStateProp}
                    />
                </div>
                <button
                    className="submit-btn"
                    name="submitSystemReport"
                    onClick={this.props.updateSubmitSystemReportProp}
                >
                    Submit
                </button>
                {this.props.srDataProp.length > 0 ? (
                    <div className="admin-content-task">
                        <div className="admin-table-title">{title}</div>
                        <Table
                            className="admin-table"
                            striped
                            bordered
                            condensed
                            hover
                        >
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Canceled</th>
                                    <th>AB</th>
                                    <th>BC</th>
                                    <th>CD</th>
                                    <th>DE</th>
                                    <th>EF</th>
                                    <th>FG</th>
                                    <th>GH</th>
                                    <th>HI</th>
                                    <th>IJ</th>
                                    <th>JK</th>
                                    <th>KL</th>
                                    <th>LM</th>
                                    <th>MN</th>
                                    <th>NO</th>
                                    <th>OP</th>
                                    <th>PQ</th>
                                    <th>QR</th>
                                    <th>RS</th>
                                    <th>ST</th>
                                    <th>TU</th>
                                    <th>UV</th>
                                    <th>VW</th>
                                    <th>WX</th>
                                    <th>XY</th>
                                    <th>YZ</th>
                                </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                        </Table>
                    </div>
                ) : this.props.srAllDataProp.length > 0 ? (
                    <div className="admin-content-task">
                        <div className="admin-table-title">{title}</div>
                        <Table
                            className="admin-table"
                            striped
                            bordered
                            condensed
                            hover
                        >
                            <thead>
                                <tr>
                                    <th>Train Name</th>
                                    <th>Left Days</th>
                                </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                        </Table>
                    </div>
                ) : (
                    <div className="admin-content-task">
                        <br />
                        No Results
                    </div>
                )}
            </div>
        );
    }
}
export default Admin;
