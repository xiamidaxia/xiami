var LocalCollection = require('./minimongo').LocalCollection
var Meteor = require('meteor/meteor')
var IdMap = require('meteor/id-map')

LocalCollection._IdMap = function () {
  var self = this;
  IdMap.call(self, LocalCollection._idStringify, LocalCollection._idParse);
};

Meteor._inherits(LocalCollection._IdMap, IdMap);

