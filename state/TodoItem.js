import {State} from "../utils";

// action type constants
const SET_TEXT = "SET_TEXT";
const SET_COMPLETED = "SET_COMPLETED";

export default class TodoItem extends State {

  // action creators
  setTextAction(text) {
    return this.wrapAction({ type: SET_TEXT, text });
  }
  setCompletedAction(completed) {
    return this.wrapAction({ type: SET_COMPLETED, completed });
  }

  // main reducer
  reduce(action) {
    switch (action.type) {
    case SET_TEXT:
      return this.withProps({ text: action.text });
    case SET_COMPLETED:
      return this.withProps({ completed: action.completed });
    default:
      return this;
    }
  }

  // utility function
  setCompleted(completed) {
    return this.withProps({ completed });
  }
}

TodoItem.defaults = {
  text: "",
  completed: false
};
