var friends = require('../data/friends');

var routes = [
    {
        path: "/api/friends",
        method: "GET",
        func: function (req, res) {
            // res.writeHead(200, { "Content-Type": "text/json" });
            // res.write(JSON.stringify(friends.getFriends()));
            // res.end();
            res.json(friends.getFriends());
        }
    },
    {
        path: "/api/friends",
        method: "POST",
        func: function (req, res) {
            var data = req.body;
            var responseData;

            if (data && data.name && data.photoUrl && data.scores && data.scores.length == 10) {
                responseData = friends.addFriend(data.name, data.photoUrl, data.scores);
                responseData = responseData || { error: "No previous entries to compare to." };
            } else {
                responseData = response || { error: "User data invalid." };
            }

            // res.writeHead(200, { "Content-Type": "text/json" });
            // res.write(JSON.stringify(friends.getFriends()));
            // res.end();
            res.json(responseData);
        }
    },
];

module.exports = {
    routes: routes,
};