const { WeplayLogger, ExpressLogger } = require('weplay-node-logger')

const serviceName = process.env.SERVICE_NAME
const sendtryDSN = process.env.SENTRY_DSN
const weplayLogger = new WeplayLogger(serviceName, sendtryDSN)
const expressLogger = new ExpressLogger(weplayLogger)
module.exports.weplayLogger = weplayLogger
module.exports.expressLogger = expressLogger
