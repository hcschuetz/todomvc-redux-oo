import {State} from "../utils";
import TodoItem from "./TodoItem";

// action type constants
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const COMPLETE_ALL = "COMPLETE_ALL";
const CLEAR_COMPLETED = "CLEAR_COMPLETED";

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

  addTodoAction(text) {
    return this.createAction(ADD_TODO, { text });
  }
  [ADD_TODO]({text}) {
    return this.addItem({text});
  }

  deleteTodoAction(id) {
    return this.createAction(DELETE_TODO, { id });
  }
  [DELETE_TODO]({id}) {
    return this.withProps({
      items: this.items.filter(todo => todo.id !== id)
    });
  }

  updateTodoAction(id, subAction) {
    return this.createAction(UPDATE_TODO, { id, subAction });
  }
  [UPDATE_TODO]({id, subAction}) {
    return this.withProps({
        items: this.items.map(todo =>
          todo.id === id
          ? todo.reduce(subAction)
          : todo
        )
      });
  }

  completeAllAction() {
    return this.createAction(COMPLETE_ALL);
  }
  [COMPLETE_ALL]() {
    const areAllMarked = this.items.every(todo => todo.completed);
    return this.withProps({
      items: this.items.map(todo => todo.setCompleted(!areAllMarked))
    });
  }

  clearCompletedAction() {
    return this.createAction(CLEAR_COMPLETED);
  }
  [CLEAR_COMPLETED]() {
    return this.withProps({
      items: this.items.filter(todo => !todo.completed)
    });
  }
}

TodoList.defaults = {
  items: [],
  nextId: 0
};
