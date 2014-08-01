var Fiber = require('fibers');
var Future = require('fibers/future', true);
var Random = require('meteor/random')
var Meteor = require('meteor/meteor')
var MongoTest = require('../mongo_driver').MongoTest
var MongoInternals = require('../mongo_driver').MongoInternals
var multiTest = require('meteor/test-helpers').multiTest(it, test)
var test = require('meteor/test-helpers').meteorTest(test)
var it = require('meteor/test-helpers').meteorIt(it)

multiTest("mongo-livedata - doc fetcher", [
  function (expect) {
    var self = this;
    var collName = "docfetcher-" + Random.id();
    var collection = new Meteor.Collection(collName);
    var id1 = collection.insert({x: 1});
    var id2 = collection.insert({y: 2});

    var fetcher = new MongoTest.DocFetcher(
      MongoInternals.defaultRemoteCollectionDriver().mongo);

    // Test basic operation.
    fetcher.fetch(collName, id1, Random.id(), expect(null, {_id: id1, x: 1}));
    fetcher.fetch(collName, "nonexistent!", Random.id(), expect(null, null));

    var fetched = false;
    var cacheKey = Random.id();
    var expected = {_id: id2, y: 2};
    fetcher.fetch(collName, id2, cacheKey, expect(function (e, d) {
      fetched = true;
      test.isFalse(e);
      test.equal(d, expected);
    }));
    // The fetcher yields.
    test.isFalse(fetched);

    // Now ask for another document with the same cache key. Because a fetch for
    // that cache key is in flight, we will get the other fetch's document, not
    // this random document.
    fetcher.fetch(collName, Random.id(), cacheKey, expect(function (e, d) {
      test.isFalse(e);
      test.equal(d, expected);
    }));
  }
]);
