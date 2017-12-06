import React, { Component } from 'react';
import { connect } from 'react-redux';

class RenderAlert extends Component {
  render() {
    if (!this.props.errorMessage) {
      return <div />;
    }
    return (
      <div className="alert alert-danger" style={{ maxWidth: '400px' }}>
        <strong>Oops! {this.props.errorMessage}</strong>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { errorMessage: state.search.error };
};

export default connect(mapStateToProps, null)(RenderAlert);
