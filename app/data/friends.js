/** @type {{name: string, photoUrl: string, scores: number[]}[]} */
var friendList = [];

function addFriend(name, photoUrl, scores) {
    friendList.push({
        name: name,
        photoUrl: photoUrl,
        scores: scores,
    });
}

function getFriends() {
    return friendList;
}

module.exports = {
    addFriend: addFriend,
    getFriends: getFriends,
};