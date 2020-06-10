import { weplayLogger } from './logger'

const serverLogger = weplayLogger.common.child({
  logger: 'service/botManager',
})

class BotManager {
  private bots = {}

  public async deleteBot(steamLogin) {
    if (this.bots[steamLogin]) {
      serverLogger.info(`[${steamLogin}] Bot was removed from the cache.`)
      delete this.bots[steamLogin]
    } else {
      serverLogger.warn(`[${steamLogin}] Bot not found.`)
    }
  }

  public async addBot(bot) {
    this.bots[bot.config.daemon.username] = bot
  }

  public async getBot(steamLogin) {
    return this.bots[steamLogin]
  }
}

export const botManager = new BotManager()
