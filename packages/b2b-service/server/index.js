const express = require('express')
const next = require('next')
const { WeplayLogger } = require('weplay-node-logger')
const { getConfig } = require('weplay-node-cloud-config')
const { register, deregister } = require('weplay-node-registration')

const { CONTACT_FORM_PATH } = require('../config/contactFormPath')

const { shutdownManager } = require('./services/shutdownManager')
const { rmqManager } = require('./services/rmqManager')
const { weplayLogger, expressLogger } = require('./services/logger')
const { contactFormHandler } = require('./routes/contact-form')

const serverLogger = weplayLogger.common.child({
  logger: 'server/index',
})
const DEFAULT_PORT = 3000
const PORT = process.env.PORT || DEFAULT_PORT
const dev = process.env.NODE_ENV !== 'production'
const envLabel = process.env.ENV_LABEL === 'localhost' ? 'dev' : process.env.ENV_LABEL
serverLogger.info(`process.env.PORT=${process.env.PORT}`)

const DEFAULT_HOST = 'localhost'
const HOST = process.env.HOST || DEFAULT_HOST
serverLogger.info(`process.env.HOST=${process.env.HOST}`)

const DEFAULT_EUREKA_HEARTBEAT_INTERVAL = 30;
(async () => {
  const serviceName = 'b2b-service'
  const config = await getConfig({
    envLabel,
    cloudConfigUrl: process.env.CLOUD_CONFIG_URL,
    serviceName,
  })
  const eurekaConfig = {
    eurekaUri: config.eureka.uri,
    heartbeatInterval: config.eureka.heartbeatInterval || DEFAULT_EUREKA_HEARTBEAT_INTERVAL,
    instanceId: `${serviceName}.${envLabel}:${serviceName}:${HOST}:${PORT}`,
    instanceUrl: `http://${HOST}:${PORT}`,
    serviceName,
    host: HOST,
    port: PORT,
    envLabel,
  }

  try {
    const rabbitPromise = rmqManager.connect(config.rmqConnectSettings)
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

    // ========== SPECIFIC B2B PART
    expressApp.post(CONTACT_FORM_PATH.BUSINESS, (req, res) => contactFormHandler(req, res, {
      // TODO: remove, temp solution mailQName adminEmails
      mailQName: config.mailQName,
      emails: config.emails.business,
    }))

    expressApp.post(CONTACT_FORM_PATH.PRESS, (req, res) => contactFormHandler(req, res, {
      // TODO: remove, temp solution mailQName adminEmails
      mailQName: config.mailQName,
      emails: config.emails.press,
    }))

    // ========= _dynamic-pages ===========
    expressApp.get('(/ru)?/blog/article/:nameAndId', async (req, res) => nextApp.render(
      req,
      res,
      '/_dynamic-pages/article',
      { ...req.query, ...req.params },
    ))
    // TODO: @Rohovoi rename nameAndId to projectSlug at the final step (before release updated projects)
    expressApp.get('(/ru)?/projects/:nameAndId', async (req, res) => nextApp.render(
      req,
      res,
      '/_dynamic-pages/project',
      { ...req.query, ...req.params },
    ))
    expressApp.get('(/ru)?/team/:memberName', async (req, res) => nextApp.render(
      req,
      res,
      '/_dynamic-pages/teamMember',
      { ...req.query, ...req.params },
    ))
    // ========= _dynamic-pages ===========

    expressApp.get('/ru', async (req, res) => nextApp.render(req, res, '/', req.query))
    expressApp.get('/ru*', async (req, res) => nextApp.render(req, res, req.params[0], req.query))
    expressApp.get('*', (req, res) => handle(req, res))
    expressLogger.addErrorLogger(expressApp)
    const listenAppPromise = new Promise((resolve, reject) => {
      expressApp.listen(PORT, err => (err
        ? reject(err)
        : resolve()
      ))
    })
    const registerShutdownPromise = shutdownManager.addListener(() => deregister(eurekaConfig))
    await Promise.all([
      // common
      appPreparePromise,
      listenAppPromise,
      registerShutdownPromise,
    ])
    // B2B specific
    await rabbitPromise

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
