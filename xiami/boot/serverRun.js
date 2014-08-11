module.exports = function(config, cb) {
    require('xiami/config').init(config)
    require('xiami/webapp').run(cb)
}