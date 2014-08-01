var Fiber = require('fibers')
var Meteor = require('meteor/meteor')

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
