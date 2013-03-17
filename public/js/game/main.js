define(function(require) {
  var _ = require('underscore');
  var Crafty = require('crafty');
  require('./components');

  var app = {
    CANVAS_WIDTH : 900,
    CANVAS_HEIGHT: 600,

    initialize: function() {
      var self = this;
      this.server = io.connect('http://localhost:3000');
      var server = this.server;
      this.objects = {};

      server.on('connect', function(data) {
        self.name = prompt("What is your nickname?");
        server.emit('join', self.name);
        Crafty.trigger('joined');
      });

      server.on('newState', function (newState) {
        _.each(newState, function(info, id){
          if (id !== self.name) {
            if (_.isUndefined(self.objects[id])) {
              self.objects[id] = Crafty.e("2D, Canvas, Color, solid")
                .color('rgb(255,0,255)')
                .attr({ w: 10, h: 10 })
            }
            
            self.objects[id].attr(info);
          }
        });
      });
      
      Crafty.init(self.CANVAS_WIDTH, self.CANVAS_HEIGHT);
      Crafty.background('rgb(127,127,127)');

      // Walls
      Crafty.e("2D, solid").attr({ x: 0, y: -1, w: this.CANVAS_WIDTH, h: 1 });
      Crafty.e("2D, solid").attr({ x: this.CANVAS_WIDTH, y: 0, w: 1, h: this.CANVAS_HEIGHT });
      Crafty.e("2D, solid").attr({ x: 0, y: this.CANVAS_HEIGHT, w: this.CANVAS_WIDTH, h: 1 });
      Crafty.e("2D, solid").attr({ x: -1, y: 0, w: 1, h: this.CANVAS_HEIGHT });
    }
  };

  return app;
});
