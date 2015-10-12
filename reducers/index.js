import { combineReducers } from 'redux';
import { reduceFrom } from '../utils';
import initialState from '../state/initial';

export default combineReducers({
  undoableTodos: reduceFrom(initialState)
});
