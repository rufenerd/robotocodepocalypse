define(function(require){
  var ko       = require('knockout');
  var _        = require('underscore');
  var Backbone = require('backbone');

  var self = _.extend(Backbone.Events, { 
    initialize: function(el) {
      self.beforeInit();
      el = el || self.el;
      ko.applyBindings(self, el);
      self.afterInit();
      return self;
    },

    beforeInit: function(){},
    afterInit: function(){},

    extend: function(obj) { 
      return _.extend(self, obj); 
    } 
  });

  return self;
});
