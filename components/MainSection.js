import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { filter: SHOW_ALL };
  }

  handleClearCompleted() {
    const atLeastOneCompleted = this.props.todos.items.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      this.props.dispatch(this.props.todos.clearCompletedAction());
    }
  }

  handleShow(filter) {
    this.setState({ filter });
  }

  renderToggleAll(completedCount) {
    const { todos, dispatch } = this.props;
    if (todos.items.length > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.items.length}
               onChange={() => dispatch(todos.completeAllAction())} />
      );
    }
  }

  renderFooter(completedCount) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.items.length - completedCount;

    if (todos.items.length) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted.bind(this)}
                onShow={this.handleShow.bind(this)} />
      );
    }
  }

  render() {
    const { todos, dispatch } = this.props;
    const { filter } = this.state;

    const filteredTodos = todos.items.filter(TODO_FILTERS[filter]);
    const completedCount = todos.items.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    );

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem key={todo.id}
              {...{todo, dispatch}}
              // Deleting an item is technically an action on the list,
              // but in the UI it is invoked from the item.  So we pass
              // a deletion method down from list code to item UI:
              deleteItem={() => dispatch(todos.deleteTodoAction(todo.id))}
            />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
}

MainSection.propTypes = {
  todos: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default MainSection;
