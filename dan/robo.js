window.onload = function(){
  Crafty.init(600, 300);
  Crafty.background('rgb(127,127,127)');

  //Unit
  var unit = Crafty.e("2D, Canvas, Color, Multiway")
	  .attr({ x: 300, y: 150, w: 10, h: 10})
	  .color('rgb(0,0,255)')
    .multiway(1, {})
    .disableControl();

  unit.execute = function(cmd){
    cmd = cmd.split(" ");

    if (cmd[0] == "move" || cmd[0] == "m") {
      var numLeftToMove = _.isUndefined(cmd[2]) ? 1 : parseInt(cmd[2]);

      if (numLeftToMove === 0) {
        return;
      } else {
        switch (cmd[1]) {
        case "north":
        case "n":
          this.y -= 10;
          break;
        case "south":
        case "s":
          this.y += 10;
          break;
        case "east":
        case "e":
          this.x += 10;
          break;
        case "west":
        case "w":
          this.x -= 10;
          break;
        }

        this.attr({ x: this.x, y: this.y });
        unit.execute([cmd[0], cmd[1], numLeftToMove - 1].join(" "));
      }
    }
  }

  //Commander
  $("#command_button").on("click", function(){
    cmd = $("#command_input").val();
    unit.execute(cmd);
  });
}