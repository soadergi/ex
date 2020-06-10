/* eslint-disable import/no-unresolved,node/no-missing-import,import/extensions */
import express from 'express'
// @ts-ignore
import { getConfig } from 'weplay-node-cloud-config'
// @ts-ignore
import { register, deregister } from 'weplay-node-registration'
// @ts-ignore
import { WeplayLogger } from 'weplay-node-logger'
import { rmqManager } from './services/rmqManager'
import { shutdownManager } from './services/shutdownManager'
import { weplayLogger, expressLogger } from './services/logger'
import { auth } from './middlewares/auth'
import { createMatch, deleteMatch } from './handlers/matchManager'
import { crashSteam, disableDota2, enableDota2 } from './handlers/test'

const serverLogger = weplayLogger.common.child({
  logger: 'server/index',
})
const DEFAULT_PORT = 3000
const PORT = process.env.PORT || DEFAULT_PORT
const envLabel = process.env.ENV_LABEL === 'localhost' ? 'dev' : process.env.ENV_LABEL
serverLogger.info(`process.env.PORT=${process.env.PORT}`)

const DEFAULT_HOST = 'localhost'
const HOST = process.env.HOST || DEFAULT_HOST
serverLogger.info(`process.env.HOST=${process.env.HOST}`)
;(async () => {
  const serviceName = process.env.SERVICE_NAME
  const config = await getConfig({
    envLabel,
    cloudConfigUrl: process.env.CLOUD_CONFIG_URL,
    serviceName,
  })
  serverLogger.info(`cloud config - ${JSON.stringify(config)}`)
  const eurekaConfig = {
    eurekaUri: String(config.eureka.uri),
    heartbeatInterval: Number(config.eureka.heartbeatInterval) || 30,
    instanceId: `${serviceName}.${envLabel}:${serviceName}:${HOST}:${PORT}`,
    instanceUrl: `http://${HOST}:${PORT}`,
    serviceName,
    host: String(HOST),
    port: Number(PORT),
    envLabel,
  }

  try {
    const rabbitPromise = rmqManager.connect(config.rmqConnectSettings)
    const expressApp = express()
    // @ts-ignore
    expressLogger.addRequestLogger(expressApp, envLabel)
    weplayLogger.debugMethods({
      object: expressApp,
      methods: ['listen'],
      caller: 'serverApp',
    })
    expressApp.use(express.json())
    expressApp.get('/health-check', (req, res) =>
      res.json({
        status: 'up',
      }),
    )

    // <=========== MIDDLEWARES =============>
    expressApp.use(auth)
    // </=========== MIDDLEWARES =============>

    // <=========== HANDLERS =============>
    expressApp.delete('/match?:steam_login', deleteMatch)
    expressApp.post('/match', createMatch)
    expressApp.post('/api/crash_steam', crashSteam)
    expressApp.post('/api/disable_dota', disableDota2)
    expressApp.post('/api/enable_dota', enableDota2)
    // </=========== HANDLERS =============>

    // @ts-ignore
    expressLogger.addErrorLogger(expressApp, envLabel)
    const listenAppPromise = new Promise(resolve => {
      expressApp.listen(PORT, resolve)
    })
    const registerShutdownPromise = shutdownManager.addListener(() =>
      // @ts-ignore
      deregister(eurekaConfig),
    )
    await Promise.all([
      // common
      listenAppPromise,
      registerShutdownPromise,
    ])
    await rabbitPromise
    // @ts-ignore
    await register(eurekaConfig)
  } catch (e) {
    serverLogger.warn(`root error - ${WeplayLogger.safeStringify(e)}`)
    debugger
    weplayLogger.captureException(e)
    // @ts-ignore
    await deregister(eurekaConfig)
  }
})()
