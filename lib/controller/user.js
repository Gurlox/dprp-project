var bcrypt = require("bcrypt");
var db = require("./../../config/db");
var User = require("./../model/user");
var Role = require("./../model/role");

module.exports.post = function(req, res) {
    if (typeof req.body.login === 'undefined' && typeof req.body.password === 'undefined') {
        res.status(400).send(JSON.stringify({
             success: false
        }));
    } else {
        var saltRounds = 10;
        var hash = bcrypt.hashSync(req.body.password, saltRounds);

        Role.one({"name": "user"}, function (err, result) {
            User.create([{
                login: req.body.login,
                password: hash,
                role: result.id
            }], function (err, result) {
                if (err) {
                    res.status(400).send(JSON.stringify({
                        success: false,
                        message: err.msg
                    }));
                } else {
                    res.send(201, JSON.stringify({
                        success: true
                    }));
                }
            });
        });
    }
};

module.exports.getOne = function(req, res) {
    var id = req.params.id;

    db.driver.execQuery(`SELECT login, name, surname, birthDate, isDeleted 
        FROM users WHERE id=?`, [id], function (err, result) {
            if (err) {
                res.status(400).send(JSON.stringify({
                    success: false
                }));
            } else {
                res.status(200).send(JSON.stringify({
                    success: true,
                    user: result
                }));
            }
        }
    );
};

module.exports.getAll = function(req, res) {
    db.driver.execQuery(`SELECT login, name, surname, birthDate, isDeleted 
        FROM users`, function (err, result) {
            if (err) {
                res.status(400).send(JSON.stringify({
                    success: false
                }));
            } else {
                res.status(200).send(200, JSON.stringify({
                    success: true,
                    users: result
                }));
            }
        }
    );
};

module.exports.patch = function(req, res) {
    var id = req.params.id;
    var body = req.body;

    User.get(id, function(err, user) {
        for (key in body) {
            if (typeof user[key] === 'undefined' || key === 'login' || key === 'role') {
                res.status(400).send(JSON.stringify({
                    success: false
                }));

                return;
            }
            if (key === 'password') {
                var saltRounds = 10;
                var hash = bcrypt.hashSync(body[key], saltRounds);
                user[key] = hash;
            } else {
                user[key] = body[key];
            }
        }

        user.save(function (err) {
            if (err) {
                res.status(400).send(JSON.stringify({
                    success: false,
                    message: err.msg
                }));
            } else {
                res.send(JSON.stringify({
                    success: true
                }));

            }
        });
    });
};