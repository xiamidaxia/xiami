/**
 *  a simple connect webserver
 *
 *  @author xiamidaxia(https://github.com/xiamidaxia)
 */
var EventEmitter = require('events').EventEmitter
var http = require('http')
var crypto = require('crypto')
var connect = require('connect')
var _ = require('meteor/underscore')
var fs = require('fs')
var config = require('xiami/config')

//all events that can be hook
var DEFINE_EVENTS = ['STARTED', "STARTUP"]
var Log = require('meteor/logging')
var Meteor = require('meteor/meteor')
var mainHtmlCache
var staticMiddleware = require('./middlewares/static')
/**
 *
 * @constructor
 * @param {Object | Ignore}
 */
var Xiami = module.exports = function(clientManifest) {
    EventEmitter.apply(this, arguments)
    this.clientManifest = clientManifest
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
    run: function(cb) {
        var self = this
        //set mainHtml
        mainHtmlCache = fs.readFileSync(config.get('main_path'))
        self.emit("STARTUP")
        self.httpServer.listen(this.getConfig("port"), Meteor.bindEnvironment(function() {
            Log.info('xiami server listeing at ' + self.getConfig('port'))
            self.emit('STARTED')
            cb && cb()
        }))
    },
    _connect: function() {
        var self = this
        var app = connect()
        app.use(connect.compress())
        app.use(this.connectHandler)
        app.use(connect.query())
        app.use(staticMiddleware)
        app.use(function(req, res) {
            var headers = {
                'Content-Type':  'text/html; charset=utf-8'
            }
            res.writeHead(200,headers)
            res.end(mainHtmlCache)
        })
        app.use(connect.errorHandler())
        self.httpServer = http.createServer(app);
    },
    /**
     * @param {String}
     * @return {*e
     * ad
     */
    getConfig: function(name) {
        return config.get(name)
    },
    /**
     * @public
     */
    isDebug: function() {
        return this.getConfig('env') !== "production"
    },
    /**
     * @return {String}
     */
    _calculateClientHash: function() {
        var hash = crypto.createHash('sha1')
        hash.update(JSON.stringify(config._opts))
        _.each(this.clientManifest, function(resource) {
            if (resource.where === 'client' || resource.where === 'internal') {
                hash.update(resource.path)
                hash.update(resource.hash)
            }
        })
        return hash.digest('hex')
    }
})

