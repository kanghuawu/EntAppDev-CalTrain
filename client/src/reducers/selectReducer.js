import _ from 'lodash';
import { SELECT_TRAIN, DESELECT_TRAIN, RESET_SELECTION } from '../actions';

export default (state = null, action) => {
  switch (action.type) {
    case SELECT_TRAIN:
      return action.payload;
    case DESELECT_TRAIN:
      return _.without(state, action.payload);
    case RESET_SELECTION:
      return null;
    default:
      return state;
  }
};
