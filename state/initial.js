import TodoList from './TodoList';

export default
wrapAction =>
  new TodoList({wrapAction})
  .addItem({text: "Use Redux", completed: true})
  .addItem({text: "Use OO"})
