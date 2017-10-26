var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mysql = require("mysql");
var path = require('path');

var user = require('./model/user.js');

var con = mysql.createConnection({
  host: "mysql.wmi.amu.edu.pl",
  user: "s426106",
  password: "kaczkakaczka"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
   res.send('Hello World');
});

// app.post('/api/users', function(req, res){
//    var user = new Todo(req.body.name != undefined ? {name: req.body.name} : {});
//    todo.save();
//    res.status(201).send('api/todos/' + todo.id);
// });

app.listen(3000, function(){
   console.log("Listening on port 3000!");
});
