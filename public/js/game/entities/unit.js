define(function(require) {
  var _ = require('underscore');
  var Crafty = require('crafty');

  var UnitFactory = {
    create: function(TILE_SIZE, TURN_TIME) {
      var unit = Crafty.e("2D, Canvas, Color, Multiway, Delay, Collision")
        .attr({ x: 300, y: 150, w: 10, h: 10})
        .color('rgb(0,0,255)')
        .multiway(1, {})
        .disableControl()
        .bind('Moved', function(from) {
          if(unit.hit('solid')){
            unit.attr({x: from.x, y:from.y});
          }
        });

      unit.execute = function(cmd){
        cmd = cmd.split(" ");

        if (cmd[0] == "move" || cmd[0] == "m") {
          var distanceToTravel = _.isUndefined(cmd[2]) ? 1 : parseInt(cmd[2], 10);

          if (distanceToTravel === 0) {
            return;
          } else {
            var oldX = unit.x;
            var oldY = unit.y;

            switch (cmd[1]) {
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
                unit.execute([cmd[0], cmd[1], distanceToTravel].join(" "));
              }, TURN_TIME);
            }
          }
        }
      };

      return unit;
    }
  };

  return UnitFactory;
});
