var _ = require('lodash');
var fs = require('fs');
var co = require('co');
var path = require('path');
var ejs = require('ejs');
var async = require('async');

//创建controller
function controller(rl, stage, config){
  var input_data = {};
  var questions = _.get(stage, 'controller.questions', []);
  var base = path.resolve(__dirname, _.get(stage, 'controller.base'));
  var template = require('../tmpls')(_.get(stage, 'controller.template'));

  async.eachLimit(questions, 1, function(item, next){
    var question = _.get(item, 'question');
    var field = _.get(item, 'field');

    rl.question(question, function(value){
      _.set(input_data, field, value);
      next();
    });
  }, function(err){
    var folder_name = base + '/' + _.get(input_data,'folder_name');
    var controller_name = _.get(input_data, 'controller_name') + 'Controller.php';
    var file_name = folder_name + '/' + controller_name;

    if(!fs.existsSync(folder_name)){
      mkdir('-p', folder_name);
    }

    var code = ejs.render(template, input_data);

    console.log('****************************************** \n');
    console.log(code + '\n');
    console.log('****************************************** \n');

    rl.question('确定 ？(y/n)', function(value){

      if(value.trim() === 'y'){
        echo(code).to(file_name);
      }

      rl.prompt();
    });
  });
}

//创建view
function view(rl, stage, config){

  rl.prompt();
};

module.exports = function(rl, stage, config){
  controller(rl, stage, config);
  //view(rl, stage, config);
};