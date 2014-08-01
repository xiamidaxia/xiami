Meteor = require('meteor/meteor')

it "meteor - debug", (done)->
    Meteor._suppress_log(3)
    Meteor._debug()
    Meteor._debug('test one arg')
    Meteor._debug('this', 'is', 'a', 'test')
    done()
