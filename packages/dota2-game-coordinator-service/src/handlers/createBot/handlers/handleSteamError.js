import { weplayLogger } from '../../../services/logger'
import { gameState } from '../../../config'
import { steamErrorOtherState } from './steamErrorOtherState'
import { steamErrorInitState } from './steamErrorInitState'

const serverLogger = weplayLogger.common.child({
  logger: 'createBot/handleSteamError',
})

export const handleSteamError = (steamUser, steamLogin, steamPassword, matchId, bot) => async error => {
  serverLogger.error(`[${steamLogin}][${matchId}] Connection closed by Steam server: ${error}.`)

  if (bot.isLoginInProgress) return

  const { steamClient, dota2Client, timers } = bot

  dota2Client.exit()

  dota2Client.removeAllListeners('ready')
  steamClient.removeAllListeners('connected')

  if (timers.firstErrorConnectionTimeoutDota) {
    clearTimeout(timers.firstErrorConnectionTimeoutDota)
    timers.firstErrorConnectionTimeoutDota = null
  }

  if (timers.secondErrorConnectionTimeoutDota) {
    clearTimeout(timers.secondErrorConnectionTimeoutDota)
    timers.secondErrorConnectionTimeoutDota = null
  }

  if (timers.secondErrorConnectionTimeoutSteam) {
    clearTimeout(timers.secondErrorConnectionTimeoutSteam)
    timers.secondErrorConnectionTimeoutSteam = null
  }

  // Also need to stop Dota 2 connection timers if they exist

  serverLogger.warn(`[${steamLogin}][${matchId}] Trying to reconnect Steam...`)

  // Send event to RMQ dota_match_problem, code: 1

  // TODO: write specific handlers when Steam is dead for another game states (default)
  switch (bot.matchState) {
    case gameState.INIT:
      await steamErrorInitState(steamClient, dota2Client, steamUser, steamLogin, steamPassword, matchId, bot)
      break
    case undefined:
      serverLogger.warn(`[${steamLogin}][${matchId}] Match state is undefined (Steam handler).`)
      break
    default:
      await steamErrorOtherState(steamClient, dota2Client, steamUser, steamLogin, steamPassword, matchId, bot)
  }
}
