import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UndoRedo from '../components/UndoRedo';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import TodoList from '../state/TodoList';

class App extends Component {
  render() {
    const { undoable, todos, dispatch } = this.props;

    return (
      <div>
        <UndoRedo undoable={undoable} actions={undoable.bindActions(dispatch)} />
        <Header addTodo={ props => dispatch(todos.addTodoAction(props)) } />
        <MainSection
          todos={todos}
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
