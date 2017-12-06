import { SHOW_MODAL, HIDE_MODAL } from '../actions';

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
    default:
      return state;
  }
};
