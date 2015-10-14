import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import TodoList from '../state/TodoList';

const undoRedoStyle = active =>
  ({ margin: "5px", color: active ? "grey" : "lightgrey" });

class App extends Component {
  render() {
    const { undoable, todos, dispatch } = this.props;
    const { undo, undoAll, redo, redoAll } = undoable.bindActions(dispatch);

    return (
      <div>
        <span>
          <button style={undoRedoStyle(undoable.isUndoable())} onClick={undoAll}>
            {'<<'}
          </button>
          <button style={undoRedoStyle(undoable.isUndoable())} onClick={undo}>
            {'<'}
          </button>
          <button style={undoRedoStyle(undoable.isRedoable())} onClick={redo}>
            {'>'}
          </button>
          <button style={undoRedoStyle(undoable.isRedoable())} onClick={redoAll}>
            {'>>'}
          </button>
        </span>
        <Header addTodo={ props => dispatch(todos.addTodoAction(props)) } />
        <MainSection
          todos={todos}
          dispatch={dispatch}
          actions={todos.bindActions(dispatch)}
        />
      </div>
    );
  }
}

App.propTypes = {
  todos: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps({undoableTodos}) {
  return {
    undoable: undoableTodos,
    todos: undoableTodos.present
  };
}

export default connect(mapStateToProps)(App);
