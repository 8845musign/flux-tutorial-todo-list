var React           = require('react');
var ReactPropTypes  = React.PropTypes;
var TodoActions     = require('../actoins/TodoActions');
var TodoTextInput   = require('./TodoTextInput.react');

var classNames = require('classnames');

var TodoItem = React.createClass({
    PropTypes: {
      todo: ReactPropTypes.object.isRequired
    },

    getInitialState: function() {
      return {
        isEditing: false
      };
    },

    render: function() {
      todo = this.prop.todo;

      var input;
      if (this.state.isEditing) {
        input =
          <TodoTextInput
            classNames="edit"
            onSave={this._onSave}
            value={todo.text}
          />;
      }

      return (
        <li
          className={className({
            'complete': todo.complete,
            'editiong': this.state.isEditing
          })}
          key={todo.id}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={todo.complete}
              onChange={this._onToggleCompleteAll}
            />
            <label onDoubleClick={this._onToggleComplete}>
              {todo.text}
            </label>
            <button className="destroy" onClick={this._onDestroyClick} />
          </div>
          {input}
        </li>
      );
    },

    _onToggleComplete: function() {
      TodoActions.toggleComplete(this.props.todo);
    },

    _onDoubleClick: function() {
      this.setState({idEditing: true});
    },

    _onSave: function() {
      TodoActions.updateText(this.props.todo.id, text);
      this.setState({isEditing: false});
    },

    _onDestroyClick: function() {
      TodoActions.destroy(this.props.todo.id);
    }
});
