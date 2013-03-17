define(function(require) {
  var _ = require('underscore');
  var Crafty = require('crafty');

  var app = {
    CANVAS_WIDTH : 900,
    CANVAS_HEIGHT: 600,
    TILE_SIZE    : 5,
    TURN_TIME    : 1,

    initialize: function() {
      this.server = io.connect('http://localhost:3000');
      var server = this.server;
      
      server.on('connect', function(data) {
        nickname = prompt("What is your nickname?");
        server.emit('join', nickname);
      });

      server.on('newState', function (newState) {
        console.log(newState);
      });

      Crafty.init(this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
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
