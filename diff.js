var diff = require('jsondiffpatch').diff;
var async = require('async');
var staticData = require('./lib/staticData.js');

var input = [{
    type:'item', version:'5.11.1'
},{
    type:'item', version:'5.14.1'
}];

async.map(input,staticData,function(err,res){
    if(err){
        console.log(err);
    } else {
        var delta = diff(res[0],res[1]);
        console.log(delta);
    }
})