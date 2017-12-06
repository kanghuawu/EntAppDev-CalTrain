import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './authReducer';
import search from './searchReducer';
import modal from './modalReducer';

const rootReducer = combineReducers({
  form,
  auth,
  search,
  modal
});

export default rootReducer;
