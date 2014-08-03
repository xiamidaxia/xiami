var Fiber = require('fibers')
var xpm = require('xpm').serverCreate({
    cwd: __dirname
})

Fiber(function() {
    xpm.require('meteor/standard-app-packages')
    var Meteor = xpm.require('meteor/meteor')
    Meteor.WebApp.run()
    xpm.test([
        //"meteor/minimongo"
        //"meteor/ejson",
        //"meteor/mongo-livedata"
        //"meteor/livedata"
        "meteor/*"
    ], {bail:false, timeout: 10000})
}).run()

