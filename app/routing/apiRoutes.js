var friends = require('../data/friends');

var routes = [
    {
        path: "/api/friends",
        type: "GET",
        func: function (req, res) {
            res.writeHead(200, { "Content-Type": "text/json" });
            res.end(JSON.stringify(friends.getFriends));
        }
    }
];

module.exports = {
    routes: routes,
};