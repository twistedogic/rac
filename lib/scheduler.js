var PouchDB = require('pouchdb');
var fs = require('fs');
var schema = require('./schema.js');
var config = require('./config.js');
var match = require('./match.js');
var processData = require('./data.js');
var createTarget = require('./util/createTarget.js');
var async = require('async');
var _ = require('lodash');

var ip = config.db;
var db = new PouchDB('http://' + ip + ':5984/match');

function writeToDB(input,callback){
    match(input,function(err,res){
        if(err){
            callback(input);
        } else {
            var data = processData(res);
            fs.writeFileSync('/data/' + input.id + input.table + input.region + '.json', JSON.stringify(res));
            db.bulkDocs(data,function(err,res){
                callback(err,res);
            })
        }
    })
}

module.exports = function(input,callback){
    var targets = createTarget(input);
    async.eachSeries(targets,function(el, next) {
        writeToDB(el,function(err,res){
            if(err){
                console.log(err);
                process.exit(1);
            }
            setTimeout(function () {
                console.log(el);
                next();
            },3100);
        })
    }, function(done) {
        callback(null,'finished');
        console.log('finished');
    });
}