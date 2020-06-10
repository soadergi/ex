const { WeplayLogger, ExpressLogger } = require('weplay-node-logger')

console.log(
  'check here should be always dota coordinator',
  process.env.SERVICE_NAME,
)
const serviceName = process.env.SERVICE_NAME
const sendtryDSN = process.env.SENTRY_DSN
const weplayLogger = new WeplayLogger(serviceName, sendtryDSN)
const expressLogger = new ExpressLogger(weplayLogger)
module.exports.weplayLogger = weplayLogger
module.exports.expressLogger = expressLogger
