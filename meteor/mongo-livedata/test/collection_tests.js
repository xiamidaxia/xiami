var Tinytest = require('meteor/tinytest').Tinytest(it, test)
var Meteor = require('meteor/meteor')

Tinytest.add(
  'collection - call Meteor.Collection without new',
  function (test) {
    test.throws(
      function () {
        Meteor.Collection(null);
      },
      /use "new" to construct a Meteor\.Collection/
    );
  }
);
