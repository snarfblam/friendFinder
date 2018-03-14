var friends = require('../data/friends');

var routes = [
    {
        path: "/api/friends",
        method: "GET",
        func: function (req, res) {
            res.writeHead(200, { "Content-Type": "text/json" });
            res.write(JSON.stringify(friends.getFriends()));
            res.end();
        }
    }
];

module.exports = {
    routes: routes,
};