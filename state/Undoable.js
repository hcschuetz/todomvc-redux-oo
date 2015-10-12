// Just to show that higher-order features like undo support can be
// implemented easily in OO style.  For real applications you might
// nevertheless prefer redux-undo, which has quite a few bells and
// whistles, which are not implemented here since they're unrelated to
// the question of using an OO style.

import {State, defaults, action, updater} from "../utils";

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

  @action @updater
  undo(u) {
    if (this.undoable()) {
      const {past, present, future} = this;
      u.past = past.rest;
      u.present = past.first;
      u.future = {first: present, rest: future};
    }
  }

  @action @updater
  redo(u) {
    if (this.redoable()) {
      const {past, present, future} = this;
      u.past = {first: present, rest: past};
      u.present = future.first;
      u.future = future.rest;
    }
  }

  @action @updater
  doIt(u, action) {
    const {past, present} = this;
    u.past = {first: present, rest: past};
    u.present = present.reduce(action);
    u.future = null;
  }
}

export function undoable(createSubState) {
  const undoer = new Undoer();
  return undoer.withProps({
    present: createSubState(action => undoer.doItAction(action)),
  });
}
