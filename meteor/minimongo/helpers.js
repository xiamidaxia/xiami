var Meteor = require('meteor/meteor')
var EJSON = require('meteor/ejson')
var Deps = require('meteor/deps')
var Random = require('meteor/random')
var _ = require('meteor/underscore')
var LocalCollection = require('./minimongo').LocalCollection

// Like _.isArray, but doesn't regard polyfilled Uint8Arrays on old browsers as
// arrays.
// XXX maybe this should be EJSON.isArray
exports.isArray = function (x) {
  return _.isArray(x) && !EJSON.isBinary(x);
};

// XXX maybe this should be EJSON.isObject, though EJSON doesn't know about
// RegExp
// XXX note that _type(undefined) === 3!!!!
exports.isPlainObject = function (x) {
  return x && LocalCollection._f._type(x) === 3;
};

exports.isIndexable = function (x) {
  return exports.isArray(x) || exports.isPlainObject(x);
};

// Returns true if this is an object with at least one key and all keys begin
// with $.  Unless inconsistentOK is set, throws if some keys begin with $ and
// others don't.
exports.isOperatorObject = function (valueSelector, inconsistentOK) {
  if (!exports.isPlainObject(valueSelector))
    return false;

  var theseAreOperators = undefined;
  _.each(valueSelector, function (value, selKey) {
    var thisIsOperator = selKey.substr(0, 1) === '$';
    if (theseAreOperators === undefined) {
      theseAreOperators = thisIsOperator;
    } else if (theseAreOperators !== thisIsOperator) {
      if (!inconsistentOK)
        throw new Error("Inconsistent operator: " +
                        JSON.stringify(valueSelector));
      theseAreOperators = false;
    }
  });
  return !!theseAreOperators;  // {} has no operators
};


// string can be converted to integer
exports.isNumericKey = function (s) {
  return /^[0-9]+$/.test(s);
};
