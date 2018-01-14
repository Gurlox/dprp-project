var db = require('./../../config/db.js');

var Role = db.define("roles", {
    name : String
});

module.exports = Role;