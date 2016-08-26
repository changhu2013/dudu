require('shelljs/global');
var _ = require('lodash');
var config = require('config');
var readline = require('readline');
var co = require('co');
var path = require('path');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

show_menu();
rl.prompt();

rl.on('line', function(line){
  var menu_config = config.get('menu.' + line.trim());
  var command = _.get(menu_config, 'command');
  var stage = _.get(menu_config, 'stage');

  try{require(command)(rl, stage, menu_config);}catch(e){console.error(e);};
  rl.prompt();
});

rl.on('close', function(){
  console.log('bye');
  process.exit(0);
});

function show_menu(){
  var menu = config.get('menu');
  var buf = [];

  _.each(menu, function(item, key){
    buf.push(key + ':' + _.get(item, 'title'));
  });

  console.log(buf.join('\n'));
};