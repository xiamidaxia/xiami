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
    var config = xpmServer.require('xiami/config')
    var webapp = xpmServer.require('xiami/webapp')
    config.init({port: 3000})
    xpmServer.require('meteor/standard-app-packages')
    xpmServer.test([
        "xiami/config",
        "xiami/webapp",
        //"meteor/minimongo"
        //"meteor/ejson",
        //"meteor/mongo-livedata"
        //"meteor/livedata"
        //"meteor"
    ], {bail: false, timeout: 10000})
    webapp.run()
}).run()

/*//client static files
var xpmClient = xpm.clientCreate({
    family: {
        meteor: __dirname + "/meteor",
        xiami: __dirname + "/xiami"
    },
    dest: path.join(__dirname, '.dest')
})
xpmClient.add(["meteor*//*","xiami*//*"])*/

