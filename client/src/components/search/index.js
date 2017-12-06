import React from 'react';
import { Link } from 'react-router-dom';
import SearchTrain from './searchTrain';
import AddTrain from './addTrain';

export default () => {
  return (
    <div style={{ marginBottom: '300px' }}>
      <h1>Search</h1>
      <SearchTrain />
      <hr />
      <h1>Result</h1>
      <AddTrain />
    </div>
  );
};
