var _ = require('./public/js/libs/underscore/underscore');

var World = function(initialState) {
  this.state = initialState;
  this.players = [];
}

World.prototype.uniqueName = function(name) {
  var suffixNum = 2;
  var baseName = name;
  while (_.include(this.players, name) ) {
    name = baseName + "_" + suffixNum;
    suffixNum += 1;
  }
  return name
};

World.prototype.addPlayer = function(name) {
  this.players.push(name);
  return name;
};

World.prototype.updateFromPlayerState = function(player, playerState) {
  if (_.isUndefined(this.state[player])) {
    this.state[player] = {};
  }

  _.extend(this.state[player], playerState);

  console.log("state on server: ", this.state);

  return this.state;
};

World.prototype.currentState = function(){
  return this.state;
};

exports.World = World;