import {State} from "./utils";
import TodoItem from "./TodoItem";

// action type constants
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const COMPLETE_ALL = "COMPLETE_ALL";
const CLEAR_COMPLETED = "CLEAR_COMPLETED";

export default class TodoList extends State {

  // action creators
  addTodoAction(text) {
    return this.wrapAction({ type: ADD_TODO, text });
  }
  deleteTodoAction(id) {
    return this.wrapAction({ type: DELETE_TODO, id });
  }
  updateTodoAction(id, subAction) {
    return this.wrapAction({ type: UPDATE_TODO, id, subAction });
  }
  completeAllAction() {
    return this.wrapAction({ type: COMPLETE_ALL });
  }
  clearCompletedAction() {
    return this.wrapAction({ type: CLEAR_COMPLETED });
  }

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

  // main reducer
  reduce(action) {
    switch (action.type) {
    case ADD_TODO:
      return this.addItem({text: action.text});
    case DELETE_TODO:
      return this.withProps({
        items: this.items.filter(todo => todo.id !== action.id)
      });
    case UPDATE_TODO:
      return this.withProps({
        items: this.items.map(todo =>
          todo.id === action.id
          ? todo.reduce(action.subAction)
          : todo
        )
      });
    case CLEAR_COMPLETED:
      return this.withProps({
        items: this.items.filter(todo => !todo.completed)
      });
    case COMPLETE_ALL: {
      const areAllMarked = this.items.every(todo => todo.completed);
      return this.withProps({
        items: this.items.map(todo => todo.setCompleted(!areAllMarked))
      });
    }
    default:
      return this;
    }
  }
}

TodoList.defaults = {
  items: [],
  nextId: 0
};
