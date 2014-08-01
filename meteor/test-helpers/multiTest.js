var _ = require('meteor/underscore')
/**
 * @param {Function} mocha it
 * @param {Object} chai.assert
 */
module.exports = function(it, test) {
    var _it = require('./meteor_test_fixed').meteorIt(it)
    return function(info, fnArr) {
        _it(info, function(done) {
            var _count = 0
            fnArr.forEach(function(fn) {
                fn.call(null, function(a) {
                    var args = _.toArray(arguments)
                    _count++
                    if (_.isFunction(a)) {
                        return function() {
                            var newArgs = _.toArray(arguments)
                            setTimeout(function() {
                                a.apply(null, newArgs)
                                _count--
                                if (_count === 0) done()
                            })
                        }
                    } else {
                        return function() {
                            var newArgs = _.toArray(arguments)
                            setTimeout(function() {
                                args.forEach(function(item, index) {
                                    test.deepEqual(newArgs[index], item)
                                })
                                _count--
                                if (_count === 0) done()
                            })
                        }
                    }
                })
            })
            if (_count === 0) done()
        })
    }
}

