/** @type {{name: string, photoUrl: string, scores: number[]}[]} */
var friendList = [];

/** Adds a friend to the list and returns the entry for the closest match, or null if there are no previous entries */
function addFriend(name, photoUrl, scores) {
    var newEntry = {
        name: name,
        photoUrl: photoUrl,
        scores: scores,
    };
    var result = getClosestMatch(newEntry);
    
    friendList.push(newEntry);

    return result;
}

function getFriends() {
    return friendList;
}

function getClosestMatch(newEntry) {
    if (friendList.length == 0) return null;

    var closest = null;
    var diff = 1000;
    friendList.forEach(friend => {
        var newDiff = compareFriends(newEntry);
        if (newDiff < diff) {
            diff = newDiff;
            closest = friend;
        }
    });

    return closest;
}

function compareFriends(friend1, friend2) {
    var scoreLen = Math.min(friend1.scores.length, friend2.scores.length);
    var diff = 0;

    for (var i = 0; i < scoreLen; i++) {
        diff += Math.abs(friend1.scores[i] - friend2.scores[i]);
    }

    return diff;
}

module.exports = {
    addFriend: addFriend,
    getFriends: getFriends,
};