var PouchDB = require('pouchdb');
var fs = require('fs');
var schema = require('./schema.js');
var config = require('./config.js');
var LolApi = require('leagueapi');
var processData = require('./data.js');
var createTarget = require('./util/createTarget.js');
var async = require('async');
var _ = require('lodash');

LolApi.init(config.api_key, 'na');
var ip = config.db;
var db = new PouchDB('http://' + ip + ':5984/match');

function writeToDB(input,callback){
    LolApi.getMatch(input.id, [includeTimeline = true], input.region, function(err,res){
        setTimeout(function(){
            if(err){
                setTimeout(function(){
                    // console.log(JSON.stringify(input) + ' , ' + err);
                    callback(null,err);
                },80000);
            } else {
                var data = processData(res);
                fs.writeFileSync('/data/' + input.id + input.table + input.region + '.json', JSON.stringify(res));
                db.bulkDocs(data,function(err,res){
                    callback(null,res);
                })
            }
        },1500)
    })
}

module.exports = function(input,callback){
    var targets = createTarget(input);
    async.eachSeries(targets,function(el, next) {
        writeToDB(el,function(err,res){
            if(!err){
                next();
                if(!_.isArray(res)){
                    console.log(res);
                } else {
                    console.log(el);
                }
            } else {
                console.log(err);
            }
        })
    }, function(done) {
        callback(null,'finished');
        console.log('finished');
    });
}