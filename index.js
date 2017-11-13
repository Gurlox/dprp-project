var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

require('./config/router.js')(app);

app.listen(3000, function(){
   console.log("Listening on port 3000!");
});
