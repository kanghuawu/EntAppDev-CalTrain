import React, { Component } from 'react';
import axios from 'axios';

import { Button, Nav, NavItem, NavDropdown, MenuItem, Modal, Table } from 'react-bootstrap';

const ROOT_URL = "http://localhost:7000";

class Transaction extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                showModal: false,
                modalTitle: "Modal Title",
                modalMessage: "Modal Message",
                tabNumber: "1",
                trainName: "",
                direction: "NB",
                dateTime: new Date(),
                resetNumber : 1000,
                srDirection: "NB",
                srTrainName: "",
                srData: [],
                srAllData: []
            }
        };
        this.updateState = this.updateState.bind(this);
    }
    updateState(e) {
        let tempData = this.state.data;
        tempData[e.target.name] = e.target.value;
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
                    <div style={dialogStyle()} >
                        <h4 id='modal-label'>{this.state.data.modalTitle}</h4>
                        <p>{this.state.data.modalMessage}</p>
                    </div>
                </Modal>

            </div>
        );
    }
}
export default Transaction;