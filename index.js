var path = require('path')
var Fiber = require('fibers')
var xpm = require('xpm')

//server
var xpmServer = xpm.serverCreate({
    family: {
        meteor: __dirname + "/meteor",
        xiami: __dirname + "/xiami"
    }
})

Fiber(function() {
    xpmServer.require('meteor/standard-app-packages')
    var Meteor = xpmServer.require('meteor/meteor')
    xpmServer.test([
        //"meteor/minimongo"
        //"meteor/ejson",
        //"meteor/mongo-livedata"
        //"meteor/livedata"
        //"meteor"
    ], {bail: false, timeout: 10000})
    Meteor.WebApp.run()
}).run()

//client static files
var xpmClient = xpm.clientCreate({
    family: {
        meteor: __dirname + "/meteor",
        xiami: __dirname + "/xiami"
    },
    dest: path.join(__dirname, '.dest')
})
xpmClient.add(["meteor/*"])

