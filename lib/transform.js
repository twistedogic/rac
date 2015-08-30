var _ = require('lodash');
var fs = require('fs');
var mapping = require('./etl/mapping.js');
var path = __dirname + '/../result/';
var dir = fs.readdirSync(path);
var output = {};
_.each(dir,function(n){
    var keyname = n.split('.')[0];
    var data = fs.readFileSync(path + n,'utf8');
    data = data.split('\n');
    data = _.filter(data, function(m) {
        return m != "";
    });
    data = "[" + data.join(',') + "]";
    output[keyname] = JSON.parse(data); 
})
function sum(input,options){
    var result = {
        '5_11':{},
        '5_14':{}
    };
    _.each(input,function(n){
        var v = n.version.replace('.','_');
        if(result[v][n.item]){
            result[v][n.item] += n[options];
        } else {
            result[v][n.item] = n[options];
        }
    })
    return result
}
function sumChamp(input,options){
    var result = {
        '5_11':{},
        '5_14':{}
    };
    _.each(input,function(n){
        var v = n.version.replace('.','_');
        if(result[v][n.championId]){
            if(result[v][n.championId][n.item]){
                result[v][n.championId][n.item] += n[options];
            } else {
                result[v][n.championId][n.item] = n[options];
            }
        } else {
            var json = {};
            json[n.item] = n[options];
            result[v][n.championId] = json;
        }
    })
    return result
}
function hierarchize(input){
    var result = {
        '5_11':{},
        '5_14':{}
    };
    _.each(input,function(n){
        var v = n.version.replace('.','_');
        var key = _.keys(n);
        var json = {};
        _.each(key,function(m){
            if(m != 'version'){
                json[m] = Math.floor(n[m]);
            }
        })
        if(n.championId){
            result[v][n.championId] = json;
        } else {
            result[v] = json;
        }
        
    })
    return result;
}
_.each(_.keys(output),function(n){
    if(n.indexOf('item') == -1){
        output[n] = hierarchize(output[n]);
    }
})
output.item = sum(output.item,'value');
output.item_lose = sum(output.item_lose,'value');
output.item_win = sum(output.item_win,'value');
output.champion_item = sumChamp(output.champion_item,'pick');

module.exports = output;
