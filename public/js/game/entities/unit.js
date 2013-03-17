define(function(require) {
  var _ = require('underscore');
  var Crafty = require('crafty');

  var UnitFactory = {
    create: function(game) {
      var server = game.server;

      var unit = Crafty.e("2D, Canvas, Color, Multiway, Delay, Collision, Unit")
        .attr({ x: 300, y: 150, w: 10, h: 10})
        .color('rgb(0,0,255)')
        .multiway(1, {})
        .disableControl()
        .bind('Moved', function(from) {
          if(unit.hit('solid')){
            unit.attr({x: from.x, y:from.y});
          }
          server.emit("playerStateUpdate", JSON.stringify({ x: unit.x, y: unit.y }));
        });

      return unit;
    }
  };

  return UnitFactory;
});
