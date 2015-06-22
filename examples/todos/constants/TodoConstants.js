
"use strict";

var _ = require('underscore');
var Constants = require('./Constants');

var TodoConstants = _.extend( {}, Constants, {
    todo: {
      GET_TODOS: "TODO_DATA",
      CREATE_TODO: "TODO_CREATE",
      SAVE_TODO: "TODO_SAVE",
      REMOVE_TODO: "TODO_REMOVE"
    }
  });


module.exports = TodoConstants;