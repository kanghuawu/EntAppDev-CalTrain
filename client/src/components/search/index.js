import React from 'react';
import { Link } from 'react-router-dom';
import SearchTrain from './searchTrain';
import AddTrain from './addTrain';

export default () => {
  return (
    <div>
      <SearchTrain />
      <AddTrain />
    </div>
  );
};
