var Firebase = require('firebase');
var _ = require('lodash');
var async = require("async");
var config = require('./lib/config.js');
var result = require('./lib/transform.js');
var mapping = require('./lib/etl/mapping');
var glm_result = require('./lib/glm_result.js');
var baseurl = "https://rac2.firebaseio.com";
var rootRef = new Firebase(baseurl);
function authHandler(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
}
// Authenticate users with a custom authentication token
rootRef.authWithCustomToken(config.firebase, authHandler);
rootRef.set(result);
rootRef.child("glm").set(glm_result);
mapping({version:'5.11', type:'champion'},function(err,res){
    var data = res.mapping;
    var json = {};
    _.each(data,function(n){
        var name = _.keys(n)[0];
        json[n[name].key] = {
            name: name,
            image: n[name].image
        }
    })
    rootRef.child("mapping/champion/5_11").set(json);
})
mapping({version:'5.14', type:'champion'},function(err,res){
    var data = res.mapping;
    var json = {};
    _.each(data,function(n){
        var name = _.keys(n)[0];
        json[n[name].key] = {
            name: name,
            image: n[name].image
        }
    })
    rootRef.child("mapping/champion/5_14").set(json);
})
mapping({version:'5.11', type:'item'},function(err,res){
    var data = res.mapping;
    var json = {};
    _.each(data,function(n){
        var name = _.keys(n)[0];
        json[name] = {
            name: n[name].name,
            image: n[name].image
        }
    })
    rootRef.child("mapping/item/5_11").set(json);
})
mapping({version:'5.14', type:'item'},function(err,res){
    var data = res.mapping;
    var json = {};
    _.each(data,function(n){
        var name = _.keys(n)[0];
        json[name] = {
            name: n[name].name,
            image: n[name].image
        }
    })
    rootRef.child("mapping/item/5_14").set(json);
})

