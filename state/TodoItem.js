import {State} from "../utils";

export default class TodoItem extends State {

  // action creators
  setTextAction(text) {
    return this.createUpdateAction({ text });
  }
  setCompletedAction(completed) {
    return this.createUpdateAction({ completed });
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
