// This should go to a generic utility library.

export class State {
  constructor(props) {
      Object.assign(this, this.constructor.defaults || EMPTY, props);
  }

  withProps(newProps) {
    return Object.keys(newProps).every(key => newProps[key] === this[key])
      ? this // Don't clone since nothing changed.
      : Object.assign(new this.constructor(this), newProps);
  }
}

// TODO: Provide some ES7 decorators to reduce boilerplate code in state
// classes?
// - @actionType
// - @actionCreator
// - @reducer
// - @...
