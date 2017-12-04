import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1 className="error">Hello World</h1>
        <Link to="/second">go to hello</Link>
      </div>
    );
  }
}
