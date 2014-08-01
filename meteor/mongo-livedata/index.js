if (global.isServer) {
    require('./mongo_driver')
    require('./oplog_tailing')
    require('./observe_multiplex')
    require('./doc_fetcher')
    require("./polling_observe_driver")
    require('./oplog_observe_driver')
    require('./local_collection_driver')
    require('./remote_collection_driver')
    require('./collection')
} else {
    require('./local_collection_driver')
}
var Fiber = require('fibers')
var Meteor = require('meteor/meteor')
Fiber(function() {
    console.log('agggg')
    var a = new Meteor.Collection(null)
    console.log('gggggggg')
    //console.log(a)
}).run()
