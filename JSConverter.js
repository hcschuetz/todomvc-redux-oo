// This should go to a library just like utils.js

export default class JSConverter {
  constructor() {
    this.name2cls = {};
    this.cls2name = new Map();
  }

  register(cls, name = cls.name) {
    this.name2cls[name] = cls;
    this.cls2name.set(cls, name);
  }

  toJS(o) {
    if (o instanceof Array)
      return o.map(x => this.toJS(x));
    if (o instanceof Object) {
      const $class = this.cls2name.get(o.constructor);
      if ($class) {
        const js = { $class };
        for (const key of Object.keys(o))
          js[key] = this.toJS(o[key]);
        return js;
      }
    }
    return o;
  }

  fromJS(js) {
    if (js instanceof Array)
      return js.map(js => this.fromJS(js));
    if (js instanceof Object) {
      const { $class, ...jsProps } = js;
      if ($class) {
        const constructor = this.name2cls[$class];
        if (constructor) {
          const props = {};
          for (const key in jsProps)
            props[key] = this.fromJS(jsProps[key]);
          return new constructor(props);
        }
      }
    }
    return js;
  }
}
