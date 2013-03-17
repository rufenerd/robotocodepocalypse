var World = function(initialState) {
  this.state = initialState;
}

World.prototype.updateFromPlayerState = function(player, playerState) {
  this.state += playerState;
  console.log("new state: ", this.state);
  return this.state;
};

exports.World = World;