var _ = require('meteor/underscore')
var Meteor = require('meteor/meteor')
var withoutInvocation = function (f) {
    if (Meteor.DDP) {
        var _CurrentInvocation = Meteor.DDP._CurrentInvocation
        if (_CurrentInvocation.get() && _CurrentInvocation.get().isSimulation)
            throw new Error("Can't set timers inside simulations");
        return function () { _CurrentInvocation.withValue(null, f); };
    }
    else
        return f;
};
var _defer = function(fn) {
    fn = Meteor.bindEnvironment(withoutInvocation(fn), function(e) {
        throw e
    })
    setTimeout(fn, 0)
}

/**
 * @param {Function} mocha it
 * @param {Object} chai.assert
 */
module.exports = function(it, test) {
    var testHelpers = require('meteor/test-helpers')
    var _it = testHelpers.meteorIt(it)
    var _test = testHelpers.meteorTest(test)
    var multiTest = function(info, fnArr, str) {
        var _newit = str ? _it[str] : _it
        _newit(info, function(_done) {
            var _allDone = false
            var done = function() {
                if (!_allDone) {
                    _done()
                    _allDone = true
                }
            }
            var context = {}
            var testLoop = function() {
                var _count = 0
                var expect = function(a) {
                    var args = _.toArray(arguments)
                    _count++
                    if (_.isFunction(a)) {
                        return function() {
                            var newArgs = _.toArray(arguments)
                            _defer(function() {
                                a.apply(null, newArgs)
                                _count--
                                if (_count === 0) testLoop()
                            })
                        }
                    } else {
                        return function() {
                            var newArgs = _.toArray(arguments)
                            _defer(function() {
                                args.forEach(function(item, index) {
                                    test.deepEqual(newArgs[index], item)
                                })
                                _count--
                                if (_count === 0) testLoop()
                            })
                        }
                    }
                }
                var testFn = fnArr.shift()
                if (!testFn) {
                    done()
                    return
                } else {
                    testFn.call(context, _test, expect)
                    if (_count === 0) testLoop()
                }
            }
            testLoop()
        })
    }
    multiTest.skip = function(info) {
        it.skip(info, function(){})
    }
    multiTest.only = function(info, cbs) {
        multiTest(info, cbs, "only")
    }
    return multiTest
}

