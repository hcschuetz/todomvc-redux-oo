// Just to show that higher-order features like undo support can be
// implemented easily in OO style.  For real applications you might
// nevertheless prefer redux-undo, which has quite a few bells and
// whistles, which are not implemented here since they're unrelated to
// the question of using an OO style.

import {State, defaults, action} from "../utils";

@defaults({
  past: null,
  present: undefined,
  future: null
})
class Undoer extends State {
  // utility methods for the UI (for enabling/disabling the buttons)
  undoable() { return this.past != null; }
  redoable() { return this.future != null; }

  // reducer helpers (with actions)

  @action
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

  @action
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

  @action
  doIt(action) {
    const {past, present} = this;
    return this.withProps({
      past: {first: present, rest: past},
      present: present.reduce(action),
      future: null
    });
  }
}

export function undoable(createSubState) {
  const undoer = new Undoer();
  return undoer.withProps({
    present: createSubState(action => undoer.doItAction(action)),
  });
}
