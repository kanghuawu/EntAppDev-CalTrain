import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import RenderAlert from './authAlert';
import { signUpUser, clearAuthError } from '../../actions';
import renderField from '../util/formHelper';
import { GoogleLogin } from 'react-google-login-component';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.responseGoogle = this.responseGoogle.bind(this);
    }

  handleFormSubmit(formProps) {
    this.props.signUpUser(formProps, () =>
      this.props.history.push('/transaction')
    );
  }
    responseGoogle(googleUser) {
        let id_token = googleUser.getAuthResponse().id_token;
        console.log({ accessToken: id_token });
        let profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        //anything else you want to do(save to localStorage)...
        this.props.signUpUser({userName: profile.getName(), email: profile.getEmail(), password: profile.getId()}, () =>
            this.props.history.push('/transaction')
        );
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
        <div>
          <GoogleLogin
            socialId="431809993276-gmbs36n9skqgmgdv73npia3g4h9l2909.apps.googleusercontent.com"
            className="google-login"
            scope="profile"
            fetchBasicProfile={true}
            responseHandler={this.responseGoogle}
            buttonText="Sign Up With Google"
          />
        </div>
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
