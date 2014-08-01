if (global.isServer) {
    module.exports = require('./server')
} else {
    module.exports = require('./client')
}