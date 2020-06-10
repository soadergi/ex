const amqplib = require('amqplib')

interface rmqConnectSettingsInterface {
  protocol: 'amqp'
  hostname: string
  port: number
  username: string
  password: string
  vhost: string
  heartbeat: number
}

interface FormatMessageOptionsInterface {
  type?: string
  payload?: {
    data?: object
  }
}

interface sendOptionsInterface {
  q: string
  type: string
  payload?: object
  config?: object
}
interface publishInterface {
  exchangeName: string
  routingKey: string
  payload: object
  options?: object
}
// TODO: should be RMQ Channel
interface Channel {
  sendToQueue(q: string, buffer: any, config: object): void
  close(): void
}
// TODO: this should be winston.Logger
interface Logger {
  warn(message: string): void
  child(param: { logger: string }): Logger

  info(message: string): void

  error(message: string): void
}
interface WeplayLogger {
  debugMethods({ object, methods, caller }: { object: any; methods: string[]; caller: any }): void
  captureException(err: Error): void
  common: Logger
}
interface ShutdownManager {
  addListener(listener: () => Promise<void>): void
}
export class RMQManager {
  static RECONNECT_TIMEOUT = 1000

  readonly logger: Logger

  readonly weplayLogger: WeplayLogger

  private channel = {
    sendToQueue(q: string, buffer: any, config: object) {
      console.error('message send before channel opened', buffer, config)
    },
    publish(exchange: string, routingKey: string, content: any, options?: object) {
      console.error('message publish before channel opened', routingKey, exchange, content, options)
    },
    close() {
      console.error('closed before channel opened')
    },
  }

  private shutdownManager: ShutdownManager

  constructor(weplayLogger: WeplayLogger, shutdownManager: ShutdownManager) {
    this.weplayLogger = weplayLogger
    this.shutdownManager = shutdownManager
    this.logger = weplayLogger.common.child({
      logger: 'rmq',
    })
    this.init()
  }

  private init() {
    this.weplayLogger.debugMethods({
      object: amqplib,
      methods: ['connect'],
      caller: 'amqplib',
    })
  }

  private formatMessage = ({ type, payload }: FormatMessageOptionsInterface) => {
    // TODO: reformat this to some easy resusable way
    // TODO: looks like this part is not standartized yet - some message doesn't have even type
    // in meta
    switch (type) {
      case 'NOTIFICATION':
        return Buffer.from(
          JSON.stringify({
            meta: {
              type: 'NOTIFICATION',
              sender: {
                service: 'notification-service',
                version: '0.0.18',
              },
              protocol: {
                version: '1',
              },
              client_info: {
                user_id: '20541',
                trace_id: 'e2020d0e25269c46',
              },
              datetimes: {
                create_datetime: new Date().toISOString().slice(0, -1),
              },
            },
            data: payload?.data,
          }),
        )
      default:
        return Buffer.from(JSON.stringify(payload))
    }
  }

  public connect = async (rmqConnectSettings: rmqConnectSettingsInterface) => {
    const setTimeoutReconnect = () => setTimeout(() => this.connect(rmqConnectSettings), RMQManager.RECONNECT_TIMEOUT)
    try {
      const connection = await amqplib.connect(rmqConnectSettings)
      this.weplayLogger.debugMethods({
        object: connection,
        methods: ['createChannel'],
        caller: 'rmqConnection',
      })
      connection.on('error', (error: object) => {
        this.logger.error(`Connection error, ${error}`)
        setTimeoutReconnect()
      })
      // TODOL think if we need several channels?
      this.channel = await connection.createChannel()
      this.weplayLogger.debugMethods({
        object: this.channel,
        methods: ['sendToQueue', 'close'],
        caller: 'rmqConnection',
      })
      this.shutdownManager.addListener(async () => {
        await this.channel.close()
        await connection.disconnect()
      })
      return this.channel
    } catch (err) {
      setTimeoutReconnect()
      return Promise.resolve('Error handled')
    }
  }

  public send = ({ q, type, payload, config }: sendOptionsInterface) => {
    this.logger.info('rmqManager.publishToExchange() called with next params')
    this.logger.info(`q - ${q}`)
    this.logger.info(`type - ${type}`)
    this.logger.info(`payload - ${JSON.stringify(payload)}`)
    this.logger.info(`config - ${JSON.stringify(config)}`)

    const formattedMessage = this.formatMessage({
      type,
      payload,
    })
    return this.channel.sendToQueue(q, formattedMessage, {
      contentType: 'text/plain',
      ...config,
    })
  }

  public publishToExchange = async ({ exchangeName, routingKey, payload, options }: publishInterface) => {
    this.logger.info('rmqManager.publishToExchange() called with next params')
    this.logger.info(`exchangeName - ${exchangeName}`)
    this.logger.info(`routingKey - ${routingKey}`)
    this.logger.info(`payload - ${JSON.stringify(payload)}`)
    this.logger.info(`options - ${JSON.stringify(options)}`)
    const formattedMessage = this.formatMessage({
      payload,
    })
    const isPublished = await this.channel.publish(exchangeName, routingKey, formattedMessage, options)
    this.logger.info(`rmqManager.publishToExchange() finshed with isPublished - ${isPublished}`)
    return isPublished
  }
}
