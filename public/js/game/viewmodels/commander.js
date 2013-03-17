define(function(require){
  var ViewModel = require('./_base');
  var ko = require('knockout');

  var self = ViewModel.extend({
    el: document.getElementById('commander'),
    command: ko.observable('m s 5'),
    inputHasFocus: ko.observable(true),

    onKeyDown: function(view, keyboardEvent){
      if (keyboardEvent.keyCode === 13) {
        keyboardEvent.preventDefault();
        self.inputHasFocus(false);
        self.execute();
        return false;
      }
      return true;
    },

    execute: function(){
      self.trigger('executecommand', self.command());
      self.command('');
      self.inputHasFocus(true);
    }

  });

  return self;
});
