var _ = require('meteor/underscore')

function Config () {
    this._opts = {}
    this.init()
}

_.extend(Config.prototype, {
    set: function(obj) {
        _.extend(this._opts, obj)
    },
    init: function(obj) {
        var _default
        if (global.isServer) {
            _default = require('./server_default_config')
        } else {
            _default = require('./client_default_config')
        }
        return this._opts = _.extend({}, _default, obj)
    },
    get: function(name) {
        var val = this._opts[name]
        if (val === undefined) throw new Error("unknow config name: " + name)
        return val
    }
})

module.exports = new Config

