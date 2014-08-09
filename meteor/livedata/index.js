//add common package
if (global.isServer) {
    require('./common/LivedataTest')
    exports.DDP = require('./common/common').DDP
    require('./common/Heartbeat')
    require('./common/random_stream')
    require('./server/stream_client_nodejs')
    require('./common/stream_client_common')
    require('./common/livedata_connection')
    exports.DDPServer = require('./server/livedata_server').DDPServer
    require('./server/crossbar')
    require('./server/stream_server')
    require('./server/writefence')
    require('./server/server_convenience')
} else {
    require('./common/LivedataTest')
    require('./common/common')
    require('./client/sockjs-0.3.4.js')
    require('./client/stream_client_sockjs')
    require('./common/stream_client_common')
    require('./common/Heartbeat')
    require('./common/random_stream')
    require('./common/livedata_connection')
    require("./client/client_convenience")
}