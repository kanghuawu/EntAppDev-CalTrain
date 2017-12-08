import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RenderAlert from './authAlert';
import { signInUser, clearAuthError } from '../../actions';
import renderField from '../util/formHelper';
import { GoogleLogin } from 'react-google-login-component';
import axios from "axios/index";

const ROOT_URL = "http://localhost:7000";

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
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    //anything else you want to do(save to localStorage)...
      axios
          .post(`${ROOT_URL}/api/user/google`, { userName: profile.getName, password: profile.getId(), email: profile.getEmail() })
          .then(response => {
              localStorage.setItem('userName', userName);
              localStorage.setItem('password', password);
              if (response.data.result) {
                  dispatch({ type: AUTH_USER });
                  if (callback) callback();
              } else {
                  dispatch(authError(response.data.reason));
              }
          })
          .catch(error => {
              console.log(error);
          });
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
            socialId="431809993276-gmbs36n9skqgmgdv73npia3g4h9l2909.apps.googleusercontent.com"
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
  if (!value.email) {
    errors.email = 'Required';
  }
  if (!value.password) {
    errors.password = 'Required';
  }
  return errors;
};

export default connect(null, { signInUser, clearAuthError })(
  reduxForm({
    form: 'signin',
    validate
  })(SignIn)
);
