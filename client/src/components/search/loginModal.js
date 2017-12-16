import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import renderField from '../util/formHelper';
import { showModal, hideModal, signInUser } from '../../actions';
import SignInUser from '../auth/signin';
import RenderAlert from '../auth/authAlert';

class LoginModal extends Component {
  handleFormSubmit({ userName, password }) {
    this.props.signInUser({ userName, password }, () => this.props.hideModal());
  }

  hideModal(e) {
    e.preventDefault();
    this.props.hideModal();
  }

  toggle() {
    console.log('toggle');
    if (this.props.modal) {
      this.props.hideModal();
    } else {
      this.props.showModal();
    }
  }

  render() {
    const { handleSubmit } = this.props;
    console.log(this.props.modal);
    return (
      <div>
        <Modal
          isOpen={this.props.modal}
          toggle={() => this.props.showModal()}
          className="modalSearchDialog"
        >
          <ModalHeader>Please Sign In</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <Field
                label="User Name"
                name="userName"
                placeholder="User Name"
                component={renderField}
                type="input"
              />
              <Field
                label="Password"
                placeholder="Password"
                name="password"
                component={renderField}
                type="password"
              />
              <RenderAlert />
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleFormSubmit}
              >
                Sign In
              </button>{' '}
              <button
                className="btn btn-secondary"
                onClick={this.hideModal.bind(this)}
              >
                Cancel
              </button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    modal: state.modal.display
  };
}

const validate = value => {
  const errors = {};
  if (!value.userName) {
    errors.userName = 'Required';
  }
  if (!value.password) {
    errors.password = 'Required';
  }
  return errors;
};

export default connect(mapStateToProps, { showModal, hideModal, signInUser })(
  reduxForm({
    form: 'loginmodal',
    validate
  })(LoginModal)
);
