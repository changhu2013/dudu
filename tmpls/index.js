
var fs = require('fs');
var path = require('path');

function index(tmpl){
  var buf = fs.readFileSync(path.resolve(__dirname, tmpl + '.ejs'));
  return buf ? buf.toString() : '';
}

module.exports = index;