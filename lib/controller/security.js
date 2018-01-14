var bcrypt = require("bcrypt");
var db = require("./../../config/db");
var jwt = require('jsonwebtoken');
var User = require("./../model/user");

module.exports.login = function(req, res) {
    User.find({ login: req.body.login }, function(err, results) {
        if (err) {
            res.status(400).send(JSON.stringify({
                success: false
            }));
        } else {
            bcrypt.compare(req.body.password, results[0].password, function(err, bcryptRes) {
                console.log(bcryptRes);
                if (bcryptRes == true) {
                    const payload = {
                        id: results[0].id
                    };
                    var token = jwt.sign(payload, 'todoSecret', {
                        expiresIn: 144000000
                    });

                    res.status(200).send(JSON.stringify({
                        success: true,
                        token: token
                    }));
                } else {
                    res.status(400).send(JSON.stringify({
                        success: false
                    }));
                }
            });
        }
    });
};
