var Meteor = require('meteor/meteor')
var Xiami = require('xiami/webapp').Xiami
var _ = require('meteor/underscore')

var WebApp = new Xiami

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
    WebApp.on("STARTUP", fn)
}
Meteor.getConfig = WebApp.getConfig.bind(WebApp)

// allow later packages to override default options
Meteor.absoluteUrl.defaultOptions = { };
/*if (typeof __meteor_runtime_config__ === "object" &&
 __meteor_runtime_config__.ROOT_URL)
 Meteor.absoluteUrl.defaultOptions.rootUrl = __meteor_runtime_config__.ROOT_URL;*/
Meteor.absoluteUrl.defaultOptions.rootUrl = Meteor.getConfig('root_url')


Meteor._relativeToSiteRootUrl = function (link) {
    /*  if (typeof __meteor_runtime_config__ === "object" &&
     link.substr(0, 1) === "/")
     link = (__meteor_runtime_config__.ROOT_URL_PATH_PREFIX || "") + link;*/
    //todo
    if (link.substr(0,1) === "/")
        link = (Meteor.getConfig('root_url_prefix') || "") + link
    return link;
};
module.exports = Meteor.WebApp = WebApp