/*
var Meteor = require('meteor/meteor')
var test = global.test = new Meteor.Collection('test')
if (global.isServer) {
    Meteor.publish('test', function(a) {
        console.log('publish...')
        console.log(test.find({}).length)
        return test.find({})
    })
}

if (global.isClient) {
    Meteor.subscribe('test','subtest', function(err, res) {
        console.log('sub result: ' + err)
        console.log('sub result: ' + res)
        debugger;
    })

}
console.log('run common collections')*/
