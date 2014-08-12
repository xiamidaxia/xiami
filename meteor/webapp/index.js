var Meteor = require('meteor/meteor')
var _ = require('meteor/underscore')

var WebApp = require('xiami/webapp')

var SHORT_SOCKET_TIMEOUT = 5*1000;
var LONG_SOCKET_TIMEOUT = 120*1000;

Meteor._printSentDDP = WebApp.getConfig("env") === "development"
// When we have a request pending, we want the socket timeout to be long, to
// give ourselves a while to serve it, and to allow sockjs long polls to
// complete.  On the other hand, we want to close idle sockets relatively
// quickly, so that we can shut down relatively promptly but cleanly, without
// cutting off anyone's response.
WebApp._timeoutAdjustmentRequestCallback = function (req, res) {
    // this is really just req.socket.setTimeout(LONG_SOCKET_TIMEOUT);
    req.setTimeout(LONG_SOCKET_TIMEOUT);
    // Insert our new finish listener to run BEFORE the existing one which removes
    // the response from the socket.
    var finishListeners = res.listeners('finish');
    // XXX Apparently in Node 0.12 this event is now called 'prefinish'.
    // https://github.com/joyent/node/commit/7c9b6070
    res.removeAllListeners('finish');
    res.on('finish', function () {
        res.setTimeout(SHORT_SOCKET_TIMEOUT);
    });
    _.each(finishListeners, function (l) { res.on('finish', l); });
};

Meteor.startup = function(fn) {
    if (WebApp.isStarted) {
        fn()
        return
    }
    WebApp.on("STARTUP", fn)
}


module.exports = Meteor.WebApp = WebApp