/* eslint-disable import/no-unresolved,node/no-missing-import,import/extensions */
import { sendRemainingTimeNotification } from '../chatTimer'
import { checkLobbyReadiness } from '../checkLobbyReadiness'
import { weplayLogger } from '../../services/logger'
import { gameState } from '../../config'
/* eslint-enable import/no-unresolved,node/no-missing-import,import/extensions */

const serverLogger = weplayLogger.common.child({
  logger: 'createBot/restartWarmUp',
})

export function restartWarmUp(dota2Client, steamClient, bot, steamLogin, matchId) {
  if (bot.matchState === gameState.INIT) {
    bot.gameConfig.lobbyCreatedTime = Date.now()
    sendRemainingTimeNotification(dota2Client, bot.gameConfig, steamLogin, matchId)
    bot.gameConfig.warmUpTimerId = setTimeout(() => {
      checkLobbyReadiness(dota2Client, steamClient, bot.gameConfig, bot.gameConfig.lastLobbyImage)
    }, bot.gameConfig.minutesBeforeStart * 60 * 1000)

    serverLogger.info(`[${steamLogin}][${matchId}] Restarting warm-up timer and countdown timer.`)
  }
}
