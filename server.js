//// Boiler Plate ////////////////////////////////////////////////

/*  friend-finder
    Helps you find friends. \o/ (not really... /o\)

    Thomas Hudson
    No Rights Reserved */

//// External modules ///////////////////////////////////////////////

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var apiRoutes = require('./app/routing/apiRoutes');

/////////////////////////////////////////////////////////////////////

function addRoutes(routes) {
    routes.forEach(route => {
        if (route.method == 'GET') {
            app.get(route.path, route.func);
        } else if (route.method == 'POST') {
            app.post(route.path, route.func);
        }
    });
}

/////////////////////////////////////////////////////////////////////

var app = express();
var PORT = process.env.PORT || 80;
addRoutes(apiRoutes.routes);

app.get('/', (req, res) => {
    res.send('Nobody here but us chickens!');
});

var httpServer = app.listen(PORT, function () {
    console.log('Listening on port ' + PORT + '...');
});

