/**
 *  a simple connect webserver
 *
 *  @author xiamidaxia(https://github.com/xiamidaxia)
 */
var EventEmitter = require('events').EventEmitter
var http = require('http')
var crypto = require('crypto')
var connect = require('connect')
var default_config = require('./default_config')
var _ = require('meteor/underscore')

//all events that can be hook
var DEFINE_EVENTS = ['STARTED', "STARTUP"]
var Log = require('meteor/logging')
/**
 *
 * @constructor
 * @param {Object}
 * @param {Object | Ignore}
 */
var Xiami = module.exports = function(config, clientManifest) {
    EventEmitter.apply(this, arguments)
    this._opts = _.extend({}, default_config, config)
    //客户端缓存的manifest对象
    this.clientManifest = clientManifest
    //客户端缓存的hash值，用此判断服务器是否需要刷新manifest
    this.clientHash = null
    this.connectHandler = connect()
    //Webserver
    this.httpServer = null
    this._connect()
}
require('util').inherits(Xiami, EventEmitter)

_.extend(Xiami.prototype, {
    DEFINE_EVENTS: DEFINE_EVENTS,
    /**
     * start the server
     */
    run: function() {
        var self = this
        self.emit("STARTUP")
        self.httpServer.listen(this.getConfig("port"), function() {
            Log.info('xiami server listeing at ' + self.getConfig('port'))
            self.emit('STARTED')
        })
    },
    _connect: function() {
        var self = this
        var app = connect()
        app.use(connect.compress())
        app.use(this.connectHandler)
        app.use(connect.query())
        //add static
            //todo
        //404
        app.use(function(req, res) {
            res.writeHead(404)
            res.end()
        })
        self.httpServer = http.createServer(app);
        //app.use(connect.bodyParser())
        //app.use(connect.static(this.getConfig("client_path",staticConfig)))
        //app.use(connect.errorHandler())
    },
    /**
     * @param {String}
     * @return {*}
     */
    getConfig: function(name) {
        var val = this._opts[name]
        if (val === undefined) throw new Error("xiami.getConfig([String]): unknow config name: " + name)
        return val
    },
    /**
     * @public
     */
    isDebug: function() {
        return this.getConfig('env') !== "production"
    },
    /**
     * 计算客户端hash值
     * @return {String}
     */
    _calculateClientHash: function() {
        var hash = crypto.createHash('sha1')
        hash.update(JSON.stringify(this._opts))
        _.each(this.clientManifest, function(resource) {
            if (resource.where === 'client' || resource.where === 'internal') {
                hash.update(resource.path)
                hash.update(resource.hash)
            }
        })
        return hash.digest('hex')
    }
})

