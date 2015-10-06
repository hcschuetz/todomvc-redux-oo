import { combineReducers } from 'redux';
import initialState from '../state/initial';

const rootReducer = combineReducers({
  todos: (state = initialState, action) => state.reduce(action)
});

export default rootReducer;
