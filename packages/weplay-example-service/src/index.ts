const express = require('express')
const {
  wrapAppHttpWithLogger,
  mainLogger,
  debugMethods,
  SentryInstance,
  safeStringify,
} = require('weplay-node-logger')
const { addListener } = require('weplay-node-shutdown')
const { getConfig } = require('weplay-node-cloud-config')
const { register, deregister } = require('weplay-node-registration')

const serverLogger = mainLogger.child({
  logger: 'server/index',
})
const DEFAULT_PORT = 3000
const PORT = process.env.PORT || DEFAULT_PORT
const envLabel =
  process.env.ENV_LABEL === 'localhost' ? 'dev' : process.env.ENV_LABEL
serverLogger.info(`process.env.PORT=${process.env.PORT}`)

const DEFAULT_HOST = 'localhost'
const HOST = process.env.HOST || DEFAULT_HOST
serverLogger.info(`process.env.HOST=${process.env.HOST}`)
;(async () => {
  const serviceName = 'weplay-example-service'
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
    const serverApp = express()
    serverApp.use(SentryInstance.Handlers.requestHandler())
    wrapAppHttpWithLogger(serverApp)
    debugMethods({
      object: serverApp,
      methods: ['listen'],
      caller: 'serverApp',
    })
    serverApp.use(express.json())
    serverApp.get('/health-check', (req: any, res: any) =>
      res.json({
        status: 'up',
      }),
    )
    // <=========== HANDLERS =============>

    // </=========== HANDLERS =============>
    serverApp.use(SentryInstance.Handlers.errorHandler())
    await new Promise((resolve, reject) => {
      serverApp.listen(PORT, (err: object) => (err ? reject(err) : resolve()))
    })
    // <=========== AWAIT ALL RESOURCES =============>

    // </=========== AWAIT ALL RESOURCES =============>
    await register(eurekaConfig)
    await addListener(() => deregister(eurekaConfig))
  } catch (e) {
    serverLogger.warn(`root error - ${safeStringify(e)}`)
    SentryInstance.captureException(e)
    await deregister(eurekaConfig)
  }
})()
