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
    const {setText, deleteItem} = this.props;
    if (text.length === 0) {
      deleteItem();
    } else {
      setText(text);
    }
    this.setState({ editing: false });
  }

  render() {
    const {text, completed, setCompleted, deleteItem} = this.props;

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
          <button className="destroy"
                  onClick={deleteItem} />
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
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  setText: PropTypes.func.isRequired,
  setCompleted: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default TodoItem;
