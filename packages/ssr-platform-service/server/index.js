const express = require('express')
const next = require('next')
const { WeplayLogger } = require('weplay-node-logger')
const { getConfig } = require('weplay-node-cloud-config')
const { register, deregister } = require('weplay-node-registration')

const { weplayLogger, expressLogger } = require('./services/logger')
const { shutdownManager } = require('./services/shutdownManager')

const serverLogger = weplayLogger.common.child({
  logger: 'server/index',
})
const DEFAULT_PORT = 3000
const PORT = process.env.PORT || DEFAULT_PORT
const dev = process.env.NODE_ENV !== 'production'
const envLabel = process.env.ENV_LABEL
serverLogger.info(`process.env.PORT=${process.env.PORT}`)

const DEFAULT_HOST = 'localhost'
const HOST = process.env.HOST || DEFAULT_HOST
serverLogger.info(`process.env.HOST=${process.env.HOST}`);
(async () => {
  const serviceName = 'ssr-platform-service'
  const config = await getConfig({
    envLabel,
    cloudConfigUrl: process.env.CLOUD_CONFIG_URL,
    serviceName,
  })
  const eurekaConfig = {
    eurekaUri: config.eureka.uri,
    heartbeatInterval: config.eureka.heartbeatInterval || 30,
    instanceId: `${serviceName}.${envLabel}:${serviceName}:${HOST}:${PORT}`,
    instanceUrl: `http://${HOST}:${PORT}`,
    serviceName,
    host: HOST,
    port: PORT,
    envLabel,
  }
  try {
    const nextApp = next({ dev })
    const handle = nextApp.getRequestHandler()
    nextApp.prepare = weplayLogger.withTryCatch({
      fn: nextApp.prepare,
      caller: 'NextApp',
    })
    const appPreparePromise = nextApp.prepare()
    const expressApp = express()
    expressLogger.addRequestLogger(expressApp)
    weplayLogger.debugMethods({
      object: expressApp,
      methods: ['listen'],
      caller: 'serverApp',
    })
    expressApp.use(express.json())
    expressApp.get('/health-check', (req, res) => res.json({
      status: 'up',
    }))
    // ========== SPECIFIC SSR PART
    // ========= _dynamic-pages ===========
    // ========= _dynamic-pages ===========

    // < ========== NEXT PART ========= >
    expressApp.get('/ru', async (req, res) => nextApp.render(req, res, '/', req.query))
    expressApp.get('/ru*', async (req, res) => nextApp.render(req, res, req.params[0], req.query))
    expressApp.get('*', (req, res) => handle(req, res))
    expressLogger.addErrorLogger(expressApp)
    const listenAppPromise = new Promise((resolve, reject) => {
      expressApp.listen(PORT, err => (err ? reject(err) : resolve()))
    })
    const registerShutdownPromise = shutdownManager.addListener(() => deregister(eurekaConfig))
    await Promise.all([
      appPreparePromise,
      listenAppPromise,
      registerShutdownPromise,
    ])
    // </ ========== NEXT PART =========>
    await register(eurekaConfig)
  } catch (e) {
    serverLogger.warn(`
      root error - ${WeplayLogger.safeStringify(e)}
      toString() - ${e.toString()}
    `)
    weplayLogger.captureException(e)
    await deregister(eurekaConfig)
  }
})()
