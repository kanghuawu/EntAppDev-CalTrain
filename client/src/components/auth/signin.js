import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RenderAlert from './authAlert';
import { signInUser, signInGoogle, signInFacebook, clearAuthError } from '../../actions';
import renderField from '../util/formHelper';
import { GoogleLogin } from 'react-google-login-component';
import { FacebookLogin } from 'react-facebook-login-component';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }
  handleFormSubmit({ userName, password }) {
    this.props.signInUser({ userName, password }, () => {
      console.log(this.props.isInModal);
      if (!this.props.isInModal) {
        this.props.history.push('/transaction');
      } else {
        this.props.toggle();
      }
    });
  }

  responseGoogle(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    console.log({ accessToken: id_token });
    let profile = googleUser.getBasicProfile();
    //anything else you want to do(save to localStorage)...
    this.props.signInGoogle(
      {
        userName: profile.getName(),
        password: profile.getId(),
        email: profile.getEmail()
      },
      () => {
        if (!this.props.isInModal) {
          this.props.history.push('/transaction');
        } else {
          this.props.toggle();
        }
      }
    );
  }

  responseFacebook(response){
      console.log(response);
      this.props.signInFacebook(
          {
              userName: response.name,
              password: response.id,
              email: response.email
          },
          () => {
              if (!this.props.isInModal) {
                  this.props.history.push('/transaction');
              } else {
                  this.props.toggle();
              }
          }
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
            <FacebookLogin socialId="1751289778514200"
                           language="en_US"
                           scope="public_profile,email"
                           fields="email,name"
                           responseHandler={this.responseFacebook}
                           xfbml={true}
                           version="v2.5"
                           className="facebook-login"
                           buttonText="Facebook Login"/>
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

export default connect(null, { signInUser, signInGoogle, signInFacebook, clearAuthError })(
  reduxForm({
    form: 'signin',
    validate
  })(SignIn)
);
