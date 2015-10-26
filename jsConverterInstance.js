import JSConverter from './JSConverter';

import Undoable from './state/Undoable';
import TodoList from './state/TodoList';
import TodoItem from './state/TodoItem';


const jsConverter = new JSConverter();

for (const cls of [Undoable, TodoList, TodoItem])
  jsConverter.register(cls);

export default jsConverter
