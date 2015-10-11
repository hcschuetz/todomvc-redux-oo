// Just to show that higher-order features like undo support can be
// implemented easily in OO style.  For real applications you might
// nevertheless prefer redux-undo, which has quite a few bells and
// whistles, which are not implemented here since they're unrelated to
// the question of using an OO style.

import {State} from "../utils";

const UNDO = "@@undoable/UNDO";
const REDO = "@@undoable/REDO";

export class Undoable extends State {
  // action creators
  undoAction() { return this.wrapAction({ type: UNDO }); }
  redoAction() { return this.wrapAction({ type: REDO }); }

  // utility methods for the UI (for enabling/disabling the buttons)
  undoable() { return this.past != null; }
  redoable() { return this.future != null; }

  // reducer helpers
  undo() {
    if (this.undoable()) {
      const {past, present, future} = this;
      return this.withProps({
        past: past.rest,
        present: past.first,
        future: {first: present, rest: future}
      });
    }
    else
      return this;
  }

  redo() {
    if (this.redoable()) {
      const {past, present, future} = this;
      return this.withProps({
        past: {first: present, rest: past},
        present: future.first,
        future: future.rest
      });
    }
    else
      return this;
  }

  doIt(action) {
    const {past, present} = this;
    return this.withProps({
      past: {first: present, rest: past},
      present: present.reduce(action),
      future: null
    });
  }

  // main reducer
  reduce(action) {
    switch (action.type) {
      case UNDO: return this.undo();
      case REDO: return this.redo();

      // It's ugly that we have to treat redux INIT actions explicitly:
      // (Not competely sure if ignoring is the right thing to do.  Or
      // should we still send INIT actions to this.present, which will
      // probably ignore them nevertheless?)
      //
      // What about other actions starting with "@@"?  And is it ok that
      // our own action names UNDO and REDO start with "@@"?  (See also
      // https://github.com/rackt/redux/issues/186.)
      case "@@redux/INIT": return this;
      case "@@INIT": return this;

      default: return this.doIt(action);
    }
  }
}

Undoable.defaults = {
  past: null,
  present: undefined,
  future: null
}
