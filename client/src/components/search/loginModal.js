import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

import renderField from '../util/formHelper';
import { showModal, hideModal, signInUser, authError } from '../../actions';
import SignInUser from '../auth/signin';
import RenderAlert from '../auth/authAlert';

class LoginModal extends Component {
  handleFormSubmit({ userName, password }) {
    const error = validate({ userName, password });
    if (!_.isEmpty(error)) {
      this.props.dispatch(authError(error));
    } else {
      this.props.signInUser({ userName, password }, () =>
        this.props.hideModal()
      );
    }
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
    return (
      <div>
        <Modal
          isOpen={this.props.modal}
          toggle={this.toggle.bind(this)}
          className="modalSearchDialog"
        >
          <ModalHeader>Please Sign In</ModalHeader>
          <ModalBody>
            <SignInUser isInModal={true} toggle={this.props.hideModal} />
            <button
              className="btn btn-secondary"
              onClick={this.hideModal.bind(this)}
            >
              Cancel
            </button>
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
    errors.userName = 'Username required';
  }
  if (!value.password) {
    errors.password = 'Password required';
  }
  return errors;
};

export default connect(mapStateToProps, { showModal, hideModal, signInUser })(
  reduxForm({
    form: 'loginmodal'
  })(LoginModal)
);

/*
<form>
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
    onClick={handleSubmit(this.handleFormSubmit.bind(this))}
  >
    Sign In
  </button>{' '}
</form>;
*/

