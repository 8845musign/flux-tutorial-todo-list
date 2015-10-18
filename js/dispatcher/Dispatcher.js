var Promise = require('es6-promise').Promise;
var assign  = require('object-assign');

var _callbacks = [];
var _promises  = [];

var Dispatcher = function(){};
Dispatcher.prototype = assign({}, Dispatcher.prototype,{
  register: function(callback) {
    _callbacks.push(callback);
    return _callbacks.length - 1;
  },

  dispatch: function(payload) {
    var resolves = [];
    var rejects  = [];
    _promises = _callbacks.map(function(_, i){
      return new Promise(function(resolve, reject){
        resolves[i] = resolve;
        rejects[i]  = reject;
      });
    });

    _callbacks.forEach(function(callback, i){
      Promise.resolve(callback(payload)).then(function(){
        resolves[i](payload);
      }, function(){
        rejects[i](new Error('Dispather callback unsuccessful'));z
      });
    });

    _promises = [];
  },

  waitFor: function(promiseIndexes, callback) {
    var selectedPromises = promiseIndexes.map(function(index){
      return _promises[index];
    });
    return Promise.all(selectedPromises).then(callback);
  }
});

module.exports = Dispatcher;
