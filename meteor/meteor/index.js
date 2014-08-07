if (global.isServer) {
    require('./debug')
    require('./dynamics_nodejs')
    require('./fiber_helpers')
    require('./helpers')
    require('./setimmediate')
    require('./timers')
    require('./url_common')
    require('./errors')
} else {
    require('./debug')
    require('./dynamics_browser')
    require('./helpers')
    require('./setimmediate')
    require('./timers')
    require('./errors')
    require('./fiber_stubs_client')
    require('./startup_client.js')
    require('./url_common')
}

module.exports = require("./meteor")
