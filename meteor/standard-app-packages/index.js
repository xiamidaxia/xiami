//You can remove any you don't want.

// The normal "every package uses 'meteor'" rule only applies to packages
// built from a package source directory, so we make sure apps get it too.
// Meteor.isServer! The CSS extension handler! And so much more!
global._ = require('meteor/underscore')
global.Meteor = require('meteor/meteor'),
// A standard Meteor app is a web app. (Without this, there will be no
// 'main' function unless you define one yourself.)
global.isServer && require('meteor/webapp'),
// It's Log! It's better than bad, it's good!
require('meteor/logging'),
// Deps.autorun and friends. What's Meteor without reactivity?
global.Deps = require('meteor/deps'),
// The easiest way to get a little reactivity into your app.
global.isClient && (global.Session = require('meteor/session')),
// DDP: Meteor's client/server protocol.
require('meteor/livedata'),
// You want to keep your data somewhere? How about MongoDB?
require('meteor/mongo-livedata'),
// Easy type assertions? check.
global.check = require('meteor/check').check,
global.Match = require('meteor/check').Match
// Life isn't always predictable.
global.Random = require('meteor/random'),
// People like being able to clone objects.
global.EJSON = require('meteor/ejson')
// These are useful too!  But you don't have to see their exports
// unless you want to.
// We can reload the client without messing up methods in flight.
global.isClient && require('meteor/reload')
// And update automatically when new client code is available!
//require('meteor/autoupdate')
global.Accounts = require('meteor/accounts-base')
require('meteor/accounts-password')
