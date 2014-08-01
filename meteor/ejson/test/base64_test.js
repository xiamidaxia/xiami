var base64Encode = require('../base64').base64Encode
var base64Decode = require('../base64').base64Decode
var EJSON = require('../ejson')
var _ = require('meteor/underscore')

var asciiToArray = function(str) {
    var arr = EJSON.newBinary(str.length);
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c > 0xFF) {
            throw new Error("Not ascii");
        }
        arr[i] = c;
    }
    return arr;
};

var arrayToAscii = function(arr) {
    var res = [];
    for (var i = 0; i < arr.length; i++) {
        res.push(String.fromCharCode(arr[i]));
    }
    return res.join("");
};

it("ejson - base64 - testing the test", function(done) {
    test.equal(arrayToAscii(asciiToArray("The quick brown fox jumps over the lazy dog")),
        "The quick brown fox jumps over the lazy dog");
    done()
});

it("ejson - base64 - empty", function(done) {
    test.equal(base64Encode(EJSON.newBinary(0)), "");
    test.deepEqual(base64Decode(""), EJSON.newBinary(0));
    done()
});

it("ejson - base64 - wikipedia examples", function(done) {
    var tests = [
        {txt: "pleasure.", res: "cGxlYXN1cmUu"},
        {txt: "leasure.", res: "bGVhc3VyZS4="},
        {txt: "easure.", res: "ZWFzdXJlLg=="},
        {txt: "asure.", res: "YXN1cmUu"},
        {txt: "sure.", res: "c3VyZS4="}
    ];
    _.each(tests, function(t) {
        test.equal(base64Encode(asciiToArray(t.txt)), t.res);
        test.equal(arrayToAscii(base64Decode(t.res)), t.txt);
    });
    done()
});

it("ejson - base64 - non-text examples", function(done) {
    var tests = [
        {array: [0, 0, 0], b64: "AAAA"},
        {array: [0, 0, 1], b64: "AAAB"}
    ];
    _.each(tests, function(t) {
        test.equal(base64Encode(t.array), t.b64);
        var expectedAsBinary = EJSON.newBinary(t.array.length);
        _.each(t.array, function(val, i) {
            expectedAsBinary[i] = val;
        });
        test.deepEqual(base64Decode(t.b64), expectedAsBinary);
    });
    done()
});
