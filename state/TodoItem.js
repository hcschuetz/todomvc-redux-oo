import {State, settable} from "../utils";

@settable("text")
@settable("completed")
export default class TodoItem extends State {

  // utility function
  setCompleted(completed) {
    return this.withProps({ completed });
  }

}

TodoItem.defaults = {
  text: "",
  completed: false
};
