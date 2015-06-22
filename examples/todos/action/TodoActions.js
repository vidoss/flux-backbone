
  var WebApi = require('../webapi/WebApi');

  // Actions
  var TodoActions = {

        getTodos: function(options) {
            WebApi.getTodos(options);
        },

        createTodo: function(todo) {
          WebApi.createTodo(todo);
        },

        saveTodo: function(todo) {
          WebApi.saveTodo(todo);
        },

        removeTodo: function(todo) {
          WebApi.removeTodo(todo);
        }
  };

  module.exports = TodoActions;