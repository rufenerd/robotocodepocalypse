(function(window, ko){
  var CANVAS_HEIGHT = 600;
  var CANVAS_WIDTH  = 900;
  var TILE_SIZE     = 5;
  var TURN_TIME     = 1;

  Crafty.init(CANVAS_WIDTH, CANVAS_HEIGHT);
  Crafty.background('rgb(127,127,127)');

  var server = io.connect('http://localhost:3000');

  server.on('connect', function(data) {
    nickname = prompt("What is your nickname?");
    server.emit('join', nickname);
  });

  server.on('newState', function (newState) {
    console.log(newState);
  });

  // Walls
  var walls = {
    top: Crafty.e("2D, solid").attr({ x: 0, y: -1, w: CANVAS_WIDTH, h: 1 }),
    right: Crafty.e("2D, solid").attr({ x: CANVAS_WIDTH, y: 0, w: 1, h: CANVAS_HEIGHT }),
    bottom: Crafty.e("2D, solid").attr({ x: 0, y: CANVAS_HEIGHT, w: CANVAS_WIDTH, h: 1 }),
    left:  Crafty.e("2D, solid").attr({ x: -1, y: 0, w: 1, h: CANVAS_HEIGHT })
  };

  //Unit
  Crafty.c("Unit", {
    move: function(direction, distance) {
      var distanceToTravel = _.isUndefined(distance) ? 1 : parseInt(distance, 10);
      
      if (distanceToTravel === 0) {
        return;
      } else {
        var oldX = this.x;
        var oldY = this.y;

        switch (direction) {
        case "north":
        case "n":
          this.y -= TILE_SIZE;
          break;
        case "south":
        case "s":
          this.y += TILE_SIZE;
          break;
        case "east":
        case "e":
          this.x += TILE_SIZE;
          break;
        case "west":
        case "w":
          this.x -= TILE_SIZE;
          break;
        }

        this.attr({ x: this.x, y: this.y });
        this.trigger("Moved", { x: oldX, y: oldY });
        distanceToTravel -= 1;

        if (distanceToTravel) {
          var self = this;
          this.delay(function(){
            self.move(direction, distanceToTravel);
          }, TURN_TIME);
        }
      }
    },

    execute: function(cmd){
      cmd = cmd.split(" ");
      var action = cmd.shift();

      if (action == "move" || action == "m") {
        this.move.apply(this, cmd);
      }
    }
  })

  var unit = Crafty.e("2D, Canvas, Color, Multiway, Delay, Collision, Unit")
    .attr({ x: 300, y: 150, w: 10, h: 10})
    .color('rgb(0,0,255)')
    .multiway(1, {})
    .disableControl()
    .bind('Moved', function(from) {
      if(this.hit('solid')){
        this.attr({x: from.x, y:from.y});
      }

      server.emit("playerStateUpdate", "foo");
    });

  //Commander
  var commanderViewModel = {
    command: ko.observable('m s 5'),
    execute: function() {
      unit.execute(commanderViewModel.command());
    }
  };
  ko.applyBindings(commanderViewModel, window.document.getElementById('commander'));

})(window, ko);
