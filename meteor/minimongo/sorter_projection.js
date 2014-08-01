var Minimongo = require('./minimongo').Minimongo
var combineImportantPathsIntoProjection = require('./selector_projection').combineImportantPathsIntoProjection
Minimongo.Sorter.prototype.combineIntoProjection = function (projection) {
  var self = this;
  var specPaths = Minimongo._pathsElidingNumericKeys(self._getPaths());
  return combineImportantPathsIntoProjection(specPaths, projection);
};
