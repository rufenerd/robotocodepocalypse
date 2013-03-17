requirejs.config({
  baseUrl: '/js',
  paths: {
    'jquery'    : 'libs/jquery/jquery',
    'underscore': 'libs/underscore/underscore',
    'backbone'  : 'libs/backbone/backbone',
    'knockout'  : 'libs/knockout/knockout',
    'crafty'    : 'libs/crafty/crafty',
    'bootstrap' : 'libs/bootstrap/bootstrap',
    'text'      : 'libs/require/text'
  },
  shim: {
    'jquery'    : { exports: '$' },
    'underscore': { exports: '_' },
    'backbone'  : { deps: ['underscore', 'jquery'], exports: 'Backbone' },
    'knockout'  : { exports: 'ko' },
    'crafty'    : { exports: 'Crafty' },
    'bootstrap' : { deps: ['jquery'] }
  },
  packages: ["game"]
});

requirejs(['game', 'game/entities/unit', 'game/viewmodels/commander'], function(Game, UnitFactory, CommanderViewModel) {
  Game.initialize();
  var unit = UnitFactory.create(Game);
  var commander = new CommanderViewModel({ el: '#commander' });
  commander.on('executecommand', unit.execute);
});
