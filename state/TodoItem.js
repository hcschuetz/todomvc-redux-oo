import {State, defaults, settable, updater} from "../utils";

@defaults({
  text: "",
  completed: false
})
@settable("text")
@settable("completed")
export default class TodoItem extends State {}
