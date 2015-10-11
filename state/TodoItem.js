import {State, settable} from "../utils";

@settable("text")
@settable("completed")
export default class TodoItem extends State {

  // utility function
  setCompleted(completed) {
    return this.withProps({ completed });
  }

}

Object.assign(TodoItem.prototype, {
  text: "",
  completed: false
});
