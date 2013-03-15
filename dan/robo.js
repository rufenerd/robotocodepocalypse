window.onload = function(){
  Crafty.init(900, 600);
  Crafty.background('rgb(127,127,127)');
  TILE_SIZE = 5;
  TURN_TIME = 1;

  //Unit
  var unit = Crafty.e("2D, Canvas, Color, Multiway, Delay")
	  .attr({ x: 300, y: 150, w: 10, h: 10})
	  .color('rgb(0,0,255)')
    .multiway(1, {})
    .disableControl();

  unit.execute = function(cmd){
    cmd = cmd.split(" ");

    if (cmd[0] == "move" || cmd[0] == "m") {
      var distanceToTravel = _.isUndefined(cmd[2]) ? 1 : parseInt(cmd[2]);

      if (distanceToTravel === 0) {
        return;
      } else {
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
        distanceToTravel -= 1;

        if (distanceToTravel) {
          console.log(this);
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