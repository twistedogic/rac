var config = require('./config.js');
var flatten = require('./util/flatten.js');
var request = require('request');
var apiKey = config.api_key;
var baseUrl = config.base_url;
module.exports = function(input,callback){
    switch (input.type) {
        case 'match':
            var url = baseUrl + input.region + '/v2.2/match/';
            break;
        case 'item':
            var url = baseUrl + 'static-data/' + input.region + '/v1.2/item/';
            break;
        // default:
        //     var url = baseUrl + '/static-data/na/v1.2/champion/';
    }
    url = url + input.id + '?api_key=' + apiKey;
    request(url,function(err,res,body){
        if(err){
            callback(err);
        } else {
            var data = JSON.parse(body);
            callback(null,data);
        }
    })
}