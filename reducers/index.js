import { combineReducers } from 'redux';
import { Undoable } from '../state/Undoable';
import initialTodos from '../state/initial';

// We're at the top level.  So there is nothing to wrap.
const wrapAction = x => x;

const initialState = new Undoable({present: initialTodos(wrapAction), wrapAction});

const rootReducer = combineReducers({
  undoableTodos: (state = initialState, action) => state.reduce(action)
});

export default rootReducer;
