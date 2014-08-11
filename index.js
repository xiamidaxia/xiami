var Fiber = require('fibers')
var path = require('path')
var xpm = require('xpm')
var extend = xpm.util.extend

var family = {
    meteor: path.join(__dirname,"meteor"),
    xiami: path.join(__dirname, "xiami")
}

exports.xpmClient = function(opts, cb) {
    opts = extend({family: family}, opts)
    var xpmClient = xpm.clientCreate(opts)
    xpmClient.add(["meteor/*", "xiami/*"])
    xpmClient.run(cb)
}

exports.xpmServer = function(opts, cb) {
    opts = extend({family: family}, opts)
    var xpmServer = xpm.serverCreate(opts)
    Fiber(function() {
        //start server
        xpmServer.require('xiami/boot').run(cb, opts)
    }).run()

}
