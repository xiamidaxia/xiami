//add common package
require('./common/LivedataTest')
require('./common/common')
require('./common/Heartbeat')
require('./common/random_stream')
if (global.isServer) {
    require('./server/stream_client_nodejs')
    require('./common/stream_client_common')
    require('./common/livedata_connection')
    require('./server/livedata_server')
    require('./server/crossbar')
    require('./server/stream_server')
    require('./server/writefence')
    require('./server/server_convenience')
} else {
    require('./common/stream_client_common')
    require('./common/livedata_connection')
}