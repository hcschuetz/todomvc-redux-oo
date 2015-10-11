// This should go to a generic utility library.

export class State {
  constructor(props) {
    Object.assign(this, this.constructor.defaults || EMPTY, props);
  }

  // wrapAction(...) is intended to extend an action with information to
  // which part of the state the action is applicable.  To avoid clashes
  // within the action structure this is achieved by wrapping the given
  // action with another action.  The default implementation here leaves
  // the action unchanged.
  wrapAction(action) {
    return action;
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


// Convert a state object with a .reducer(action) method into a standard
// redux reducer function.  Use this method to embed OO-style redux code
// in surrounding code expecting standard reducers.
export function reduceFrom(initialValue) {
  return (state = initialValue, action) => state.reduce(action);
};
