// This should go to a generic utility library.

export class State {
  constructor(props) {
    Object.assign(this, props);
    Object.freeze(this); // ### Probably too early here!
  }

  bindActions(dispatch) {
    const bound = {};
    for (const name in this)
      if (name.endsWith("Action") && this[name] instanceof Function)
        bound[name.substr(0, name.length - 6)] =
          (...args) => dispatch(this[name](...args));
    return bound;
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
        console.warn(`Method '${type}' not found in object `, this);
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

function defAction(proto, name, fn) {
  Object.defineProperty(proto, name + "Action", {
    value: fn,
    enumerable: true,
    configurable: false,
    writable: false,
  });
}

export function action(proto, methodName) {
  defAction(proto, methodName, function(...args) {
    return { type: methodName, args };
  });
}

// TODO Make usage consistent for @defaults and @settable.

export function defaults(props) {
  return function(cls) {
    Object.assign(cls.prototype, props);
  }
}

export function settable(propName) {
  return cls => defAction(cls.prototype, `set${capitalize(propName)}`, function(val) {
    return this.withPropsAction({ [propName]: val });
  });
}

// Convert a state object with a .reducer(action) method into a standard
// redux reducer function.  Use this method to embed OO-style redux code
// in surrounding code expecting standard reducers.
export function reduceFrom(initialValue) {
  return (state = initialValue, action) => state.reduce(action);
};
