import {State, props} from "../redux-oo";

@props({
  text     : {proto: ""   , settable: true},
  completed: {proto: false, settable: true},
})
export default class TodoItem extends State {}
