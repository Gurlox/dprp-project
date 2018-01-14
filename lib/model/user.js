var db = require('./../../config/db');

var User = db.define("users", {
    login       : String,
    password    : String,
    name        : String,
    surname     : String,
    birthDate   : Date,
    isDeleted   : Boolean,
    role        : Number
}, {
   validations: {
     login: [db.validators.rangeLength(4, 30, 'Długość loginu jest niepoprawna.'),
             db.validators.patterns.match('^[a-zA-Z0-9\\-\\_]*$', 'Login zawiera niepoprawne znaki.')],
     name: db.validators.rangeLength(0, 100, 'Długość imienia jest niepoprawna.'),
     surname: db.validators.rangeLength(0, 100, 'Długość nazwiska jest niepoprawna.')
 },
    methods: {
        validatePassword: function(password) {
            return (password.length < 8 || password.length > 20);
        }
    }
});

module.exports = User;
