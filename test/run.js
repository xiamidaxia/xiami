var path = require('path')
var Fiber = require('fibers')
var xpm = require('xpm')

var family = {
    meteor: path.join(__dirname,"..","meteor"),
    xiami: path.join(__dirname,"..","xiami")
}
var dest = path.join(__dirname, "..", '.dest')

var testList = [
    "meteor/binary-heap",
    "meteor/check",
    "meteor/deps",
    "meteor/ejson",
    "meteor/geojson-utils",
    "meteor/id-map",
    "meteor/logging",
    "meteor/meteor",
    "meteor/minimongo",
    "meteor/ordered-dict",
    "meteor/random"
]
var serverList = [
    //"meteor/callback-hook",
    //"meteor/livedata",
    //"meteor/mongo-livedata"
]

//server
var xpmServer = xpm.serverCreate({ family: family})
var xpmClient = xpm.clientCreate({ family: family, dest: dest })

Fiber(function() {
    var config = xpmServer.require('xiami/config')
    var webapp = xpmServer.require('xiami/webapp')
    config.init({port: 3000})
    xpmServer.require('meteor/standard-app-packages')
    xpmServer.test(testList.concat(serverList), {bail: false, timeout: 10000})
    webapp.run()
}).run()

//client static files
xpmClient.add(testList)
xpmClient.test(testList)
xpmClient.run()

