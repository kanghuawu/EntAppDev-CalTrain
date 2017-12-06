import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import RenderAlert from './authAlert';
import { signUpUser, clearAuthError } from '../../actions';
import renderField from '../util/formHelper';

class SignUp extends Component {
  handleFormSubmit(formProps) {
    this.props.signUpUser(formProps, () => this.props.history.push('/'));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div style={{ maxWidth: '500px' }}>
        <form
          className="sigin-form"
          onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        >
          <Field
            label="User Name"
            name="userName"
            placeholder="User Name"
            component={renderField}
            type="input"
          />
          <Field
            label="E-Mail"
            name="email"
            placeholder="E-Mail"
            component={renderField}
            type="email"
          />
          <Field
            label="Password"
            name="password"
            placeholder="Password"
            component={renderField}
            type="password"
          />
          <Field
            label="Confirm Password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            component={renderField}
            type="password"
          />
          <RenderAlert />
          <button action="submit" className="btn btn-primary">
            Sign up
          </button>
        </form>
      </div>
    );
  }
}

const validate = value => {
  const errors = {};
  if (!value.userName) {
    errors.userName = 'Please enter a user name';
  }
  if (!value.email) {
    errors.email = 'Please enter an email';
  }
  if (!value.password) {
    errors.password = 'Please enter a password';
  }
  if (!value.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }
  if (value.password != value.passwordConfirm) {
    errors.passwordConfirm = 'Password must match';
  }
  return errors;
};

export default connect(null, { signUpUser, clearAuthError })(
  reduxForm({
    form: 'signup',
    validate
  })(SignUp)
);
