import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signInUser, clearAuthError } from '../../actions';
import renderField from '../util/formHelper';

class SignIn extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signInUser({ email, password }, () =>
      this.props.history.push('/')
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
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>
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
