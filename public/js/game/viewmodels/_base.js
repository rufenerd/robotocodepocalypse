define(function(require){
  var ko       = require('knockout');
  var _        = require('underscore');
  var Backbone = require('backbone');

  var self = _.extend(Backbone.Events, { 
    initialize: function(el) {
      el = el || self.el;
      ko.applyBindings(self, el);
      return self;
    },

    extend: function(obj) { 
      return _.extend(self, obj); 
    } 
  });

  return self;
});
