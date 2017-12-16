import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

import { hideErrorModal } from '../../actions';

class ErrorModal extends Component {
  renderError() {
    return _.map(this.props.msg, msg => {
      return <li key={msg}>{msg}</li>;
    });
  }

  hideModal(event) {
    this.props.hideErrorModal();
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} className="modalSearchDialog">
          <ModalHeader>Oops...</ModalHeader>
          <ModalBody>
            <ul>{this.renderError.bind(this)()}</ul>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-primary"
              onClick={this.hideModal.bind(this)}
            >
              OK
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapStatesToProps(state) {
  return {
    modal: state.modal.error,
    msg: state.modal.msg
  };
}

export default connect(mapStatesToProps, { hideErrorModal })(ErrorModal);
