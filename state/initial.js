import TodoList from './TodoList';

export default
new TodoList({wrapAction: action => action})
  .addItem({text: "Use Redux", completed: true})
  .addItem({text: "Use OO"})
