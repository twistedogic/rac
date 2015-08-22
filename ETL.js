var _ = require('lodash');
var fs = require('fs');
var async = require('async');
var config = require('./lib/config.js');
var toCSV = require('./lib/etl/toCSV.js')
var mapping = require('./lib/etl/mapping.js');
var flatten = require('./lib/util/flatten.js');
var query = require('./lib/query.js');
var fs = require('fs');
var filepath = './data/';

mapping({version:'5.11',type:'champion'},function(err,res){
    if(err){
        console.log(err);
    } else {
        var data = [];
        _.each(res.mapping,function(n){
            data.push({
                champion: _.keys(n)[0],
                query:{
                    key: Number(n[_.keys(n)[0]].key),
                    include_docs : true,
                    reduce:false
                }
            });
        });
        // testing
        var data = _.sample(data,3);
        async.eachSeries(data,function(el,next){
            exportCSV(el,function(err,res){
                if(!err){
                    console.log(res);
                    next();
                }
            }),function(done){
                console.log("complete!");
            }
        })
    }
});

function exportCSV(input,callback){
    var path = filepath + input.champion + '.csv';
    query(input.query,function(err,res){
        if(err){
            callback(err);
        } else {
            fs.writeFile(path,res,function(err){
                if(!err){
                    callback(null,path);
                } else {
                    callback(err);
                }
            })
        }
    })
    
}