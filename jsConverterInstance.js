import JSConverter from './JSConverter';

import Undoable from './state/Undoable';
import TodoList from './state/TodoList';
import TodoItem from './state/TodoItem';


export default new JSConverter({Undoable, TodoList, TodoItem});
