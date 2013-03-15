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

    console.log("received:", cmd);

    if (cmd[0] == "move" || cmd[0] == "m") {
      var speed = cmd[2] || 1;
      switch (cmd[1]) {
      case "north":
      case "n":
        this.attr({ x: this.x, y: this.y - speed * 10 });
        break;
      case "south":
      case "s":
        this.attr({ x: this.x, y: this.y + speed * 10 });
        break;
      case "east":
      case "e":
        this.attr({ x: this.x + speed * 10, y: this.y});
        break;
      case "west":
      case "w":
        this.attr({ x: this.x - speed * 10, y: this.y });
        break;
      }
    }
  }

  //Commander
  $("#command_button").on("click", function(){
    cmd = $("#command_input").val();
    unit.execute(cmd);
  });
}