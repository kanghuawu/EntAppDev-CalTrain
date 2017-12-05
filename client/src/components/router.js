import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './header';
import Signup from './auth/signup';
import Signin from './auth/signin';
import Signout from './auth/signout';
import RequireAuth from './auth/requireAuth';
import Search from './search';
import App from './app';

export default () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <div style={{ marginTop: '30px' }}>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/signout" component={Signout} />
            <Route path="/search" component={Search} />
            <Route path="/" component={App} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};
