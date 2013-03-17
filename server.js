var express = require('express');
var less = require('less-middleware');
var path = require('path');
var os = require('os');
var socket = require('socket.io');

var World = require('./world').World;

var app = express();
var http = require('http');
var server = http.createServer(app)
var io = require('socket.io').listen(server);

var pubDir = path.join(__dirname, 'public');
var tmpDir = os.tmpDir();
var bootstrapDir = path.join(__dirname, 'node_modules', 'bootstrap');

app.configure(function () {
  
  app.use(less({
    src: pubDir,
    dest: tmpDir,
    paths: [path.join(bootstrapDir, 'less')],
    compress: true
  }));

  app.use('/js', express.static(path.join(bootstrapDir, 'js')));
  app.use('/img', express.static(path.join(bootstrapDir, 'img')));
  app.use("/", express.static(pubDir));
  app.use(express.static(tmpDir));
});

var world = new World({});

server.listen(3000);

io.sockets.on('connection', function(client) {
  console.log('Client connected...');

  client.on('join', function(name) {
    console.log("Name of client:", name);
    this.name = name;
  });

  client.on('playerStateUpdate', function(playerState){
    var newState = world.updateFromPlayerState(this.name, JSON.parse(playerState));
    client.broadcast.emit("newState", newState);
  });

});

console.log('Server listening on port 3000.');
