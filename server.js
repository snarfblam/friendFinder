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
var htmlRoutes = require('./app/routing/htmlRoutes');

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

process.env.htmlRoot = path.join(__dirname, "app", "public_html");

var app = express();
var PORT = process.env.PORT || 80;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join('app', 'public_html')));

addRoutes(apiRoutes.routes);
addRoutes(htmlRoutes.routes);

var httpServer = app.listen(PORT, function () {
    console.log('Listening on port ' + PORT + '...');
});

