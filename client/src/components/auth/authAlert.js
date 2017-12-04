import React, { Component } from 'react';
import { connect } from 'react-redux';

class RenderAlert extends Component {
  render() {
    if (this.props.errorMessage.length === 0) {
      return <div />;
    }
    return (
      <div className="alert alert-danger">
        <strong>Oops!</strong>
        <ul>
          {this.props.errorMessage.map((error, index) => {
            return <li key={index}>{error}</li>;
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

export default connect(mapStateToProps, null)(RenderAlert);
