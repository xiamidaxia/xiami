var Random = require('meteor/random')
var Meteor = require('meteor/meteor')

it('random', function(done) {
    // Deterministic with a specified seed, which should generate the
    // same sequence in all environments.
    //
    // For repeatable unit test failures using deterministic random
    // number sequences it's fine if a new Meteor release changes the
    // algorithm being used and it starts generating a different
    // sequence for a seed, as long as the sequence is consistent for
    // a particular release.
    var random = Random.createWithSeeds(0);
    test.equal(random.id(), "cp9hWvhg8GSvuZ9os");
    test.equal(random.id(), "3f3k6Xo7rrHCifQhR");
    test.equal(random.id(), "shxDnjWWmnKPEoLhM");
    test.equal(random.id(), "6QTjB8C5SEqhmz4ni");
    done()
});

// node crypto and window.crypto.getRandomValues() don't let us specify a seed,
// but at least test that the output is in the right format.
it('random - format', function(done) {
    var idLen = 17;
    test.equal(Random.id().length, idLen);
    test.equal(Random.id(29).length, 29);
    var numDigits = 9;
    var hexStr = Random.hexString(numDigits);
    test.equal(hexStr.length, numDigits);
    parseInt(hexStr, 16); // should not throw
    var frac = Random.fraction();
    test.isTrue(frac < 1.0);
    test.isTrue(frac >= 0.0);

    test.equal(Random.secret().length, 43);
    test.equal(Random.secret(13).length, 13);
    done()
});

it('random - Alea is last resort', function(done) {
    if (Meteor.isServer) {
        test.isTrue(Random.alea === undefined);
    }
    if (Meteor.isClient) {
        var useGetRandomValues = !!(typeof window !== "undefined" &&
            window.crypto && window.crypto.getRandomValues);
        test.equal(Random.alea === undefined, useGetRandomValues);
    }
    done()
});

it('random - createWithSeeds requires parameters', function(done) {
    test.throws(function() {
        Random.createWithSeeds();
    });
    done()
});
