var _ = require('lodash');
var assert = require('assert');
var fs = require('fs');
var sample = fs.readFileSync('../sample/matches1.json');
sample = JSON.parse(sample);
sample = _.sample(sample.matches);
var match = require('../lib/match.js');
var staticData = require('../lib/staticData.js');
var data = require('../lib/data.js');
var createTarget = require('../lib/util/createTarget.js');
describe("Scrape Data",function(){
    it("normal match data",function(done){
        match({
            id:1852548676,
            region:'na'
        },function(err,res){
            if(_.isObject(res)){
                done();
            }
        })
    });
    it("ranked match data",function(done){
        match({
            id:1852538938,
            region:'na'
        },function(err,res){
            if(_.isObject(res)){
                done();
            }
        })
    });
    it("champion data",function(done){
        staticData({
            id:34,
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
})

describe("Scheduler",function(){
    it("create targets",function(){
        _.isArray(createTarget);
    });
})