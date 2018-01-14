var mysql = require("mysql");
var config = require('./config');
var orm = require('orm');

var db = orm.connect('mysql://'+config.db.user+':'+config.db.password+'@'+config.db.host+'/'+config.db.database);

db.on('connect', function(err) {
    if (err) return console.error('Connection error: ' + err);
});

module.exports = db;
