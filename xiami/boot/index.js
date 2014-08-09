if (global.isServer) {
    exports.run = require('./serverRun')
} else {
    exports.run = require('./clientRun')
}