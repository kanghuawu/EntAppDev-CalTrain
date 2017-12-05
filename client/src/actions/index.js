import axios from 'axios';

const ROOT_URL = 'http://localhost:7000';

export const AUTH_USER = 'auth_user';
export const UNAUTH_USER = 'unauth_user';
export const AUTH_ERROR = 'auth_error';
export const CLEAR_AUTH_ERROR = 'clear_auth_error';

export const SEARCH_LIST = 'search_list';
export const DESELECT_SEARCH = 'deselect_search';
export const CLEAR_SEARCH = 'clear_search';

export const SELECT_TRAIN = 'select_train';
export const DESELECT_TRAIN = 'deselect_train';
export const RESET_SELECTION = 'reset_selection';

export const signInUser = ({ userName, password }, callback) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/api/user/authenticate`, { userName, password })
      .then(response => {
        localStorage.setItem('userName', userName);
        localStorage.setItem('password', password);
        console.log(response);
        if (response.data.result) {
          dispatch({ type: AUTH_USER });
          callback();
        } else {
          dispatch(authError(response.data.reason));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const signUpUser = ({ userName, email, password }, callback) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/api/user/register`, { userName, email, password })
      .then(response => {
        localStorage.setItem('userName', userName);
        localStorage.setItem('password', password);
        if (response.data.result) {
          dispatch({ type: AUTH_USER });
          callback();
        } else {
          dispatch(authError(response.data.reason));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const signOutUser = () => {
  localStorage.removeItem('userName');
  localStorage.removeItem('password');
  return { type: UNAUTH_USER };
};

export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};

export const searchTrainList = data => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/api/search/Trip`, data)
      .then(response => {
        // console.log(response.data);
        dispatch({
          type: SEARCH_LIST,
          payload: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const clearSearch = () => {
  return dispatch => dispatch({ type: CLEAR_SEARCH });
};

export const selectTrain = id => {
  return { type: SELECT_TRAIN, payload: id };
};

export const deselectTrain = id => {
  return { type: DESELECT_TRAIN, payload: id };
};

export const resetSelection = id => dispatch => {
  return { type: RESET_SELECTION };
};

export const addTrainList = trainList => {
  console.log(trainList);
  return dispatch => {
    axios
      .post(`${ROOT_URL}/api/Trains/mylist/add/`, trainList)
      .then(response => {
        dispatch({ type: DESELECT_SEARCH, payload: trainList });
      })
      .then(() => {
        dispatch({ type: RESET_SELECTION });
      })
      .catch(response => {
        console.log(response);
      });
  };
};
