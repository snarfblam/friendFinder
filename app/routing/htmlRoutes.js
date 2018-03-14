var fs = require('fs');
var path = require('path');

var routes = [
    {
        path: "/survey",
        method: "GET",
        func: function (req, res) {
            sendFile(res, 'survey.html');
        }
    },

    {
        path: "/*",
        method: "GET",
        func: function (req, res) {
            sendFile(res, 'home.html');
        }
    },

];

/** Returns a boolean indicating whether or not the file was sent. */
function sendFile(response, relativePath) {
    var absPath = path.join(process.env.htmlRoot, relativePath);
    if (!fs.existsSync(absPath)) return false;
    response.sendFile(absPath);
    
}

module.exports = {
    routes: routes,
};