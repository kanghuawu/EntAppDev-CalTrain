import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import Router from './components/router';
import { AUTH_USER } from './actions';
import '../style/style.css';
import 'react-widgets/dist/css/react-widgets.css';

const store = createStore(reducers, {}, applyMiddleware(thunk));
const userName = localStorage.getItem('userName');
const password = localStorage.getItem('password');

if (userName && password) {
  store.dispatch({ type: AUTH_USER });
}
// store.dispatch({ type: AUTH_USER });
ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.querySelector('#root')
);
