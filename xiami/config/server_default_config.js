var path = require('path')
module.exports = {
    "port"               : 3000,
    "env"                : "development", // development || production
    "mongo_port"         : 27017,
    "mongo_url"          : "mongodb://localhost:27017/test",
    "mongo_oplog_url"    : "",//"mongodb://127.0.0.1:27017/local",
    "static_path"        : path.join(__dirname, "..",'..',".dest"),
    "main_path"         : __dirname + "/main.html",
    "static_prefix"      : "/static",
    "static_maxage"      : 3600000 * 24 * 30,
    "root_url": "http://127.0.0.1:3000",
    "root_url_prefix":"",
    "mail_url": "smtp://exmail.qq.com"
}

