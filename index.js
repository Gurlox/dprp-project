var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');
var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));

var apiRoutes = express.Router();

apiRoutes.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

app.use('/api', apiRoutes);

require('./config/router.js')(app);

app.listen(3000, function(){
   console.log("Listening on port 3000!");
});
