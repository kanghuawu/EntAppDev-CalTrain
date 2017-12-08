import React, { Component } from 'react';
import axios from 'axios';

import { Button, Nav, NavItem, NavDropdown, MenuItem, Modal, Table } from 'react-bootstrap';

const ROOT_URL = "http://localhost:7000";

const modalStyle = {
    position: 'fixed',
    zIndex: 1040,
    top: 0, bottom: 0, left: 0, right: 0
};

const backdropStyle = {
    ...modalStyle,
    zIndex: 'auto',
    backgroundColor: '#000',
    opacity: 0.5
};

class Transaction extends React.Component {
    constructor(props) {
        super(props);

        this.updateState = this.updateState.bind(this);
        this.getTransactionData = this.getTransactionData.bind(this);
        this.processTransactionData = this.processTransactionData.bind(this);
        this.postCancelTransaction = this.postCancelTransaction.bind(this);
        this.processCancelTransactoin = this.processCancelTransactoin.bind(this);
        this.processCancelTransactoinError = this.processCancelTransactoinError.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.updateModal = this.updateModal.bind(this);

        this.state = {
            data: {
                fakeStart: this.getTransactionData(),
                showModal: false,
                modalTitle: "Modal Title",
                modalMessage: "Modal Message",
                transactionData: []
            }
        };

    }
    updateState(e) {
        let tempData = this.state.data;
        tempData[e.target.name] = e.target.value;
        this.setState({tempData});
    }
    getTransactionData(){
        let msg = "";
        axios.get(`${ROOT_URL}/api/transaction/check/` + localStorage.getItem('userName') +'/' + localStorage.getItem('password'))
            .then(this.processTransactionData)
            .catch(function (error) {
                console.log(error);
                msg = "fail!";
            });
    }
    processTransactionData(response){
        let tempData = this.state.data;
        console.log(response.data);
        if (response.data.result){
            tempData.transactionData = response.data.transactions;
            this.setState({tempData});
        }
    }
    postCancelTransaction(e){
        let msg = "";
        axios.get(`${ROOT_URL}/api/transaction/delete/` + localStorage.getItem('userName') +'/' + localStorage.getItem('password') +'/' +e.target.id)
            .then(this.processCancelTransactoin)
            .catch(function (error) {
                console.log(error);
                msg = "fail!";
            });
    }
    processCancelTransactoin(response){
        console.log(response);
        if (response.data.result){
            this.updateModal("Cancel Transaction", "Success!");
            this.showModal();
        }
        else {
            this.updateModal("Cancel Transaction Failed", response.data.reason);
            this.showModal();
        }
    }
    processCancelTransactoinError(error){
        this.updateModal("Cancel Transaction Failed: ERROR", [error.message]);
        this.showModal();
    }

    updateModal(title, message){
        let tempData = this.state.data;
        tempData.modalTitle = title;
        tempData.modalMessage = message;
        this.setState({tempData});
    }
    showModal() {
        let tempData = this.state.data;
        tempData.showModal = true;
        this.setState({tempData});
    }
    hideModal() {
        let tempData = this.state.data;
        tempData.showModal = false;
        this.setState({tempData});
    }

    render() {
        return (
            <div>
                <Modal
                    aria-labelledby='modal-label'
                    style={modalStyle}
                    backdropStyle={backdropStyle}
                    show={this.state.data.showModal}
                    onHide={this.hideModal}
                >
                    <div id="modelDialog" className="modalDialog" >
                        <h4 id='modal-label'>{this.state.data.modalTitle}</h4>
                        <p>{this.state.data.modalMessage}</p>
                    </div>
                </Modal>
                <TransactionResult
                    postCancelTransactionProp = {this.postCancelTransaction}
                    transactionDataProp = {this.state.data.transactionData}
                />
            </div>
        );
    }
}
class TransactionResult extends React.Component {
    render() {
        let rows = [];
        let userName = "";
        if (this.props.transactionDataProp.length >0){
            rows = [];
            userName = this.props.transactionDataProp[0].userName;
            let goRows = [];
            let goRowsCont = [];
            let backRows = [];
            let backRowsCont = [];
            let expired = false;
            this.props.transactionDataProp.forEach(function(transaction){
                if (typeof transaction.goSegments != "undefined"){
                    expired = false;
                    goRows = [];
                    goRowsCont = [];
                    transaction.goSegments.forEach(function(goSegment, i){
                        if (i ===0){
                            let dates = goSegment.startDay.split('-');
                            let times = goSegment.startTime.split(':');
                            let startDate = new Date(dates[0], dates[1], dates[2], times[0], times[1], "00");
                            let current = new Date();
                            current.setTime(current.getTime() + 3600000);
                            if (startDate < current){
                                expired = true;
                            }
                            goRows.push(
                                <td>{goSegment.trainName}</td>
                            );
                            goRows.push(
                                <td>{goSegment.fast ===true ? "Yes" : "No"}</td>
                            );
                            goRows.push(
                                <td>{goSegment.startDay}</td>
                            );
                            goRows.push(
                                <td>{goSegment.startTime}</td>
                            );
                            goRows.push(
                                <td>{goSegment.endDay}</td>
                            );
                            goRows.push(
                                <td>{goSegment.endTime}</td>
                            );
                            goRows.push(
                                <td>{goSegment.startStation}</td>
                            );
                            goRows.push(
                                <td>{goSegment.endStation}</td>
                            );
                            goRows.push(
                                <td>{goSegment.price}</td>
                            );
                            goRows.push(
                                <td>{goSegment.passengers}</td>
                            );
                        }
                        else {
                            goRowsCont.push(
                                <tr>
                                    <td/><td/><td/>
                                    <td>{goSegment.trainName}</td>
                                    <td>{goSegment.fast ===true ? "Yes" : "No"}</td>
                                    <td>{goSegment.startDay}</td>
                                    <td>{goSegment.startTime}</td>
                                    <td>{goSegment.endDay}</td>
                                    <td>{goSegment.endTime}</td>
                                    <td>{goSegment.startStation}</td>
                                    <td>{goSegment.endStation}</td>
                                    <td>{goSegment.price}</td>
                                    <td>{goSegment.passengers}</td>
                                </tr>
                            );
                        }

                    });
                }
                if (typeof transaction.backSegments != "undefined"){
                    backRows = [];
                    backRowsCont = [];
                    transaction.backSegments.forEach(function(backSegment, i){
                        if (i ===0){
                            backRows.push(
                                <td>{backSegment.trainName}</td>
                            );
                            backRows.push(
                                <td>{backSegment.fast ===true ? "Yes" : "No"}</td>
                            );
                            backRows.push(
                                <td>{backSegment.startDay}</td>
                            );
                            backRows.push(
                                <td>{backSegment.startTime}</td>
                            );
                            backRows.push(
                                <td>{backSegment.endDay}</td>
                            );
                            backRows.push(
                                <td>{backSegment.endTime}</td>
                            );
                            backRows.push(
                                <td>{backSegment.startStation}</td>
                            );
                            backRows.push(
                                <td>{backSegment.endStation}</td>
                            );
                            backRows.push(
                                <td>{backSegment.price}</td>
                            );
                            backRows.push(
                                <td>{backSegment.passengers}</td>
                            );
                        }
                        else {
                            backRowsCont.push(
                                <tr>
                                    <td/><td/><td/>
                                    <td>{backSegment.trainName}</td>
                                    <td>{backSegment.fast ===true ? "Yes" : "No"}</td>
                                    <td>{backSegment.startDay}</td>
                                    <td>{backSegment.startTime}</td>
                                    <td>{backSegment.endDay}</td>
                                    <td>{backSegment.endTime}</td>
                                    <td>{backSegment.startStation}</td>
                                    <td>{backSegment.endStation}</td>
                                    <td>{backSegment.price}</td>
                                    <td>{backSegment.passengers}</td>
                                </tr>
                            );
                        }
                    });
                }

                rows.push(
                    <tr>
                        <td>{transaction.round ===true ? "Yes" : "No"}</td>
                        <td>
                            {
                                expired ===true ?
                                    <Button className="expired-btn" disabled>Expired</Button>
                                    : (transaction.canceled ===true ?
                                    <Button bsStyle="danger" disabled>Canceled</Button>
                                    : <Button bsStyle="success" id={transaction.transactionId} onClick={ this.props.postCancelTransactionProp }>Cancel</Button>)}
                        </td>
                        <td>Forward</td>
                        {goRows}
                    </tr>
                );
                Array.prototype.push.apply(rows, goRowsCont);
                if (backRows.length >0){
                    rows.push(
                        <tr>
                            <td/><td/>
                            <td>Backward</td>
                            {backRows}
                        </tr>
                    );
                }
                Array.prototype.push.apply(rows, backRowsCont);
            }, this);
        }
        return (
            <div>
                <div className="transaction-table-title">Transaction Record</div>
                <div className="transaction-table-user">User Name:&nbsp;{userName}</div>
                <Table responsive className="transaction-table">
                    <thead>
                    <tr>
                        <th>Round Trip</th>
                        <th>Canceled</th>
                        <th>Forward/Backward</th>
                        <th>Train Name</th>
                        <th>fast</th>
                        <th>startDay</th>
                        <th>startTime</th>
                        <th>endDay</th>
                        <th>endTime</th>
                        <th>startStation</th>
                        <th>endStation</th>
                        <th>price</th>
                        <th>passengers</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default Transaction;