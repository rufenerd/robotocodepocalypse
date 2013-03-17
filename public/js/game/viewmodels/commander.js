define(function(require){
  var ko = require('knockout');
  var Backbone = require('backbone');

  var self;
  var CommanderViewModel = Backbone.View.extend({
    initialize: function(){
      self = this;
      ko.applyBindings(self, self.el);
    },
    onKeyDown: function(view, keyboardEvent){
      console.log("onKD", keyboardEvent.keyIdentifier);
      if (keyboardEvent.keyIdentifier === "Enter") {
        self.execute();
      }
      return true;
    },
    command: ko.observable('m s 5'),
    execute: function(){
      self.trigger('executecommand', self.command());
      self.command('');
      self.afterExecute(true);
    },
    afterExecute: ko.observable(true)
  });

  return CommanderViewModel;
});
