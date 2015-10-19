// This should go to a generic utility library.

export class State {
  constructor(props) {
    Object.assign(this, props);
    Object.freeze(this);
  }

  // Returns an object providing for each action-creator method
  // xxxAction(...) a function xxx(...) immediately dispatching the
  // action.  The returned object is intended for use in UI code.
  bindActions(dispatch) {
    const result = {
      // Provide access to the actions for a sub-object.  (Actually this
      // works for any instance of State, not just sub-objects.)
      subActions: subObj => subObj.bindActions(dispatch),
    };
    for (const key in this) {
      // TODO Recognize action creators by some explicit mark instead of
      // a naming convention?
      if (key && key.endsWith("Action")) {
        const value = this[key];
        if (typeof(value) === "function")
          result[key.substring(0, key.length - 6)] =
          (...args) => dispatch(value.apply(this, args));
      }
    }
    return result;
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
  @action
  withProps(newProps) {
    return Object.keys(newProps).every(key => newProps[key] === this[key])
      ? this // Don't clone since nothing changed.
      : new this.constructor({...this, ...newProps});
  }

  // This default implementation of reduce(...) uses the action type to
  // pick a reducer method.
  reduce({type, args}) {
    const method = this[type];
    if (method)
      return method.apply(this, args);
    else {
      if (!type.startsWith("@@"))
        console.warn(`Method '${type}' not found in object ${this}`);
      return this;
    }
  }
}

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

// Decorator providing some magic allowing reducer helper functions to
// be implemented in a terse style with very little boilerplate.
export function updater(proto, methodName, descr) {
  const origMethod = descr.value;
  descr.value = function(...args) {
    const u = {};
    origMethod.call(this, u, ...args);
    return this.withProps(u);
  };
}

export function action(proto, methodName) {
  Object.defineProperty(proto, methodName + "Action", {
    value: function(...args) {
      return this.wrapAction({ type: methodName, args });
    },
    enumerable: true,
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
          return this.withPropsAction({ [propName]:val });
        },
        enumerable: true,
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
