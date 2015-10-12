import TodoList from './TodoList';

export default
actionWrapper =>
  new TodoList()
  .withActionWrapper(actionWrapper)
  .addItem({text: "Use Redux", completed: true})
  .addItem({text: "Use OO"})
