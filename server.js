var express = require('express');
var less = require('less-middleware');
var path = require('path');
var os = require('os');

var app = express();
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

app.listen(3000);
console.log('Server listening on port 3000.');
