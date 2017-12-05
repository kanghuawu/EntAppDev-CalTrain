import _ from 'lodash';
import { SEARCH_LIST, DESELECT_SEARCH, CLEAR_SEARCH } from '../actions';

const guid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
};

export default (state = {}, action) => {
  switch (action.type) {
    case SEARCH_LIST:
      if (action.payload.goTripInfoAggregation.normalTrainTrips) {
        action.payload.goTripInfoAggregation.normalTrainTrips.forEach(
          (o, i, a) => {
            a[i] = Object.assign(a[i], { trip_id: guid() });
          }
        );
      }
      if (action.payload.goTripInfoAggregation.fastTrainTrips) {
        action.payload.goTripInfoAggregation.fastTrainTrips.forEach(
          (o, i, a) => {
            a[i] = Object.assign(a[i], { trip_id: guid() });
          }
        );
      }
      return action.payload;
    case DESELECT_SEARCH:
      return { ...state, results: _.omit(state.results, action.payload) };
    case CLEAR_SEARCH:
      return {};
    default:
      return state;
  }
};
