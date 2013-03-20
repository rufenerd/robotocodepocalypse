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
        self.historyIndex = self.historyIndex > self.history.length  ? self.history.length : self.historyIndex;
        if (self.historyIndex < self.history.length){
          result = self.history[self.historyIndex];
        } else {
          result = '';
        }
      }
      return result;
    },

    onKeyDown: function(view, keyboardEvent) {
      var cmd;
      switch (keyboardEvent.keyCode) {
        case 13: // enter key
          keyboardEvent.preventDefault();
          self.inputHasFocus(false);
          self.execute();
          return false;

        case 38: // up arrow
          keyboardEvent.preventDefault();
          cmd = self.previousHistory();
          if( cmd ) { self.command(cmd); }
          return false;

        case 40: // down arrow
          keyboardEvent.preventDefault();
          cmd = self.nextHistory();
          if( typeof(cmd) === 'string' ) { self.command(cmd); }
          return false;
      }
      return true;
    },

    execute: function() {
      var cmd = self.command();

      if(cmd) {
        if (_.isEmpty(self.history) || cmd != _.last(self.history) ) {
          self.history.push(cmd);
        }
        self.historyIndex = self.history.length;
        self.trigger('executecommand', cmd);
      }
      self.command('');
      self.inputHasFocus(true);
    }

  });

  return self;
});
