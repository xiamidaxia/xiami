var send = require('send')
var url = require('url')
var connect = require('connect')
var config = require("xiami/config")
var path  = require('path')

var _prefix = config.get('static_prefix')
var _maxage = config.get("static_maxage")
var _static_path = config.get('static_path')
module.exports = function(req, res, next) {
    //check prefix
    var pathname = connect.utils.parseUrl(req).pathname
    try {
        pathname = decodeURIComponent(pathname)
    } catch (e) {
        next()
        return
    }
    if (pathname === "/favicon.ico" || pathname === "/robots.txt") {
        //todo
        res.end(pathname)
        return
    }
    if (pathname.substr(0, _prefix.length) !== _prefix) {
        next()
        return
    }
    send(req, path.join(_static_path, pathname.substr(_prefix.length)))
        .maxage(_maxage)
        .hidden(false)
        .on('error', function () {
            res.writeHead(404)
            res.end('Not found static file: ' + pathname);
        })
        .on('directory', function () {
            //Log.error("Unexpected directory " + pathname);
            res.writeHead(500);
            res.end("Unexpected directory " + pathname);
        })
        .pipe(res);
}
