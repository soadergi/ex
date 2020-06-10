// eslint-disable-next-line max-classes-per-file
import { createLogger, format, transports } from 'winston'
import * as Sentry from '@sentry/node'

const LOG_LEVEL = process.env.LOG_LEVEL || 'info'
console.log('process.env.LOG_LEVEL', LOG_LEVEL)

interface ExpressRequest {
  url: string
}
// TODO: this should be winston.Logger
interface Logger {
  log(message: string): void
  warn(message: string): void
  child(param: { logger: string }): Logger

  info(message: string): void

  error(message: string): void
}
interface Sentry {
  Handlers: any
  captureException(err: Error): void
}
interface ExpressResponse {
  url: string
}
interface ExpressError {}

interface ExpressApp {
  use: (
    middleware: (
      err: ExpressError | 'undefined',
      req: ExpressRequest,
      res: ExpressResponse,
      next: (err?: ExpressError) => {},
    ) => void,
  ) => void
}

// const levels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   verbose: 3,
//   debug: 4,
//   silly: 5
// };
export class ExpressLogger {
  private requestLogger: Logger

  private expressErrorLogger: Logger

  private weplayLogger: WeplayLogger

  constructor(weplayLogger: WeplayLogger) {
    this.weplayLogger = weplayLogger
    this.requestLogger = weplayLogger.common.child({
      logger: 'request',
    })
    this.expressErrorLogger = weplayLogger.common.child({
      logger: 'expressError',
    })
  }

  private logRequest = (
    req: ExpressRequest,
    res: ExpressResponse,
    next: (err?: ExpressError) => {},
  ) => {
    this.requestLogger.info(req.url)
    next()
  }

  private logError = (
    err: ExpressError | 'undefined',
    req: ExpressRequest,
    res: ExpressResponse,
    next: (err?: ExpressError) => {},
  ) => {
    this.expressErrorLogger.error(JSON.stringify(err) || '')
    next(err)
  }

  public addRequestLogger = (app: ExpressApp) => {
    // @ts-ignore
    app.use(this.logRequest)
    if (process.env.ENV_LABEL !== 'localhost') {
      app.use(this.weplayLogger.getRequestHandler())
    }
  }

  public addErrorLogger = (app: ExpressApp) => {
    // @ts-ignore
    app.use(this.logError)
    if (process.env.ENV_LABEL !== 'localhost') {
      app.use(this.weplayLogger.getErrorHandler())
    }
  }
}

export class WeplayLogger {
  static safeStringify(json: any) {
    let argsStr = ''
    try {
      argsStr = JSON.stringify(json, null, '   ')
    } catch (err) {
      argsStr = 'cant stringify'
    }
    return argsStr
  }

  public common: Logger

  private SentryInstance: Sentry

  constructor(serviceName: string, sendtryDSN: string) {
    const consoleTransport = new transports.Console({
      level: LOG_LEVEL,
      handleExceptions: true,
    })

    const fileTransport = new transports.File({
      level: LOG_LEVEL,
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 1,
      filename: 'logs.txt',
    })
    // @ts-ignore
    this.common = createLogger({
      transports: [
        consoleTransport,
        ...(process.env.ENV_LABEL !== 'localhost' && [fileTransport]),
      ].filter(Boolean),
      level: LOG_LEVEL,
      defaultMeta: {
        serviceName,
        logger: '',
      },
      format: format.combine(
        format.timestamp(),
        format.printf(props => {
          const { level, message, timestamp, logger } = props
          return `[${timestamp}] ${level} ${serviceName} ${process.env.ENV_LABEL}: ${logger} ${message}`
        }),
      ),
    })
    console.log(`process.ENV.SENTRY_DSN - ${process.env.SENTRY_DSN}`)
    console.log(`process.ENV.ENV_LABEL - ${process.env.ENV_LABEL}`)
    Sentry.init({
      dsn: sendtryDSN,
      environment: process.env.ENV_LABEL,
      debug: true,
    })
    this.SentryInstance = Sentry
  }

  public captureException(err: Error) {
    if (process.env.ENV_LABEL !== 'localhost') {
      this.SentryInstance.captureException(err)
    }
  }

  public getRequestHandler() {
    return this.SentryInstance.Handlers.requestHandler()
  }

  public getErrorHandler() {
    return this.SentryInstance.Handlers.errorHandler()
  }

  public withTryCatch = ({
    fn,
    methodName,
    caller,
    fallback,
  }: {
    fn: (smth: any) => {}
    methodName: string
    caller: string
    fallback?: any
  }) => {
    const logManager = this
    return async function decoratedFn(...args: any[]) {
      const stringArgs = WeplayLogger.safeStringify(args)
      try {
        logManager.common.info(
          `${caller}.${methodName}() called with args: ${stringArgs}`,
        )
        // @ts-ignore
        const result = await fn.apply(this, args)
        logManager.common.info(
          `${caller}.${methodName}() finished with res: ${WeplayLogger.safeStringify(
            result,
          )}`,
        )
        return result
      } catch (error) {
        logManager.common.error(
          `${caller}.${methodName}() failed, using fallback ${WeplayLogger.safeStringify(
            fallback,
          )}
        error - ${WeplayLogger.safeStringify(error)}
        `,
        )
        if (process.env.ENV_LABEL !== 'localhost') {
          Sentry.captureException(error)
        } else {
          debugger // eslint-disable-line no-debugger
        }
        return fallback
      }
    }
  }

  public debugMethods = ({
    object,
    methods,
    caller,
  }: {
    object: any
    methods: string[]
    caller: any
  }) => {
    methods.forEach(method => {
      // eslint-disable-next-line no-param-reassign
      object[method] = this.withTryCatch({
        fn: object[method],
        methodName: method,
        caller,
      })
    })
    return object
  }
}
