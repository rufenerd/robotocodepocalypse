define(function(require){
  var ViewModel = require('./_base');
  var ko = require('knockout');

  var self = ViewModel.extend({
    el: document.getElementById('commander'),
    history: [],
    historyIndex: 0,
    command: ko.observable(''),
    inputHasFocus: ko.observable(true),

    previousHistory: function() {
      var result = false;
      if (self.history.length) {
        self.historyIndex--;
        self.historyIndex = self.historyIndex < 0 ? 0 : self.historyIndex;
        result = self.history[self.historyIndex];
      }
      return result;
    },

    nextHistory: function() {
      var result = false;
      if (self.history.length) {
        self.historyIndex++;
        self.historyIndex = self.historyIndex > self.history.length - 1  ? self.history.length - 1 : self.historyIndex;
        result = self.history[self.historyIndex];
      }
      return result;
    },

    onKeyDown: function(view, keyboardEvent) {
      switch (keyboardEvent.keyCode) {
        case 13: // enter key
          keyboardEvent.preventDefault();
          self.inputHasFocus(false);
          self.execute();
          return false;

        case 38: // up arrow
          keyboardEvent.preventDefault();
          var cmd = self.previousHistory();
          if( cmd ) { self.command(cmd); }
          return false;

        case 40: // down arrow
          keyboardEvent.preventDefault();
          var cmd = self.nextHistory();
          if( cmd ) { self.command(cmd); }
          return false;
      }
      return true;
    },

    execute: function() {
      var cmd = self.command();
      if(cmd && (!self.history.length || self.history.length && cmd != self.history[self.history.length - 1])){
        self.history.push(cmd);
        self.trigger('executecommand', cmd);
      }
      self.historyIndex = self.history.length;
      self.command('');
      self.inputHasFocus(true);
    }

  });

  return self;
});
