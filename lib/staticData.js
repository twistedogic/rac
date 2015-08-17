var config = require('./config.js');
var _ = require('lodash');
var request = require('request');
var baseUrl = config.static_base;
module.exports = function(input,callback){
    var endpoint = new Function("return " + config.staticData[input.type])();
    var url = baseUrl + endpoint(input.version)
    request(url,function(err,res,body){
        if(err){
            callback(err);
        } else {
            var data = JSON.parse(body);
            callback(null,data);
        }
    })
}