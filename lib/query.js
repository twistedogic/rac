var _ = require('lodash');
var config = require('./config.js');
var schema = require('./etl/schema.js')
var PouchDB = require('pouchdb');
var ip = config.db;
var db = new PouchDB('http://' + ip + ':5984/match');

// db.allDocs({
//     include_docs:true
// }).then(function(res){
//     console.log(res.rows[0]);
//     console.log(schema(res.rows,'doc'));
// }).catch(function(err){
//     console.log(err);
// })

var myMapReduceFun = {
  map: function (doc) {
    emit(doc.version.split('.')[1]);
  },
  reduce: '_count'
};
// count the pokemon whose names start with 'P'
db.query(myMapReduceFun, {
  key: '11', reduce: false, include_docs : true
}).then(function (result) {
    console.log(result);
}).catch(function (err) {
    console.log(err);
});