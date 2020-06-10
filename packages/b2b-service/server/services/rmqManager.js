const { RMQManager } = require('weplay-node-rmq')

const { shutdownManager } = require('./shutdownManager')
const { weplayLogger } = require('./logger')

const rmqManager = new RMQManager(weplayLogger, shutdownManager)
module.exports.rmqManager = rmqManager
