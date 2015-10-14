import React, { Component, PropTypes } from 'react';

const undoRedoStyle = active =>
  ({ margin: "5px", color: active ? "grey" : "lightgrey" });

export default class UndoRedo extends Component {
  render() {
    const {undoable, actions} = this.props;
    const undoStyle = undoRedoStyle(undoable.isUndoable());
    const redoStyle = undoRedoStyle(undoable.isRedoable());
    return <span>
        <button style={undoStyle} onClick={actions.undoAll}>{'<<'}</button>
        <button style={undoStyle} onClick={actions.undo}>{'<'}</button>
        <button style={redoStyle} onClick={actions.redo}>{'>'}</button>
        <button style={redoStyle} onClick={actions.redoAll}>{'>>'}</button>
      </span>;
  }
}

UndoRedo.propTypes = {
  undoable: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};
