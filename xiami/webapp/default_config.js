module.exports = {
    "port"               : 3000,
    "env"                : "development", // development || production
    "mongo_port"         : 27017,
    "mongo_url"          : "mongodb://localhost:27017/test",
    "mongo_oplog_url"    : "",//"mongodb://127.0.0.1:27017/local",
    "compress"           : true,
    //"view_engine"        : "jade",
    //"trust_proxy"        : false,
    "jsonp_callback_name": "cb",
    "views"              : "",
    "favicon"            : "",
    "view_cache"         : false,
    "client_path"        : "",
    "static_maxage"      : 3600000 * 24 * 30,
    "root_url_path_prefix": ""
}