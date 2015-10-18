var React           = require('react');
var ReactPropTypes  = React.propTypes;
var TodoActions     = require('../actions/TodoActions');

var Footer = React.createClass({
  propTypes: {
    allTodos:ReactPropTypes.object.isRequired
  },

  render: function() {
    var allTodos = this.props.allTodos;
    var total = Object.keys(allTodos).length;

    if (total === 0) {
      return null;
    }

    var complete = 0;
    for (var key in allTodos) {
      if (allTodos[key].complete) {
        complete++;
      }
    }

    var itemsLeft = total - complete;
    var itemLeftPhrase = itemLeft === 1 ? ' item ' : ' items ';
    itemLeftPhrase += 'left';

    var clearCompleteButton;
    if (completed) {
      clearCompleteButton =
        <button
          id="clear-completed"
          onClick={this._onClearCompletedClicked}>
          Clear compleated ({completed})
        </button>;
    }

    return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            {itemsLeft}
          </strong>
          {itemLeftPhrase}
        </span>
        {clearCompleteButton}
      </footer>
    );
  },

  _onClearCompletedClicked: function() {
    TodoActions.destroyCompleted();
  }

});
