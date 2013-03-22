define(function(require) {
  var _ = require('underscore');
  var Crafty = require('crafty');

  var TILE_SIZE = 5;
  var TURN_TIME = 1;
  var self;

  Crafty.c("RandomStartPosition", {
	  init: function() {
		  this.attr({
        x: Math.round(Crafty.math.randomInt(0, Crafty.canvas.context.canvas.width) / TILE_SIZE) * TILE_SIZE,
        y: Math.round(Crafty.math.randomInt(0, Crafty.canvas.context.canvas.height) / TILE_SIZE) * TILE_SIZE
      });
	  }
  });

  Crafty.c("Unit", {
    init: function() { self = this; },
    move: function(direction, distance) {
      var distanceToTravel = _.isUndefined(distance) ? 1 : parseInt(distance, 10);
      
      if (distanceToTravel === 0) {
        return;
      } else {
        var oldX = self.x;
        var oldY = self.y;

        switch (direction) {
        case "north":
        case "n":
          self.y -= TILE_SIZE;
          break;
        case "south":
        case "s":
          self.y += TILE_SIZE;
          break;
        case "east":
        case "e":
          self.x += TILE_SIZE;
          break;
        case "west":
        case "w":
          self.x -= TILE_SIZE;
          break;
        }

        self.attr({ x: self.x, y: self.y });
        self.trigger("Moved", { x: oldX, y: oldY });
        distanceToTravel -= 1;

        if (distanceToTravel) {
          self.delay(function(){
            self.move(direction, distanceToTravel);
          }, TURN_TIME);
        }
      }
    },

    execute: function(cmd){
      cmd = cmd.split(" ");
      var action = cmd.shift();

      if (action == "move" || action == "m") {
        self.move.apply(self, cmd);
      }
    },

    sendStateToServer: function(){
      self.server.emit("playerStateUpdate", JSON.stringify({ x: self.x, y: self.y }));
    }
  });
});
