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
   methods: {
      validatePassword(password) {
         if (password.length < 5 || password.length > 40) {
            return {
               success: false,
               message: "Długość hasła jest nieprawidłowa."
            };
         }
         return {
            success: true
         };
      }
   },
   validations: {
     login: [db.validators.rangeLength(4, 30, 'Długość loginu jest niepoprawna.'),
             db.validators.patterns.match('^[a-zA-Z0-9\\-\\_]*$', 'Login zawiera niepoprawne znaki.')],
     name: db.validators.rangeLength(0, 100, 'Długość imienia jest niepoprawna.'),
     surname: db.validators.rangeLength(0, 100, 'Długość nazwiska jest niepoprawna.')
   }
});

module.exports = User;
