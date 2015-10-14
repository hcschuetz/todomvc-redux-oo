import { combineReducers } from 'redux';
import { reduceFrom } from '../utils';
import initialState from '../state/initial';

const rootReducer = combineReducers({
  undoableTodos: reduceFrom(initialState)
});

export default rootReducer;
