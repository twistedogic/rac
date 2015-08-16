var _ = require('lodash');
var bard = require('../lib/bard.js');
describe("Scrape Data",function(){
    it("match data",function(done){
        bard({
            id:1907069332,
            type:'match',
            region:'na',
            timeout:0
        },function(err,res){
            if(_.isObject(res)){
                done();
            }
        })
    });
})