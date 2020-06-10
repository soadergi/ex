// TODO: not sure what this thing does
// so the program will not close instantly
process.stdin.resume()
// TODO: this should be winston.Logger
interface Logger {
  warn(message: string): void
  child(param: { logger: string }): Logger

  info(message: string): void

  error(message: string): void
}
interface WeplayLogger {
  captureException(err: Error): void
  common: Logger
}
export class ShutdownManager {
  static KILLING_SIGNALS: NodeJS.Signals[] = [
    'SIGHUP',
    'SIGINT',
    'SIGQUIT',
    'SIGILL',
    'SIGTRAP',
    'SIGABRT',
    'SIGBUS',
    'SIGFPE',
    'SIGUSR1',
    'SIGSEGV',
    'SIGUSR2',
    'SIGTERM',
  ]

  readonly clenupHandlers: {
    [index: string]: any
  }

  private logger: WeplayLogger

  constructor(logger: WeplayLogger) {
    this.clenupHandlers = {}
    this.logger = logger
    this.init()
  }

  private init() {
    ShutdownManager.KILLING_SIGNALS.forEach(signal =>
      process.on(signal, this.onExitSignal),
    )
    process.on('exit', async () => {
      this.logger.common.warn('on exit hanlder called')
      // TODO: think if we need here smth
    })
    process.on('uncaughtException', (err: Error) => {
      this.captureException(err)
    })
  }

  private captureException = (err: Error) => {
    this.logger.captureException(err)
  }

  private onExitSignal = async (sig: NodeJS.Signals) => {
    await Promise.all(this.callListeners(sig))
    process.exit(0)
  }

  private callListeners = (sig: NodeJS.Signals) =>
    Object.keys(this.clenupHandlers).map((key: string) => {
      const fn = this.clenupHandlers[key]
      delete this.clenupHandlers[key]
      return fn(sig)
    })

  public addListener = (listener: () => {}) => {
    if (process.env.ENV_LABEL === 'localhost') {
      return ''
    }
    const key = Math.random()
    this.clenupHandlers[key] = listener
    return key
  }

  public removeListener = (key: number) => {
    const handler = this.clenupHandlers[key]
    if (handler) {
      return delete this.clenupHandlers[key]
    }
    this.logger.common.warn('error during removing listener during clenup')
    return false
  }
}
