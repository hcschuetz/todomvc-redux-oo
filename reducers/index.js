import { combineReducers } from 'redux';
import undoable from 'redux-undo';
import initialState from '../state/initial';

const rootReducer = combineReducers({
  undoableTodos: undoable((state = initialState, action) => state.reduce(action))
});

export default rootReducer;
