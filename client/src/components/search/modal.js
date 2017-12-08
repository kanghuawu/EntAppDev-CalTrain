import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, change, Field } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import renderField from '../util/formHelper';
import { hideModal, signInUser } from '../../actions';
import SignInUser from '../auth/signin';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFormSubmit({ userName, password }) {
    this.props.signInUser({ userName, password }, () => this.props.hideModal());
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <Modal isOpen={this.props.modal}>
          <ModalHeader>Please Sign In</ModalHeader>
          <ModalBody>
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
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit(this.handleFormSubmit)}
              >
                Sign In
              </button>{' '}
              <button
                className="btn btn-secondary"
                onClick={this.props.hideModal}
              >
                Cancel
              </button>
            </form>
          </ModalBody>
          <ModalFooter />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state.modal);
  return {
    modal: state.modal.display
  };
}

export default connect(mapStateToProps, { hideModal, signInUser })(
  reduxForm({
    form: 'loginmodal'
  })(LoginModal)
);
