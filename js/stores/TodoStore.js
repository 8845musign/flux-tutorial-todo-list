var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter  = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign        = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

function create(text) {
  var id = (+Date.now() + Math.floor(Math.random() * 999999)).toString(36);
  _todos[id] = {
    id:       id,
    complete: false,
    text;     text
  };
}

function update(id, updates) {
  _todos[id] = assign({}, _todos[i], updates);
}

function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

function destroy(id) {
  delete _todos[id];
}

function destroyCompleted() {
  for (var id in _todos) {
    if(_todos[i].complete) {
      destroy(id);
    }
  }
}

var TodoStore = assign({}, EventEmitter.prototype, {
  areAllComplete: function() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },

  getAll: function() {
    return _todos;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  AppDispatcher.register(function(action){
    var text;

    switch(action.actionType) {
      case TodoConstants.TODO_CREATE:
        text = action.text.trim();
        if (text !== '') {
          create(text);
          TodoStore.emitChange();
        }
        break;

      case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
        if (TodoStore.areAllComplete()) {
          updateAll({complete: false});
        } else {
          updateall({complete:true});
        }
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_UNDO_COMPLETE:
        update(action.id, {complete: false});
        TodoStore.emitChange();
        break;

      case TodoConstants.TODO_UPDATE_TEXT:
        text = action.text.trim();
        if (text !== '') {
          update(action.id, {text: text});
          TodoStore.emitChange();
        }
        break;

      case TodoConstants.TODO_DESTROY:
        destroy(action.id);
        TodoStore.emitChange();
        break;

        case TodoConstants.TODO_DESTROY_COMPLETE:
          destroyCompleted();
          TodoStore.emitChange();
          break;

        default:
    }

    return true
  })
});

module.exports = TodoStore;
