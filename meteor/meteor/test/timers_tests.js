var Meteor = require('meteor/meteor')
if (global.isServer) {
    var Fiber = require('fibers')
} else {
    var Fiber = function(cb){
        var a = {}
        a.run = function() {
            cb()
        }
        return a
    }
}

it('meteor - timers - defer', function(done) {
    Fiber(function() {
        var x = 'a';
        Meteor.defer(function() {
            test.equal(x, 'b');
            done()
        });
        x = 'b';
    }).run()
});

it('meteor - timers - nested defer', function(done) {
    Fiber(function() {
        var x = 'a';
        Meteor.defer(function() {
            test.equal(x, 'b');
            Meteor.defer(function() {
                test.equal(x, 'c');
                done()
            });
            x = 'c';
        });
        x = 'b';
    }).run()
});
