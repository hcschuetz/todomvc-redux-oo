import { combineReducers } from 'redux';
import { undoable } from '../state/Undoable';
import createInitialTodos from '../state/initial';
import { reduceFrom } from '../utils';

const initialState = undoable(createInitialTodos);

const rootReducer = combineReducers({
  undoableTodos: reduceFrom(initialState)
});

export default rootReducer;
