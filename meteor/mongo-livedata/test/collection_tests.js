var Meteor = require('meteor/meteor')
it('collection - call Meteor.Collection without new', function (done) {
    test.throws(
      function () {
        Meteor.Collection(null);
      },
      /use "new" to construct a Meteor\.Collection/
    );
    done()
})
