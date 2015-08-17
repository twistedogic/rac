var config = require('./config.js');
var request = require('request');
var fs = require('fs');
var apiKey = config.api_key;
var baseUrl = config.base_url;
module.exports = function(input,callback){
    var endpoint = new Function("return " + config.match)();
    var url = baseUrl + endpoint(input.region, input.id) + '?api_key=' + apiKey;
    request(url,function(err,res,body){
        if(err){
            callback(err);
        } else {
            var data = JSON.parse(body);
            console.log(data.queueType);
            callback(null,data);
        }
    })
}