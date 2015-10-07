import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import TodoList from '../state/TodoList';

const undoRedoStyle = active =>
  ({ margin: "5px", color: active ? "black" : "lightgrey" });

class App extends Component {
  render() {
    const { todos, havePast, haveFuture, dispatch } = this.props;

    return (
      <div>
        <span>
          <button style={undoRedoStyle(havePast)}
            onClick={() => dispatch(ActionCreators.undo())}
          >
            undo
          </button>
          <button style={undoRedoStyle(haveFuture)}
            onClick={() => dispatch(ActionCreators.redo())}
          >
            redo
          </button>
        </span>
        <Header addTodo={ text => dispatch(todos.addTodoAction(text)) } />
        <MainSection todos={todos} dispatch={dispatch} />
      </div>
    );
  }
}

App.propTypes = {
  todos: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps({undoableTodos: {present: todos, history: {past, future}}}) {
  return {
    todos,
    havePast: past.length > 0,
    haveFuture: future.length > 0,
  };
}

export default connect(mapStateToProps)(App);
