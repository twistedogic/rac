var _ = require('lodash');
var async = require('async');
var fs = require('fs');
var staticData = require('../staticData.js');
var config = require('../config.js');
var field = config.mapping;

module.exports = function(input,callback){
    var query = {
        version:input.version + '.1',
        type:input.type
    }
    staticData(query,function(err,res){
        if(err){
            callback(err);
        } else {
            var info = res.data;
            var mapping = [];
            _.each(_.keys(info),function(m){
                var json = {};
                var value = {};
                _.each(field[input.type],function(n){
                    value[n] = info[m][n];
                })
                json[m] = value;
                mapping.push(json);
            })
            var data = {
                version:res.version,
                type:res.type,
                mapping:mapping
            }
            callback(null,data);
        }
    })
}
