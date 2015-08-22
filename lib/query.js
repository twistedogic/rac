var _ = require('lodash');
var config = require('./config.js');
var toCSV = require('./etl/toCSV.js');
var PouchDB = require('pouchdb');
var ip = config.db;
var db = new PouchDB('http://' + ip + ':5984/match',{ajax: {timeout: 1000000}});

var MapReduce = {
    map: function (doc) {
        // emit([doc.version.split('.')[1],doc.championId]);
        emit(doc.championId);
    },
    reduce: '_count'
};

module.exports = function(input,callback){
    db.query(MapReduce,input).then(function(res){
        callback(null,toCSV(_.map(res.rows,'doc'),10,'stats'));
    }).catch(function(err){
        console.log(err);
        callback(err);
    })
}
