//controllers
var user = require('./../lib/controller/user');

module.exports = function(app){

    app.get('/', function (req, res) {
        res.send('Hello World');
    });
    //users
    app.post('/api/users', user.post);
    app.get('/api/users/:id', user.getOne);
    app.get('/api/users', user.getAll);
    app.patch('/api/users/:id', user.patch);
};