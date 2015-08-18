var scheduler = require('./lib/scheduler.js');
var datapoint = process.argv[2] || 1000;
scheduler(datapoint,function(err,res){
    if(res){
        process.exit(0);
    }
})