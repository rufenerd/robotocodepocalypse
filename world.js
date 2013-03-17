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

  console.log("state on server: ", this.state);

  return this.state;
};

World.prototype.currentState = function(){
  return this.state;
};

exports.World = World;