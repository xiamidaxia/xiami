module.exports = function(config) {
    require('xiami/config').init(config)
    require('xiami/webapp').run()
}