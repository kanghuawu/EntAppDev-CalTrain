import axios from 'axios';

// const ROOT_URL = 'http://localhost:7000';
const ROOT_URL = '';

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

export const SHOW_MODAL = 'show_modal';
export const HIDE_MODAL = 'hide_modal';

export const SHOW_ERROR_MODAL = 'show_error_modal';
export const HIDE_ERROR_MODAL = 'hide_error_modal';

export const CREATE_TRANSACTION = 'create_transaction';
export const TXN_ERROR = 'txn_error';

export const signInUser = ({ userName, password }, callback) => {
  // console.log('singsing');
  return dispatch => {
    axios
      .post(`${ROOT_URL}/api/user/authenticate`, { userName, password })
      .then(response => {
        if (response.data.result) {
          localStorage.setItem('userName', userName);
          localStorage.setItem('password', password);
          dispatch({ type: AUTH_USER });
          dispatch({ type: CLEAR_AUTH_ERROR });
          if (callback) callback();
        } else {
          dispatch(authError(response.data.reason));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const signInGoogle = ({ userName, password, email }, callback) => {
  console.log('google_google');
  return dispatch => {
    axios
      .post(`${ROOT_URL}/api/user/google`, { userName, password, email })
      .then(response => {
        if (response.data.result) {
          localStorage.setItem('userName', userName);
          localStorage.setItem('password', password);
          dispatch({ type: AUTH_USER });
          dispatch({ type: CLEAR_AUTH_ERROR });
          if (callback) callback();
        } else {
          dispatch(authError(response.data.reason));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const signInFacebook = ({ userName, password, email }, callback) => {
  console.log('facebook_facebook');
  return dispatch => {
    axios
      .post(`${ROOT_URL}/api/user/google`, { userName, password, email })
      .then(response => {
        if (response.data.result) {
          localStorage.setItem('userName', userName);
          localStorage.setItem('password', password);
          dispatch({ type: AUTH_USER });
          dispatch({ type: CLEAR_AUTH_ERROR });
          if (callback) callback();
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
        if (response.data.result) {
          localStorage.setItem('userName', userName);
          localStorage.setItem('password', password);
          dispatch({ type: AUTH_USER });
          dispatch({ type: CLEAR_AUTH_ERROR });
          if (callback) callback();
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

// export const selectTrain = id => {
//   return { type: SELECT_TRAIN, payload: id };
// };

// export const deselectTrain = id => {
//   return { type: DESELECT_TRAIN, payload: id };
// };

// export const resetSelection = id => dispatch => {
//   return { type: RESET_SELECTION };
// };

// export const addTrainList = trainList => {
//   console.log(trainList);
//   return dispatch => {
//     axios
//       .post(`${ROOT_URL}/api/Trains/mylist/add/`, trainList)
//       .then(response => {
//         dispatch({ type: DESELECT_SEARCH, payload: trainList });
//       })
//       .then(() => {
//         dispatch({ type: RESET_SELECTION });
//       })
//       .catch(response => {
//         console.log(response);
//       });
//   };
// };

export const showModal = () => {
  return dispatch => dispatch({ type: SHOW_MODAL });
};

export const hideModal = () => {
  return dispatch => dispatch({ type: HIDE_MODAL });
};

export const showErrorModal = msg => {
  return dispatch => dispatch({ type: SHOW_ERROR_MODAL, payload: msg });
};

export const hideErrorModal = () => {
  return dispatch => dispatch({ type: HIDE_ERROR_MODAL });
};

export const createTransaction = (data, callback) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/api/transaction/create`, data).then(response => {
      // console.log(response);
      if (response.data.result) {
        callback();
        dispatch({ type: CLEAR_SEARCH });
      } else {
        dispatch(txnError(response.data.reason));
      }
    });
  };
};

export const txnError = error => {
  return {
    type: TXN_ERROR,
    payload: error
  };
};

// export const clearForm = (formName) => {
//   return dispatch => dispatch(reset)
// }

export const REPORT_ONE = 'report_one';
export const generateReportOne = data => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/api/report/perTrain`, data)
      .then(response => {
        dispatch({ type: REPORT_ONE, payload: response.data.rate });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const REPORT_TWO = 'report_two';
export const generateReportTwo = data => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/api/report/whole`, data)
      .then(response => {
        dispatch({ type: REPORT_TWO, payload: response.data.rate });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const REPORT_THREE = 'report_three';
export const generateReportThree = data => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/api/report/state`, data)
      .then(response => {
        dispatch({ type: REPORT_THREE, payload: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const CLEAR_REPORT = 'clear_report';
