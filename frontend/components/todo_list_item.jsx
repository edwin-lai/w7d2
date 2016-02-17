var React = require('react');
var TodoStore = require('../stores/todo_store.js');

var TodoListItem = React.createClass({
  render: function() {
    var toDo = this.props.todo;
    return <div><div>{toDo.title}</div><div>{toDo.body}</div></div>;
  }
});

module.exports = TodoListItem;
