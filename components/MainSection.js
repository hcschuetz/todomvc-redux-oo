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
    const { todos, actions } = this.props;
    const atLeastOneCompleted = todos.items.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      actions.clearCompleted();
    }
  }

  handleShow(filter) {
    this.setState({ filter });
  }

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props;
    if (todos.items.length > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.items.length}
               onChange={actions.completeAll} />
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
    const { todos, dispatch, actions } = this.props;
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
              todo={todo}
              actions={{
                ...todo.bindActions(dispatch),
                // Deleting an item is technically an action on the list,
                // but in the UI it is invoked from the item.  So we pass
                // a deletion action down from list code to item UI:
                deleteTodo: () => actions.deleteTodo(todo.id)
              }}
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
  actions: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default MainSection;
