var Meteor = require('meteor/meteor')
//exports.ReactiveVar = require('./reactivevar')
exports.fixTest = require('./meteor_test_fixed')

// Call `fn` periodically until it returns true.  If it does, call
// `success`.  If it doesn't before the timeout, call `failed`.
exports.simplePoll = function (fn, success, failed, timeout, step) {
    timeout = timeout || 10000;
    step = step || 100;
    var start = (new Date()).valueOf();
    var helper = function () {
        if (fn()) {
            success();
            return;
        }
        if (start + timeout < (new Date()).valueOf()) {
            failed();
            return;
        }
        Meteor.setTimeout(helper, step);
    };
    helper();
};

exports.pollUntil = function (expect, f, timeout, step, noFail) {
    noFail = noFail || false;
    step = step || 100;
    var expectation = expect(true);
    exports.simplePoll(
        f,
        function () { expectation(true) },
        function () { expectation(noFail) },
        timeout,
        step
    );
};
exports.ReactiveVar = require('./reactivevar')
