import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOutUser } from '../../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signOutUser();
  }
  render() {
    return (
      <div>
        <p className="display-4 text-center">
          Thanks for visiting us <br />
          See you next time
        </p>
      </div>
    );
  }
}

export default connect(null, { signOutUser })(Signout);
