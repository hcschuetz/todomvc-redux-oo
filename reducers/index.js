import { combineReducers } from 'redux';
import { reduceFrom } from '../utils';
import initialState from '../state/initial';
import jsConverter from '../jsConverterInstance';

const tweakReducer = r => (s,a) => {
  // Convert to plain JS and back, just to see that the conversions
  // work:
  const js = jsConverter.toJS(r(s,a));
  console.log(JSON.stringify(js));
  return jsConverter.fromJS(js);
};

var reducer = reduceFrom(initialState);
//reducer = tweakReducer(reducer);

export default combineReducers({
  undoableTodos: reducer
});
