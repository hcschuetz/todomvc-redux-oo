import TodoList from './TodoList';
import { Undoable } from './Undoable';

export default
new Undoable({
  present: new TodoList()
    .addTodo({text: "Use Redux", completed: true})
    .addTodo({text: "Use OO"})
})
