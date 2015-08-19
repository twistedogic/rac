var _ = require('lodash');
var config = require('../config.js');

module.exports = function(input,prop){
    var data = input;
    var schema = {};
    var keys = [];
    _.each(data,function(n){
        var tmp = n;
        if(prop){
            tmp = n[prop];
        }
        keys.push(_.keys(tmp));
    });
    keys = _.uniq(_.flatten(keys));
    return keys;
}