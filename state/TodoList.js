import {State, defaults, action} from "../utils";
import TodoItem from "./TodoItem";

@defaults({
  items: [],
  nextId: 0
})
export default class TodoList extends State {

  @action
  addTodo(props) {
    const id = this.nextId;
    return this.withProps({
      nextId: this.nextId + 1,
      items: [
        ...this.items,
        new TodoItem({...props, id})
          .withActionWrapper(subAction => this.updateTodoAction(id, subAction))
      ]
    });
  }

  @action
  deleteTodo(id) {
    return this.withProps({
      items: this.items.filter(todo => todo.id !== id)
    });
  }

  @action
  updateTodo(id, subAction) {
    return this.withProps({
        items: this.items.map(todo =>
          todo.id === id
          ? todo.reduce(subAction)
          : todo
        )
      });
  }

  @action
  completeAll() {
    const areAllMarked = this.items.every(todo => todo.completed);
    return this.withProps({
      items: this.items.map(todo => todo.setCompleted(!areAllMarked))
    });
  }

  @action
  clearCompleted() {
    return this.withProps({
      items: this.items.filter(todo => !todo.completed)
    });
  }
}
