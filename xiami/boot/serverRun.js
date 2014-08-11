module.exports = function(cb, config) {
    require('xiami/config').init(config)
    cb && cb()
    require('xiami/webapp').run()
}