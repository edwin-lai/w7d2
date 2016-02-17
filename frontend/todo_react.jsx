var TodoList = require('./components/todo_list.jsx'),
    React = require('react'),
    ReactDom = require('react-dom');

document.addEventListener("DOMContentLoaded", function() {
  ReactDom.render(<TodoList/>, document.getElementById('root'));
});
