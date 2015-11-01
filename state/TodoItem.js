import {State, props} from "../utils";

@props({
  text     : {defaultTo: ""   , settable: true},
  completed: {defaultTo: false, settable: true},
})
export default class TodoItem extends State {}
