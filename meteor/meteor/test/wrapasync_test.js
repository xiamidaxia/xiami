var Meteor = require('meteor/meteor')
var Fiber = require('fibers')
var _ = require('meteor/underscore')
var asyncFunction1 = function(x, cb) {
    setTimeout(function() { cb(null, x); }, 5);
};
var asyncFunction2 = function(x, opt, cb) {
    if (!cb && _.isFunction(opt)) {
        cb = opt;
        opt = null;
    }
    asyncFunction1(x, cb);
};
var asyncFunction3 = function(opt, cb) {
    if (!cb && _.isFunction(opt)) {
        cb = opt;
        opt = null;
    }
    asyncFunction1(3, cb);
};
var asyncFunction4 = function(cb) {
    asyncFunction1(3, cb);
};
var wrapped1 = Meteor._wrapAsync(asyncFunction1);
var wrapped2 = Meteor._wrapAsync(asyncFunction2);
var wrapped3 = Meteor._wrapAsync(asyncFunction3);
var wrapped4 = Meteor._wrapAsync(asyncFunction4);

it.skip("environment - wrapAsync sync", function(done) {
    Fiber(function() {
        // one required arg and callback
        test.equal(wrapped1(3), 3);
        test.equal(wrapped1(3, undefined), 3);
        // one required arg, optional second arg, callback
        test.equal(wrapped2(3), 3);
        test.equal(wrapped2(3, {foo: "bar"}), 3);
        test.equal(wrapped2(3, undefined, undefined), 3);
        test.equal(wrapped2(3, {foo: "bar"}, undefined), 3);
        // optional first arg, callback
        test.equal(wrapped3(3), 3);
        test.equal(wrapped3(3, undefined), 3);
        test.equal(wrapped3(), 3);
        test.equal(wrapped3(undefined), 3);
        // only callback
        test.equal(wrapped4(), 3);
        test.equal(wrapped4(undefined), 3);
        done()
    }).run()
});

it.skip("environment - wrapAsync async", function(done) {
        var cb = function(result) {
            return expect(null, result);
        };
        // one required arg and callback
        test.equal(wrapped1(3, cb(3)), undefined);
        // one required arg, optional second arg, callback
        test.equal(wrapped2(3, cb(3)), undefined);
        test.equal(wrapped2(3, {foo: "bar"}, cb(3)), undefined);
        test.equal(wrapped2(3, undefined, cb(3)), undefined);
        // optional first arg, callback
        test.equal(wrapped3(3, cb(3)), undefined);
        test.equal(wrapped3(cb(3)), undefined);
        test.equal(wrapped3(undefined, cb(3)), undefined);
        // only callback
        test.equal(wrapped4(cb(3)), undefined);
    }
);

it.skip("environment - wrapAsync callback is " +
    "in fiber", function(done) {
    Fiber(function() {
        var cb = function(err, result) {
            if (Meteor.isServer) {
                var Fiber = require('fibers')
                test.isTrue(Fiber.current);
            }
            done()
        };
        wrapped1(3, cb);
    }).run()
});
