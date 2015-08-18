var _ = require('lodash');
var fs = require('fs');
var flatten = require('./util/flatten.js');
var schema = require('./schema.js');
module.exports = function(input){
    var id = input.matchId.toString();
    var type = input.queueType;
    var team = flatten(input.teams);
    var player = input.participants;
    for (var i = 0; i < player.length; i++) {
        player[i] = flatten(player[i]);
        player[i]._id = id + player[i].participantId;
        player[i].matchType = type;
        player[i].region = input.region;
        player[i].version = input.matchVersion;
    };
    return player
}