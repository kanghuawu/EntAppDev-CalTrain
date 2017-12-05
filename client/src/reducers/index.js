import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './authReducer';
import search from './searchReducer';
import select from './selectReducer';

const rootReducer = combineReducers({
  form,
  auth,
  search,
  select
});

export default rootReducer;
