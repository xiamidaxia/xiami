/**
 * this util is from meteor 'webapp' package
 *
 */
var fs = require('fs')
var crypto = require('crypto')
var path = require('path')
var os = require("os")
var http = require('http')
var url = require('url')

var useragent = require('useragent')
var send = require('send')
var RoutePolicy = require('meteor/routepolicy')

var util = {}

_.extend(util, {
    keepalive: function() {
        var keepaliveCount = 0
        process.stdin.on('data', function(data) {
            keepaliveCount = 0
        });
        process.stdin.resume()
        setInterval(function() {
            keepaliveCount++
            if (keepaliveCount >= 3) {
                console.log("Failed to receive keepalive! Exiting.")
                process.exit(1)
            }
        }, 3000)
    },
    /**
     * @param {String} contents
     * @returns {String}
     */
    sha1: function(contents) {
        var hash = crypto.createHash('sha1')
        hash.update(contents)
        return hash.digest('hex')
    },
    /**
     * 转换为驼峰文字
     * e.g. "Mobile Safari" => "mobileSafari"
     *
     * @param {String} name
     * @returns {string}
     */
    camelCase: function(name) {
        var parts = name.split(' ');
        parts[0] = parts[0].toLowerCase();
        for (var i = 1; i < parts.length; ++i) {
            parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].substr(1);
        }
        return parts.join('');
    },
    /**
     * @param userAgentString
     * @returns {{name: string, major: number, minor: number, patch: number}}
     */
    identifyBrowser: function(userAgentString) {
        var userAgent = useragent.lookup(userAgentString);
        return {
            name: util.camelCase(userAgent.family),
            major: +userAgent.major,
            minor: +userAgent.minor,
            patch: +userAgent.patch
        };
    },
    /**
     * @param req
     * @returns {Object}
     */
    categorizeRequest: function(req) {
        return {
            browser: util.identifyBrowser(req.headers['user-agent']),
            url: url.parse(req.url, true)
        };
    },
    /**
     * Serve app HTML for this URL?
     */
    appUrl: function() {
        if (url === '/favicon.ico' || url === '/robots.txt')
            return false;

        // NOTE: app.manifest is not a web standard like favicon.ico and
        // robots.txt. It is a file name we have chosen to use for HTML5
        // appcache URLs. It is included here to prevent using an appcache
        // then removing it from poisoning an app permanently. Eventually,
        // once we have server side routing, this won't be needed as
        // unknown URLs with return a 404 automatically.
        if (url === '/app.manifest')
            return false;

        // Avoid serving app HTML for declared routes such as /sockjs/.
        if (RoutePolicy.classify(url))
            return false;

        // we currently return app HTML on all URLs by default
        return true;
    },

})

exports.util = util
