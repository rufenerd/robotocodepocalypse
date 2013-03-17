define(function(require){
  var ko = require('knockout');
  var Backbone = require('backbone');

  var self;
  var CommanderViewModel = Backbone.View.extend({
    initialize: function(){
      self = this;
      ko.applyBindings(self, self.el);
    },
    command: ko.observable('m s 5'),
    execute: function(){
      self.trigger('executecommand', self.command());
    }
  });

  return CommanderViewModel;
});
