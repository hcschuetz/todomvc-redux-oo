// This should go to a generic utility library.

export class State {
  constructor(props) {
    Object.assign(this, props);
    Object.freeze(this);
  }

  // wrapAction(...) is intended to extend an action with information to
  // which part of the state the action is applicable.  To avoid clashes
  // within the action structure this is achieved by wrapping the given
  // action with another action.  The default implementation here leaves
  // the action unchanged.
  wrapAction(action) {
    return action;
  }

  withActionWrapper(actionWrapper) {
    return new this.constructor({...this, wrapAction: actionWrapper});
  }

  // Return a variant of this in which the given properties are modified.
  withProps(newProps) {
    return Object.keys(newProps).every(key => newProps[key] === this[key])
      ? this // Don't clone since nothing changed.
      : new this.constructor({...this, ...newProps});
  }

  // This default implementation of reduce(...) uses the action type to
  // pick a reducer method.
  reduce({type, args}) {
    const method = this[type];
    return method ? method.apply(this, args) : this;
  }
}

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

export function action(proto, methodName) {
  Object.defineProperty(proto, methodName + "Action", {
    value: function(...args) {
      return this.wrapAction({ type: methodName, args });
    },
    enumerable: false,
    configurable: false,
    writable: false
  });
}

// TODO Make usage consistent for @defaults and @settable.

// TODO Isnt't there some standard syntax in ES6/ES7 to add values to
// the prototype?
export function defaults(props) {
  return function(cls) {
    Object.assign(cls.prototype, props);
  }
}

export function settable(propName) {
  return cls => {
    Object.defineProperty(
      cls.prototype, `set${capitalize(propName)}Action`, {
        value: function(val) {
          return this.wrapAction({ type: "withProps", args: [{ [propName]:val }] });
        },
        enumerable: false,
        configurable: false,
        writable: false
      });
  }
}

// Convert a state object with a .reducer(action) method into a standard
// redux reducer function.  Use this method to embed OO-style redux code
// in surrounding code expecting standard reducers.
export function reduceFrom(initialValue) {
  return (state = initialValue, action) => state.reduce(action);
};
