var _ = require('lodash');
var assert = require('assert');
var fs = require('fs');
var sample = fs.readFileSync('./sample/match.json');
sample = JSON.parse(sample);
var staticData = require('../lib/staticData.js');
var data = require('../lib/data.js');
var createTarget = require('../lib/util/createTarget.js');
var schema = require('../lib/etl/schema.js');
var query = require('../lib/query.js');
describe("Scrape Data",function(){
    it("champion data",function(done){
        staticData({
            type:'champion',
            version:"5.15.1"
        },function(err,res){
            if(_.isObject(res)){
                done();
            }
        })
    });
    it("item data",function(done){
        staticData({
            id:3303,
            type:'item',
            version:"5.15.1"
        },function(err,res){
            if(_.isObject(res)){
                done();
            }
        })
    });
    it("mastery data",function(done){
        staticData({
            id:3303,
            type:'mastery',
            version:"5.15.1"
        },function(err,res){
            if(_.isObject(res)){
                done();
            }
        })
    });
    it("rune data",function(done){
        staticData({
            id:3303,
            type:'rune',
            version:"5.15.1"
        },function(err,res){
            if(_.isObject(res)){
                done();
            }
        })
    });
    it("summoner data",function(done){
        staticData({
            id:3303,
            type:'summoner',
            version:"5.15.1"
        },function(err,res){
            if(_.isObject(res)){
                done();
            }
        })
    });
})

describe("Process Data",function(){
    it("punch flat the data",function(){
        _.isObject(data(sample));
    });
    it("define schema",function(){
        _.isObject(schema([sample]));
    })
    it("couchdb mapreduce",function(done){
        query(function(err,res){
            if(!err){
                done();
            }
        })
    })
})

describe("Scheduler",function(){
    this.timeout(800000);
    it("create targets",function(){
        var count = 1000
        assert.equal(count*40,createTarget(count).length);
    });
})

