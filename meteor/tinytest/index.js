/**
 * @param it mocha it
 * @param test chai.assert
 */
exports.Tinytest = function(it, test) {
    var testHelpers = require('meteor/test-helpers')
    test = testHelpers.meteorTest(test)
    it = testHelpers.meteorIt(it)
    var Tinytest = {}
    Tinytest.add = function(info, fn, _str) {
        var _newit = _str ? it[_str] : it
        _newit(info, function(done) {
            fn.call(null, test)
            done()
        })
    }
    Tinytest.addAsync = function(info, fn, _str) {
        var _newit = _str ? it[_str] : it
        _newit(info, function(done) {
            fn.call(null, test, done)
        })
    }
    Tinytest.add.skip =
    Tinytest.addAsync.skip = function(info) {
        it.skip(info, function(){})
    }
    Tinytest.add.only = function(info, fn) {
        Tinytest.add(info, fn, "only")
    }

    Tinytest.addAsync.only = function(info, fn) {
        Tinytest.addAsync(info, fn, "only")
    }
    return Tinytest
}
exports.testAsyncMulti = require('./multiTest')