var fs = require('fs');
var _ = require('lodash');
var path = __dirname + '/../../sample/';
var folder = ["5.11","5.14"];
var sub_folder = ["NORMAL_5X5","RANKED_SOLO"];
var files = fs.readdirSync(path + folder[0] + '/' + sub_folder[0]);
var output = [];
_.each(files,function(n){
    _.each(sub_folder,function(m){
        var region = n.split('.')[0].toLowerCase();
        var table = "version511";
        _.each(_.sample(JSON.parse(fs.readFileSync(path + "5.11/" + m + "/" + n,'utf8')),1000),function(i){
            output.push({table:table,region:region,id:i})
        })
        region = n.split('.')[0].toLowerCase();
        table = "version514";
        _.each(_.sample(JSON.parse(fs.readFileSync(path + "5.14/" + m + "/" + n,'utf8')),1000),function(i){
            output.push({table:table,region:region,id:i})
        })
    })
})

console.log(output[0]);
module.exports = output;