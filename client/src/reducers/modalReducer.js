import {
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_ERROR_MODAL,
  HIDE_ERROR_MODAL
} from '../actions';

const initialState = {
  modalType: null,
  modalProps: {}
};

export default (state = {}, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return { display: true };
    case HIDE_MODAL:
      return { display: false };
    case SHOW_ERROR_MODAL:
      return { error: true, msg: action.payload };
    case HIDE_ERROR_MODAL:
      return { error: false };
    default:
      return state;
  }
};
