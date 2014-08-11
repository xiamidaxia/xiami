module.exports = function(config, cb) {
    require('xiami/config').init(config)
    var Meteor = global.Meteor = require('meteor/meteor')
    cb && Meteor.startup(cb)
}
