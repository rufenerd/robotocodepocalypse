window.onload = function(){
  CANVAS_HEIGHT = 600;
  CANVAS_WIDTH = 900;

  Crafty.init(CANVAS_WIDTH, CANVAS_HEIGHT);
  Crafty.background('rgb(127,127,127)');
  TILE_SIZE = 5;
  TURN_TIME = 1;

  //Walls
  var leftWall = Crafty.e("2D, solid")
    .attr({ x: -1, y: 0, w: 1, h: CANVAS_HEIGHT});

  var rightWall = Crafty.e("2D, solid")
    .attr({ x: CANVAS_WIDTH, y: 0, w: 1, h: CANVAS_HEIGHT});

  var topWall = Crafty.e("2D, solid")
    .attr({ x: 0, y: -1, w: CANVAS_WIDTH, h: 1});

  var leftWall = Crafty.e("2D, solid")
    .attr({ x: 0, y: CANVAS_HEIGHT, w: CANVAS_WIDTH, h: 1});


  //Unit
  var unit = Crafty.e("2D, Canvas, Color, Multiway, Delay, Collision")
	  .attr({ x: 300, y: 150, w: 10, h: 10})
	  .color('rgb(0,0,255)')
    .multiway(1, {})
    .disableControl()
    .bind('Moved', function(from) {
      if(this.hit('solid')){
        this.attr({x: from.x, y:from.y});
      }
    });

  unit.execute = function(cmd){
    cmd = cmd.split(" ");

    if (cmd[0] == "move" || cmd[0] == "m") {
      var distanceToTravel = _.isUndefined(cmd[2]) ? 1 : parseInt(cmd[2]);

      if (distanceToTravel === 0) {
        return;
      } else {
        var oldX = this.x;
        var oldY = this.y;

        switch (cmd[1]) {
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
          this.delay(function(){
            this.execute([cmd[0], cmd[1], distanceToTravel].join(" "));
          }, TURN_TIME)
        }
      }
    }
  }

  //Commander
  $("#command_button").on("click", function(){
    cmd = $("#command_input").val();
    unit.execute(cmd);
  });
}