var migratedKeys = {};
var Reload = require('meteor/reload')
var ReactiveDict = require('meteor/reactive-dict')
var migrationData = Reload._migrationData('session');

if (migrationData && migrationData.keys) {
    migratedKeys = migrationData.keys;
}

var Session = module.exports =  new ReactiveDict(migratedKeys);

Reload._onMigrate('session', function () {
    return [true, {keys: Session.keys}];
});
