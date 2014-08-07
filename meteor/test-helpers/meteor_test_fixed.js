/**
 * make mocha test can run with fiber and chai.assertin meteor test
 */
var _ = require('meteor/underscore')
if (global.isServer) {
    var Fiber = require('fibers')
}

/**
 * fixed meteor test
 * @param assert chai.assert[http://chaijs.com/api/assert/]
 */
exports.meteorTest = function(assert) {
    var test = _.clone(assert)
    test.equal = test.deepEqual
    test.notEqual = test.notDeepEqual
    test.length = test.lengthOf
    test.isFalse = function(v) {
        return assert.isFalse(!!v)
    }
    test.isTrue = function(v) {
        return assert.isTrue(!!v)
    }
    test.runId = function() {
        return require('meteor/random').id()
    }
    return test
}

/**
 * mocha it in Fiber
 */
exports.meteorIt = function(it) {
    if (global.isClient) return it
    function _wrapIt(str, info, fn) {
        var _it = str ? it[str] : it
        if(!_it) throw new Error('mocha it has no method: ' + str)
        _it(info, function(done) {
            Fiber(function() {
                fn.call(null, done)
            }).run()
        })
    }
    var _it = function(info, fn) {
        _wrapIt(null, info, fn)
    }
    _it.only = function(info, fn) {
        _wrapIt("only", info, fn)
    }
    _it.skip = function(info, fn) {
        _wrapIt("skip", info, fn)
    }
    return _it
}