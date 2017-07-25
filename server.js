var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');

var app = express();

//****** Middleware

app.use(bodyParser.json());
app.use(express.static('src'));

var runServer = function(callback) {
    
    app.listen(config.PORT, function() {
        console.log('Listening on localhost:' + config.PORT);
        if (callback) {
            callback();
        }
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
}