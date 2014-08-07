var Meteor = require('meteor/meteor')
it("environment - server basics", function (done) {
  test.isFalse(Meteor.isClient);
  test.isTrue(Meteor.isServer);
  done()
});
