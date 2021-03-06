/*// Boiler-Plate ////////////////////////////////////////////////
 *
 *   friend-finder
 *   Helps you find friends. \o/ (not really... /o\)
 *
 *   Thomas Hudson
 *   No Rights Reserved 
 */


//// External modules ///////////////////////////////////////////////

var path = require('path');
var express = require('express');
// var bodyParser = require('body-parser'); // no need
var fs = require('fs');
var apiRoutes = require('./app/routing/apiRoutes');
var htmlRoutes = require('./app/routing/htmlRoutes');


//// Functions //////////////////////////////////////////////////////

function addRoutes(routes) {
    routes.forEach(route => {
        if (route.method == 'GET') {
            app.get(route.path, route.func);
        } else if (route.method == 'POST') {
            app.post(route.path, route.func);
        }
    });
}


//// Application ////////////////////////////////////////////////////

process.env.htmlRoot = path.join(__dirname, "app", "public_html");

var app = express();
var PORT = process.env.PORT || 80;

// No need
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join('app', 'public_html')));

addRoutes(apiRoutes.routes);
addRoutes(htmlRoutes.routes);

addRoutes(apiRoutes.lowPriorityRoutes);
addRoutes(htmlRoutes.lowPriorityRoutes);

var httpServer = app.listen(PORT, function () {
    console.log('Listening on port ' + PORT + '...');
});

