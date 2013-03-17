define(function(require) {
  var _ = require('underscore');
  var Crafty = require('crafty');


  var UnitFactory = {
    create: function(game) {
      var TILE_SIZE = game.TILE_SIZE;
      var TURN_TIME = game.TURN_TIME;
      var server = game.server;
      var unit;

      Crafty.c("Unit", {
        move: function(direction, distance) {
          var distanceToTravel = _.isUndefined(distance) ? 1 : parseInt(distance, 10);
          
          if (distanceToTravel === 0) {
            return;
          } else {
            var oldX = unit.x;
            var oldY = unit.y;

            switch (direction) {
            case "north":
            case "n":
              unit.y -= TILE_SIZE;
              break;
            case "south":
            case "s":
              unit.y += TILE_SIZE;
              break;
            case "east":
            case "e":
              unit.x += TILE_SIZE;
              break;
            case "west":
            case "w":
              unit.x -= TILE_SIZE;
              break;
            }

            unit.attr({ x: unit.x, y: unit.y });
            unit.trigger("Moved", { x: oldX, y: oldY });
            distanceToTravel -= 1;

            if (distanceToTravel) {
              unit.delay(function(){
                unit.move(direction, distanceToTravel);
              }, TURN_TIME);
            }
          }
        },

        execute: function(cmd){
          cmd = cmd.split(" ");
          var action = cmd.shift();

          if (action == "move" || action == "m") {
            unit.move.apply(unit, cmd);
          }
        }
      });

      unit = Crafty.e("2D, Canvas, Color, Multiway, Delay, Collision, Unit")
        .attr({ x: 300, y: 150, w: 10, h: 10})
        .color('rgb(0,0,255)')
        .multiway(1, {})
        .disableControl()
        .bind('Moved', function(from) {
          if(unit.hit('solid')){
            unit.attr({x: from.x, y:from.y});
          }
          server.emit("playerStateUpdate", "foo");
        });

      return unit;
    }
  };

  return UnitFactory;
});
