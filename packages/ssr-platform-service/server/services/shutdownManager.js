const { ShutdownManager } = require('weplay-node-shutdown')

const { weplayLogger } = require('./logger')

module.exports.shutdownManager = new ShutdownManager(weplayLogger)
