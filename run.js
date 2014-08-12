var Fiber = require('fibers')
var path = require('path')
var dest = path.join(__dirname, ".dest")
var mainpath = path.join(__dirname, 'main.html')
var myFamily = {
    common: path.join(__dirname, 'app/common'),
    client: path.join(__dirname, "app/client"),
    server: path.join(__dirname, "app/server")
}
module.exports = function(xiami) {
    var client = xiami.clientCreate({ dest: dest, family: myFamily})
    client.add(["common/*","client/*","server/*"])
    client.test(["meteor/mongo-livedata"])
    var server = xiami.serverCreate({family:myFamily})
    client.run()
    Fiber(function() {
        server.require('xiami/boot').run({
            main_path: mainpath
        })
        server.require('common/collections')
        server.test(["meteor/mongo-livedata"], {timeout: 10000})
    }).run()
}