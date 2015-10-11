import {State, defaults, action} from "../utils";
import TodoItem from "./TodoItem";

@defaults({
  items: [],
  nextId: 0
})
export default class TodoList extends State {

  // helper
  addItem(props) {
    const id = this.nextId;
    return this.withProps({
      nextId: this.nextId + 1,
      items: [
        ...this.items,
        new TodoItem({
          ...props,
          id,
          wrapAction: subAction => this.updateTodoAction(id, subAction),
        })
      ]
    });
  }

  // pairs of action creators and reducers

  @action(["text"])
  addTodo(text) {
    return this.addItem({text});
  }

  @action(["id"])
  deleteTodo(id) {
    return this.withProps({
      items: this.items.filter(todo => todo.id !== id)
    });
  }

  @action(["id", "subAction"])
  updateTodo(id, subAction) {
    return this.withProps({
        items: this.items.map(todo =>
          todo.id === id
          ? todo.reduce(subAction)
          : todo
        )
      });
  }

  @action()
  completeAll() {
    const areAllMarked = this.items.every(todo => todo.completed);
    return this.withProps({
      items: this.items.map(todo => todo.setCompleted(!areAllMarked))
    });
  }

  @action()
  clearCompleted() {
    return this.withProps({
      items: this.items.filter(todo => !todo.completed)
    });
  }
}
