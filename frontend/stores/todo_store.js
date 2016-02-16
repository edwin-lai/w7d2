var _todos = [],
    _callbacks = [];

var TodoStore = {
  all: function(){
    return _todos.slice();
  },

  find: function(objId) {
    return _todos.find(function(todo) {
      return todo.id === objId;
    });
  },

  fetch: function(){
    $.get('api/todos', {}, function(todos){
      console.log(todos);
      _todos = todos;
      TodoStore.changed();
    });
  },

  create: function(todo){
    $.post('api/todos', todo, function(){
      _todos.push(todo);
      TodoStore.changed();
    });
  },

  destroy: function(id){
    var toDo = this.find(id);

    if (toDo !== undefined){
      $.ajax({
        url: 'api/todos/' + id,
        data: toDo,
        success: function(){
          return 'delete succeeded';
        },
        type: 'DELETE',
        dataType: 'json'
      });
    }
  },

  addChangeHandler: function(cb){
    _callbacks.push(cb);
  },

  removeChangeHandler: function(cb){
    var idx;

    for (var i = 0; i < _callbacks.length; i++) {
      if(cb === _callbacks[i]){
        idx = i;
        break;
      }
    }

    if(!idx){return;}

    _callbacks.splice(idx, 1);
  },

  toggleDone: function(id){
    var toDo = this.find(id);

    if (toDo !== undefined){
      if (toDo.done) {
        toDo.done = false;
      } else {
        toDo.done = true;
      }
      $.ajax({
        url: 'api/todos/' + id,
        data: toDo,
        success: function(){
          return 'patch succeeded';
        },
        type: 'PATCH',
        dataType: 'json'
      });
    }
  },

  changed: function(){
    _callbacks.forEach(function(cb){
      cb();
    });
  }
};

module.exports = TodoStore;
