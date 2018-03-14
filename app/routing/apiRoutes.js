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
    },
    {
        path: "/api/friends",
        method: "POST",
        func: function (req, res) {
            var data = req.body;
            if (data && data.name && data.photoUrl && data.scores && data.scores.length == 10) {
                friends.addFriend(data.name, data.photoUrl, data.scores);
                res.send(true);
            } else {
                res.send(false);
            }

            // todo: perform compatability servey and send result
        }
    },
];

module.exports = {
    routes: routes,
};