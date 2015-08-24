var fs = require('fs');
var _ = require('lodash');
var config = require('./lib/config.js');
var scheme = require('./lib/scheme.js');
var toJSON = require('./lib/etl/toJSON.js');

var dir = __dirname + "/data";
var path = __dirname + "/public";
fs.readdir(dir,function(err,res){
    if(!err){
        var header = fs.readFileSync(dir + '/' + res[0],'utf8').split('\n')[0];
        var key = header.split(',');
        fs.writeFileSync(path + '/data.csv', header);
        var seed = fs.readFileSync(dir + '/' + res[0],'utf8').split('\n')[1];
        var json = {};
        for (var i = 0; i < key.length; i++) {
            json[key[i]] = seed.split(',')[i];
        }
        fs.writeFileSync(path + '/data.json', JSON.stringify(json));
        res.map(function(file){
            console.log(file);
            var data = fs.readFileSync(dir + '/' + file,'utf8');
            data = data.split('\n');
            data.shift();
            _.each(data,function(n){
                var json = {};
                var tmp = n.split(',');
                for (var i = 0; i < key.length; i++) {
                    json[key[i]] = tmp[i];
                }
                fs.appendFileSync(path + '/data.json', ',\n' + JSON.stringify(json));
            })
            data = data.join('\n');
            fs.appendFileSync(path + '/data.csv','\n' + data);
        })
        
    } else {
        console.log(err);
    }
})

