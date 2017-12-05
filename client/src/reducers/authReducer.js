import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR
} from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: _.values(action.payload) };
    case CLEAR_AUTH_ERROR:
      return { ...state, error: [] };
    default:
      return { ...state, error: [] };
  }
};