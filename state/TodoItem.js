import {State, defaults, settable} from "../utils";

@defaults({
  text: "",
  completed: false
})
@settable("text")
@settable("completed")
export default class TodoItem extends State {

  // utility function
  setCompleted(completed) {
    return this.withProps({ completed });
  }

}
