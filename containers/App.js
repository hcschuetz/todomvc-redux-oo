import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UndoRedo from '../components/UndoRedo';
import Header from '../components/Header';
import MainSection from '../components/MainSection';

class App extends Component {
  render() {
    const { undoableTodos, dispatch } = this.props;
    const undoableActions = undoableTodos.bindActions(dispatch);
    const todos = undoableTodos.present;
    const todosActions = todos.bindActions(undoableActions.doIt);
    return (
      <div>
        <UndoRedo undoable={undoableTodos} actions={undoableActions} />
        <Header addTodo={todosActions.addTodo} />
        <MainSection todos={todos.items} actions={todosActions} />
      </div>
    );
  }
}

App.propTypes = {
  undoableTodos: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps({undoableTodos}) {
  return {undoableTodos};
}

export default connect(mapStateToProps)(App);
