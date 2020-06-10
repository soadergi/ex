import { weplayLogger } from '../../../services/logger'
import { gameState } from '../../../config/index'
import { dotaUnreadyInitState } from './dotaUnreadyInitState'
import { dotaUnreadyOtherState } from './dotaUnreadyOtherState'

const serverLogger = weplayLogger.common.child({
  logger: 'createBot/handleDotaUnready',
})

export const handleDotaUnready = (dota2Client, steamClient, steamLogin, matchId, bot) => () => {
  serverLogger.error(`[${steamLogin}][${matchId}] Dota 2 is unready! Trying to reconnect...`)

  // Send 1st message to RMQ (send RMQ event dota_match_problem, code: 2)

  switch (bot.matchState) {
    case gameState.INIT:
      dotaUnreadyInitState(dota2Client, steamClient, steamLogin, matchId, bot)
      break
    case undefined:
      serverLogger.info(`[${steamLogin}][${matchId}] o_O Something went wrong with (Dota 2)...`)
      break
    default:
      dotaUnreadyOtherState(dota2Client, steamClient, steamLogin, matchId, bot)
  }
}
