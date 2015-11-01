import {State, props, action, updater} from "../redux-oo";
import TodoItem from "./TodoItem";

@props({
  items : {proto: []},
  nextId: {proto: 0},
})
export default class TodoList extends State {

  @action @updater
  addTodo(u, props) {
    const id = this.nextId;
    u.nextId = this.nextId + 1;
    u.items = [
      ...this.items,
      new TodoItem({...props, id})
    ];
  }

  @action @updater
  deleteTodo(u, id) {
    u.items = this.items.filter(todo => todo.id !== id);
  }

  @action @updater
  updateTodo(u, id, subAction) {
    u.items = this.items.map(
      todo =>
        todo.id === id
        ? todo.reduce(subAction)
        : todo
    );
  }

  @action @updater
  completeAll(u) {
    const areAllMarked = this.items.every(todo => todo.completed);
    u.items = this.items.map(todo => todo.setCompleted(!areAllMarked));
  }

  @action @updater
  clearCompleted(u) {
    u.items = this.items.filter(todo => !todo.completed)
  }
}
