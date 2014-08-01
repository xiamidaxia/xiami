var xpm = require('xpm')
var Fiber = require('fibers')

var xpm = require('xpm').serverCreate({
    cwd: __dirname
})

xpm.require('meteor/livedata')
//xpm.require('xiami/webapp')

xpm.test([
    "meteor/mongo-livedata"
], {bail:true})

