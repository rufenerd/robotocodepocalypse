define(function(require) {
  var _ = require('underscore');
  var Crafty = require('crafty');
  var config = require('game/config');
  require('game/components');

  var app = {
    initialize: function() {
      var self = this;
      this.server = io.connect();
      var server = this.server;
      this.objects = {};
      this.numOpponents = 0;

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
                .color(self.nextColor())
                .attr({ w: config.TILE_SIZE, h: config.TILE_SIZE });

              self.numOpponents += 1;
            }

            self.objects[id].attr(info);
          }
        });
      });

      Crafty.init(config.CANVAS_WIDTH, config.CANVAS_HEIGHT);
      Crafty.background('rgb(127,127,127)');

      // Walls
      Crafty.e("2D, solid").attr({ x: 0, y: -1, w: config.CANVAS_WIDTH, h: 1 });
      Crafty.e("2D, solid").attr({ x: config.CANVAS_WIDTH, y: 0, w: 1, h: config.CANVAS_HEIGHT });
      Crafty.e("2D, solid").attr({ x: 0, y: config.CANVAS_HEIGHT, w: config.CANVAS_WIDTH, h: 1 });
      Crafty.e("2D, solid").attr({ x: -1, y: 0, w: 1, h: config.CANVAS_HEIGHT });
    },
 
    nextColor: function() {
      var colors = [
        'rgb(255,0,0)',
        'rgb(0,255,0)',
        'rgb(255,255,0)',
        'rgb(0,255,255)'
      ];

      return colors[this.numOpponents % colors.length];
    }
  };

  return app;
});
