import {State, defaults, settable, updater} from "../utils";

@defaults({
  text: "",
  completed: false
})
@settable("text")
@settable("completed")
export default class TodoItem extends State {

  // utility function
  @updater
  setCompleted(u, completed) {
    u.completed = completed;
  }

}
