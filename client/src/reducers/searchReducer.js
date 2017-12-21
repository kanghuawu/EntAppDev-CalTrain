import _ from 'lodash';
import { SEARCH_LIST, TXN_ERROR, CLEAR_SEARCH } from '../actions';

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

function format(old) {
  const newtrip = old.map(seg => {
    seg.segments_id = guid();
    return seg;
  });
  return _.mapKeys(newtrip, 'segments_id');
}

export default (state = {}, action) => {
  switch (action.type) {
    case SEARCH_LIST:
      console.log(action.payload);
      const data = action.payload;
      if (data.round) {
        if (data.backTripInfoAggregation.normal) {
          data.backTripInfoAggregation.normalTrainTrips = format(
            data.backTripInfoAggregation.normalTrainTrips
          );
        }
        if (data.backTripInfoAggregation.fast) {
          data.backTripInfoAggregation.fastTrainTrips = format(
            data.backTripInfoAggregation.fastTrainTrips
          );
        }
      }
      if (data.goTripInfoAggregation.normal) {
        data.goTripInfoAggregation.normalTrainTrips = format(
          data.goTripInfoAggregation.normalTrainTrips
        );
      }
      if (data.goTripInfoAggregation.fast) {
        data.goTripInfoAggregation.fastTrainTrips = format(
          data.goTripInfoAggregation.fastTrainTrips
        );
      }
      return { ...data };
    case TXN_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_SEARCH:
      return {};
    default:
      return state;
  }
};
