var World = function(initialState) {
  this.state = initialState;
}

World.prototype.updateFromPlayerState = function(player, playerState) {
  // TODO use _ isUndefined and extend

  if (this.state[player] === (void 0)) {
    this.state[player] = {};
  }

  for (var attrname in playerState) {
    this.state[player][attrname] = playerState[attrname];
  }

  return this.state;
};

exports.World = World;