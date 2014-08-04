it('xiami - webapp - server config.', function(done) {
    var xiami = require('xiami/webapp')
    var config = require('xiami/config')
    var opts = {_testconfig_: {}}
    config.set(opts)
    test.equal(xiami.getConfig('_testconfig_'), opts._testconfig_)
    test.equal(xiami.getConfig('_testconfig_'), config.get('_testconfig_'))
    done()
})