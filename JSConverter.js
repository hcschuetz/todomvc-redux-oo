// This should go to a library just like utils.js

/*
An instance of JSConverter converts between class instances and "plain"
JS objects with a string-valued property (the "class tag") indicating
the class.  The conversion functions for both directions descend into
objects and arrays and recursively convert sub-objects.  (A tree
structure is expected.)

The constructor expects an object consisting of classes.  For each class
the corresponding property name will be used as the class tag.

You can also select the name of the class-tag property by setting the
JSConverter's classTag property.

JSConverter is helpful if you are using classes but you also want to use
APIs that only support JSON-style data.
*/
export default class JSConverter {
  constructor(classes) {
    this.classTag = "__CLASS__";
    this.tag2class = {...classes};
    this.class2tag = new Map();
    for (const tag in classes)
      this.class2tag.set(classes[tag], tag);
  }

  toJS(v) {
    if (v instanceof Array)
      return v.map(x => this.toJS(x));
    if (v instanceof Object) {
      if (v.hasOwnProperty(this.classTag))
        console.warn(`Property ${this.classTag} clashes with class tag.`)
      const js = {};
      const cls = v.constructor;
      const classTag = this.class2tag.get(cls);
      if (classTag)
        js[this.classTag] = classTag;
      else if (cls !== Object)
        console.warn(`Class not registered: ${cls}`);
      for (const key of Object.keys(v))
        js[key] = this.toJS(v[key]);
      return js;
    }
    return v;
  }

  fromJS(js) {
    if (js instanceof Array)
      return js.map(js => this.fromJS(js));
    if (js instanceof Object) {
      const { [this.classTag]: classTag, ...jsProps } = js;
      const props = {};
      for (const key in jsProps)
        props[key] = this.fromJS(jsProps[key]);
      if (classTag) {
        if (typeof classTag !== "string")
          console.warn(`Property ${this.classTag} is not a string.`);
        const constructor = this.tag2class[classTag];
        if (constructor)
          return new constructor(props);
        else
          console.warn(`no class found for "${classTag}"`);
      }
      return props;
    }
    return js;
  }
}
