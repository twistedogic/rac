var _ = require('lodash');
describe("Scrape Data",function(){
    it("fundamental info",function(done){
        this.timeout(10000);
        fundamental(["00005","2388"],function(err,res){
            if(_.isObject(res)){
                var key = _.keys(res);
                if(_.isArray(key) && key.length == 7){
                    done();
                }
            }
        })
    });
    it("options report",function(done){
        this.timeout(10000);
        options({
            symbol:["1"],
            date:["20140101","20150810"],
            page:3
        },function(err,res){
            if(_.isObject(res.soe[0]) && _.isObject(res.pcr[0])){
                done();
            }
        })
    });
    it("daily options report",function(done){
        this.timeout(10000);
        daily(["150810","150811"],function(err,res){
            if(_.isObject(res.dtop[0]) && _.isObject(res.rp[0]) && _.isObject(res.dqe[0])){
                done();
            }
        })
    });
})

describe("Output data",function(){
    it("toCSV",function(done){
        file(["00005","2388"],"csv",function(err,res){
            if(_.isArray(res.filepath)){
                done();
            }
        })
    });
    it("toJSON",function(done){
        file(["00005","2388"],"json",function(err,res){
            if(_.isArray(res.filepath)){
                done();
            }
        })
    });
})