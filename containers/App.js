import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UndoRedo from '../components/UndoRedo';
import Header from '../components/Header';
import MainSection from '../components/MainSection';

class App extends Component {
  render() {
    const { undoable, todos, dispatch } = this.props;
    const actions = todos.bindActions(dispatch);

    return (
      <div>
        <UndoRedo undoable={undoable} actions={undoable.bindActions(dispatch)} />
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos.items} actions={actions} />
      </div>
    );
  }
}

App.propTypes = {
  todos: PropTypes.object.isRequired,
  undoable: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps({undoableTodos}) {
  return {
    undoable: undoableTodos,
    todos: undoableTodos.present
  };
}

export default connect(mapStateToProps)(App);
