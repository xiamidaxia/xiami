var xpm = require('xpm')
var Fiber = require('fibers')

var xpm = require('xpm').serverCreate({
    cwd: __dirname
})

/*Fiber(function() {
    xpm.require('meteor/mongo-livedata')
    var Meteor = xpm.require('meteor/meteor')
    var c = new Meteor.Collection("newTest")
    c.find().forEach(function(d) {
        console.log(d)
    })
}).run()*/
//xpm.require('xiami/webapp')

xpm.test([
    "meteor/ejson",
    "meteor/mongo-livedata"
], {bail:true, timeout: 10000})

