import TodoList from './TodoList';
import { undoable } from './Undoable';

export default
undoable(
  actionWrapper =>
    new TodoList()
    .withActionWrapper(actionWrapper)
    .addItem({text: "Use Redux", completed: true})
    .addItem({text: "Use OO"})
)
