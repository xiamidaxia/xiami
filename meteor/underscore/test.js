var _ = require('./underscore')

it ('underscore', function(done) {
    test.deepEqual(_.extend({}, {a:3, b:4}), {a:3,b:4})
    done()
})