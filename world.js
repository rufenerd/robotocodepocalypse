var World = function(initialState) {
  this.state = initialState;
}

World.prototype.updateFromPlayerState = function(player, playerState) {
  this.state = playerState;
  return this.state;
};

exports.World = World;