import { combineReducers } from 'redux';
import { Undoable } from '../state/Undoable';
import initialTodos from '../state/initial';
import { reduceFrom } from '../utils';

const initialState = new Undoable({present: initialTodos});

const rootReducer = combineReducers({
  undoableTodos: reduceFrom(initialState)
});

export default rootReducer;
