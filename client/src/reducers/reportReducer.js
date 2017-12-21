import { REPORT_ONE, REPORT_TWO, REPORT_THREE, CLEAR_REPORT } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case REPORT_ONE:
      return { ...state, one: action.payload };
    case REPORT_TWO:
      return { ...state, two: action.payload };
    case REPORT_THREE:
      return { ...state, three: action.payload };
    case CLEAR_REPORT:
      return {};
    default:
      return {};
  }
};
