var config = require('./config.js');
var request = require('request');
var fs = require('fs');
var _ = require('lodash');
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
            if(_.isObject(data)){
                callback(null,data);
            } else {
                console.log(data);
                callback(data);
            }
        }
    })
}