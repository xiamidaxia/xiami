var xpm = require('xpm')
var Fiber = require('fibers')

var xpm = require('xpm').serverCreate({
    cwd: __dirname
})

/*Fiber(function() {
    xpm.require('meteor/mongo-livedata')
    var Meteor = xpm.require('meteor/meteor')
    var c = new Meteor.Collection("newTest2", {idGeneration: "MONGO"})
    c.insert({foo: 'x', length: 55}, function(err, id) {
        var a = c.findOne(id)
        console.log(a)
    })
    c.find().forEach(function(d) {
        console.log(d)
    })
}).run()*/

xpm.test([
    //"meteor/minimongo"
    //"meteor/ejson",
    "meteor/mongo-livedata"
], {bail:true, timeout: 10000})

