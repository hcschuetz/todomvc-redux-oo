import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }

  handleSave(text) {
    const {setText, deleteTodo} = this.props.actions;
    if (text.length === 0) {
      deleteTodo();
    } else {
      setText(text);
    }
    this.setState({ editing: false });
  }

  render() {
    const {todo: {text, completed}, actions: {setCompleted, deleteTodo}} = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput text={text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(text)} />
      );
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={completed}
                 onChange={() => setCompleted(!completed)} />
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>
            {text}
          </label>
          <button className="destroy" onClick={deleteTodo} />
        </div>
      );
    }

    return (
      <li className={classnames({
        completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default TodoItem;
