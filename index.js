var path = require('path')
var xpm = require('xpm')
var extend = xpm.util.extend

var family = {
    meteor: path.join(__dirname,"meteor"),
    xiami: path.join(__dirname, "xiami")
}

exports.clientCreate = function(opts) {
    opts = extend({family: family}, opts)
    var xpmClient = xpm.clientCreate(opts)
    xpmClient.add(["meteor/*", "xiami/*"])
    return xpmClient
}

exports.serverCreate = function(opts) {
    opts = extend({family: family}, opts)
    var xpmServer = xpm.serverCreate(opts)
    return xpmServer
}

require('./run')(exports)
