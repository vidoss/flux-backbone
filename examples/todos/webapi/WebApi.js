  "use strict";

  var _ = require('underscore');
  var Backbone = require('backbone');
  var WebApiMixin = require('./WebApiMixin');

  var LocalStorage = require('../vendor/localStorage')
  var Constants = require('../constants/TodoConstants');
  var AppDispatcher = require('../dispatcher/AppDispatcher');

  // WebApi
  
  var WebApi = function(){};

_.extend(WebApi.prototype, WebApiMixin, {

    // Save all of the todo items under the `"todos-backbone"` namespace.
    localStorage: new Backbone.LocalStorage("todos-backbone"),

    dispatch: function(payload) {
        AppDispatcher.dispatch(payload);
    },

    getTodos: function(options) {
        return this.doRequest('read', _.extend({
            key: Constants.todo.GET_TODOS
        }, options));
    },

    createTodo: function(todo) {
        this.doRequest('create', {
            key: Constants.todo.CREATE_TODO,
            data: todo
        });
    },

    saveTodo: function(todo) {
        this.doRequest('update', {
            key: Constants.todo.SAVE_TODO,
            data: todo
        });
    },

    removeTodo: function(todo) {
        this.doRequest('delete', {
            key: Constants.todo.REMOVE_TODO,
            data: todo
        });
    }

});

module.exports = new WebApi();