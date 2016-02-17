var React = require('react');
var TodoStore = require('../stores/todo_store.js');

var TodoList = React.createClass({
  getInitialState: function () {
    return {todos: TodoStore.all()};
  },

  componentWillMount: function () {
    TodoStore.fetch();
    TodoStore.addChangeHandler(this.todoListener);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeHandler(this.todoListener);
  },

  todoListener: function () {
    this.setState({todos: TodoStore.all()});
  },

  todos: function() {
    return this.state.todos.map(function (todo) {
      return <div><TodoListItem todo={todo} key={todo.id}/></div>;
    });
  },

  render: function () {
    return <div>{this.todos()}</div>;
  }
});

module.exports = TodoList;
