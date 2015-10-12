import TodoList from './TodoList';
import { undoable } from './Undoable';

export default
undoable(
  actionWrapper =>
    new TodoList()
    .withActionWrapper(actionWrapper)
    .addTodo({text: "Use Redux", completed: true})
    .addTodo({text: "Use OO"})
)
