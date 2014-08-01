/**
 *  fork from https://github.com/visionmedia/debug
 *
 *  @author liuwencheng
 *  @date 14-4-7
 */
"use strict"
var debug = require('debug')
debug.enable('xiami*')
debug = debug("xiami:")

module.exports = debug
