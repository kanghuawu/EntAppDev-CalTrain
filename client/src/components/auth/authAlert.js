import React, { Component } from 'react';
import { connect } from 'react-redux';

class RenderAlert extends Component {
  render() {
    if (!this.props.errorMessage) {
      return <div />;
    }
    return (
      <div className="alert alert-danger">
        <strong>Oops!</strong>
        <p>{this.props.errorMessage}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

export default connect(mapStateToProps, null)(RenderAlert);
