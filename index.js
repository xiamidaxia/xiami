var path = require('path')
var xpm = require('xpm2')
var Fiber = require('fibers')
var extend = xpm.util.extend

var family = {
    meteor: path.join(__dirname,"meteor"),
    xiami: path.join(__dirname, "xiami")
}

exports.clientCreate = function(opts) {
    if (opts && opts.family)
        opts.family = extend({}, family, opts.family)
    var xpmClient = xpm.clientCreate(opts)
    xpmClient.add(["meteor/*", "xiami/*"])
    return xpmClient
}

exports.serverCreate = function(opts) {
    if (opts && opts.family)
        opts.family = extend({}, family, opts.family)
    var xpmServer = xpm.serverCreate(opts)
    return xpmServer
}

exports.Fiber = function(fn) {
    Fiber(function() {
        fn()
    }).run()
}
exports.families = family
