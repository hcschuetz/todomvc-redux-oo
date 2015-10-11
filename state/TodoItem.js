import {State} from "../utils";

// action type constants
const SET_TEXT = "SET_TEXT";
const SET_COMPLETED = "SET_COMPLETED";

export default class TodoItem extends State {

  // pairs of action creators and reducers

  setTextAction(text) {
    return this.createAction(SET_TEXT, { text: text });
  }
  [SET_TEXT]({ text }) {
    return this.withProps({ text });
  }

  setCompletedAction(completed) {
    return this.createAction(SET_COMPLETED, { completed });
  }
  [SET_COMPLETED]({ completed }) {
    return this.setCompleted(completed);
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
