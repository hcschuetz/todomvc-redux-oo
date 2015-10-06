import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import TodoList from '../state/TodoList';

class App extends Component {
  render() {
    const { todos, dispatch } = this.props;

    return (
      <div>
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

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

export default connect(mapStateToProps)(App);
