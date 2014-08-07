var Meteor = require('meteor/meteor')

it("environment - client basics", function (done) {
  test.isTrue(Meteor.isClient)
  test.isFalse(Meteor.isServer)
  done()
})
