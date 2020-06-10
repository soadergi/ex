import { weplayLogger } from '../../services/logger'

const serverLogger = weplayLogger.common.child({
  logger: 'createBot/stopWarmUp',
})

export function stopWarmUp(bot, steamLogin, matchId) {
  if (bot.gameConfig.warmUpTimerId) {
    clearTimeout(bot.gameConfig.warmUpTimerId)
    bot.gameConfig.warmUpTimerId = null
    serverLogger.info(`[${steamLogin}][${matchId}] Warm-up timer is stopped.`)
  }
  if (bot.gameConfig.lobbyCountdownTimerId) {
    clearInterval(bot.gameConfig.lobbyCountdownTimerId)
    bot.gameConfig.lobbyCountdownTimerId = null
    serverLogger.info(`[${steamLogin}][${matchId}] Countdown timer is stopped.`)
  }
}
