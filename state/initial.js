import TodoList from './TodoList';
import TodoItem from './TodoItem';

const initialState = new TodoList({wrapAction: action => action}).addItem("Use Redux").addItem("Use OO");

export default initialState;
