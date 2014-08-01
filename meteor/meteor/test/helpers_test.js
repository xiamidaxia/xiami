var Meteor = require('meteor/meteor')

it("meteor - environment - helpers", function(done) {
    /*** ensure ***/
    var x = {};
    var y = Meteor._ensure(x, "a", "b", "c");
    test.deepEqual(x, {a: {b: {c: {}}}});
    test.deepEqual(y, {});
    y.d = 12;
    test.deepEqual(x, {a: {b: {c: {d: 12}}}});
    test.deepEqual(y, {d: 12});

    y = Meteor._ensure(x, "a", "b", "c");
    test.deepEqual(x, {a: {b: {c: {d: 12}}}});
    test.deepEqual(y, {d: 12});
    y.x = 13;
    test.deepEqual(x, {a: {b: {c: {d: 12, x: 13}}}});
    test.deepEqual(y, {d: 12, x: 13});

    y = Meteor._ensure(x, "a", "n");
    test.deepEqual(x, {a: {b: {c: {d: 12, x: 13}}, n: {}}});
    test.deepEqual(y, {});
    y.d = 22;
    test.deepEqual(x, {a: {b: {c: {d: 12, x: 13}}, n: {d: 22}}});
    test.deepEqual(y, {d: 22});

    Meteor._ensure(x, "a", "q", "r")["s"] = 99
    test.deepEqual(x, {a: {b: {c: {d: 12, x: 13}}, n: {d: 22}, q: {r: {s: 99}}}});

    Meteor._ensure(x, "b")["z"] = 44;
    test.deepEqual(x, {a: {b: {c: {d: 12, x: 13}}, n: {d: 22}, q: {r: {s: 99}}},
        b: {z: 44}});

    /*** delete ***/

    x = {};
    Meteor._delete(x, "a", "b", "c");
    test.deepEqual(x, {});

    x = {a: {b: {}}};
    Meteor._delete(x, "a", "b", "c");
    test.deepEqual(x, {});

    x = {a: {b: {}, n: {}}};
    Meteor._delete(x, "a", "b", "c");
    test.deepEqual(x, {a: {n: {}}});

    x = {a: {b: {}}, n: {}};
    Meteor._delete(x, "a", "b", "c");
    test.deepEqual(x, {n: {}});

    x = {a: {b: 99}};
    Meteor._delete(x, "a", "b", "c");
    test.deepEqual(x, {});

    x = {a: {b: 99}};
    Meteor._delete(x, "a", "b", "c", "d");
    test.deepEqual(x, {});

    x = {a: {b: 99}};
    Meteor._delete(x, "a", "b", "c", "d", "e", "f");
    test.deepEqual(x, {});

    x = {a: {b: {c: {d: 99}}}, x: 12};
    Meteor._delete(x, "a", "b", "c", "d");
    test.deepEqual(x, {x: 12});

    x = {a: {b: {c: {d: 99}}, x: 12}};
    Meteor._delete(x, "a", "b", "c", "d");
    test.deepEqual(x, {a: {x: 12}});

    x = {a: 12, b: 13};
    Meteor._delete(x, "a");
    test.deepEqual(x, {b: 13});

    x = {a: 12};
    Meteor._delete(x, "a");
    test.deepEqual(x, {});
    done()
});
