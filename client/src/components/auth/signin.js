import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RenderAlert from './authAlert';
import { signInUser, signInGoogle, clearAuthError } from '../../actions';
import renderField from '../util/formHelper';
import { GoogleLogin } from 'react-google-login-component';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
  }
  handleFormSubmit({ userName, password }) {
    this.props.signInUser({ userName, password }, () =>
      this.props.history.push('/transaction')
    );
  }

  responseGoogle(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    console.log({ accessToken: id_token });
    let profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    //anything else you want to do(save to localStorage)...
    this.props.signInGoogle(
      {
        userName: profile.getName(),
        password: profile.getId(),
        email: profile.getEmail()
      },
      () => this.props.history.push('/transaction')
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
            label="Password"
            placeholder="Password"
            name="password"
            component={renderField}
            type="password"
          />
          <button type="submit" className="login-btn">
            Sign In
          </button>
          <GoogleLogin
            socialId="877820270659-q57dfenenfg5rm30rkpp6cvm292m4aia.apps.googleusercontent.com"
            className="google-login"
            scope="profile"
            fetchBasicProfile={true}
            responseHandler={this.responseGoogle}
            buttonText="Google Login"
          />
        </form>
        <RenderAlert />
        <div>
          <Link to="/signup" className="create-new-account">
            Create New Account
          </Link>
        </div>
      </div>
    );
  }
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

export default connect(null, { signInUser, signInGoogle, clearAuthError })(
  reduxForm({
    form: 'signin',
    validate
  })(SignIn)
);
