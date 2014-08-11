module.exports = function(cb, config) {
    require('xiami/config').init(config)
    cb && cb()
}
