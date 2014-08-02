var Meteor = require('meteor/meteor')
require('./base64')
require('./stringify')
module.exports = Meteor.EJSON = require('./ejson')