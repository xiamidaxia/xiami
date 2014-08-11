var Fiber = require('fibers')
var path = require('path')
var dest = path.join(__dirname, ".dest")
var mainpath = path.join(__dirname, 'main.html')

module.exports = function(xiami) {
    var client = xiami.clientCreate({ dest: dest })
    var server = xiami.serverCreate()

    client.run(function() {
        Fiber(function() {
            server.require('xiami/boot').run({
                main_path: mainpath
            })
        }).run()
    })
}