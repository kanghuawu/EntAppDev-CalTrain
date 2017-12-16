import React from 'react';
import { Link } from 'react-router-dom';
import SearchTrain from './searchTrain';
import AddTrain from './addTrain';
import LoginModal from './loginModal';
import ErrorModal from './errorModal';

export default () => {
  return (
    <div style={{ marginBottom: '300px' }}>
      <LoginModal />
      <ErrorModal />
      <div className="row">
        <div className="col-3">
          <h1>Search</h1>
          <SearchTrain />
        </div>
        <div className="col-8">
          <h1>Result</h1>
          <AddTrain />
        </div>
      </div>
    </div>
  );
};
