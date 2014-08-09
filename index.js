var Fiber = require('fibers')
var path = require('path')
var xpm = require('xpm')
require('./test/run')
return

var family = {
    meteor: path.join(__dirname,"meteor"),
    xiami: path.join(__dirname, "xiami")
}
var dest = path.join(__dirname,'.dest')

var xpmServer = xpm.serverCreate({ family: family})
var xpmClient = xpm.clientCreate({ family: family, dest: dest })

Fiber(function() {
    //start server
    xpmServer.require('xiami/boot').run()
}).run()

//client static files, in ther production, this must be removed
xpmClient.add(["meteor/*", "xiami/*"])
xpmClient.run()
