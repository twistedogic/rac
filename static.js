var _ = require('lodash');
var async = require('async');
var fs = require('fs');
var staticData = require('./lib/staticData.js');
var config = require('./lib/config.js');
var version = ["5.14", "5.11"];
var terms = _.keys(config.staticData);
var path = './sample/';

var query =[];
_.each(version,function(n){
    _.each(terms,function(m){
        query.push({version:n+'.1',type:m});
    })
})

function getData(input,callback){
    staticData(input,function(err,res){
        if(err){
            callback(err);
        } else {
            var data = JSON.stringify(res);
            var v = input.version.split('.')[0] + '.' + input.version.split('.')[1];
            var filepath = path + v + '/' + input.type + '/' + input.type + '.json'
            fs.writeFile(filepath,data,function(err){
                if(err){
                    callback(err);
                } else {
                    callback(null,'file saved');
                }
            });
        }
    })
}
async.map(query,getData,function(err,res){
    if(err){
        console.log(err);
    } else {
        console.log(res);
    }
})