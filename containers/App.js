import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import TodoList from '../state/TodoList';

const undoRedoStyle = active =>
  ({ margin: "5px", color: active ? "grey" : "lightgrey" });

class App extends Component {
  render() {
    const { undoable, todos, dispatch } = this.props;

    return (
      <div>
        <span>
          <button style={undoRedoStyle(undoable.isUndoable())}
            onClick={() => dispatch(undoable.undoAllAction())}
          >
            {'<<'}
          </button>
          <button style={undoRedoStyle(undoable.isUndoable())}
            onClick={() => dispatch(undoable.undoAction())}
          >
            {'<'}
          </button>
          <button style={undoRedoStyle(undoable.isRedoable())}
            onClick={() => dispatch(undoable.redoAction())}
          >
            {'>'}
          </button>
          <button style={undoRedoStyle(undoable.isRedoable())}
            onClick={() => dispatch(undoable.redoAllAction())}
          >
            {'>>'}
          </button>
        </span>
        <Header addTodo={ props => dispatch(todos.addTodoAction(props)) } />
        <MainSection todos={todos} dispatch={dispatch} />
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
