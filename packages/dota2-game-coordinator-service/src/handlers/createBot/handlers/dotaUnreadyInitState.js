import { botManager } from '../../../services/botManager'
import { stopWarmUp } from '../stopWarmUp'
import { getMinutesPassedCounter, getSecondsPassedCounter } from '../../helpers/timeCounters'
import { prepareLobby } from '../../createLobby'
import { weplayLogger } from '../../../services/logger'
import { leavePreviousLobby } from '../../createLobby/leavePreviousLobby'

const serverLogger = weplayLogger.common.child({
  logger: 'createBot/dotaUnreadyInitState',
})

const secondErrorConnectionTimeoutMinutes = 10

export function dotaUnreadyInitState(dota2Client, steamClient, steamLogin, matchId, bot) {
  const startTime = Date.now()

  const { timers } = bot

  /* if (timers.secondErrorConnectionTimeoutDota) {
    clearTimeout(timers.secondErrorConnectionTimeoutDota)
    timers.secondErrorConnectionTimeoutDota = null
  } */

  timers.secondErrorConnectionTimeoutDota = setTimeout(() => {
    serverLogger.info(`[${steamLogin}][${matchId}] Dota 2 reconnecting time is over. Manual match control is required!`)

    // Send 2nd message to RMQ (send RMQ event dota_match_problem, code: 3)

    dota2Client.exit()
    steamClient.disconnect()
    dota2Client.removeAllListeners()
    steamClient.removeAllListeners()

    botManager.deleteBot(steamLogin)
  }, secondErrorConnectionTimeoutMinutes * 60 * 1000)

  serverLogger.info(
    `[${steamLogin}][${matchId}] Waiting ${secondErrorConnectionTimeoutMinutes} minutes until Dota 2 connection is completed.`,
  )

  stopWarmUp(bot, steamLogin, matchId)

  dota2Client.removeAllListeners('ready')
  dota2Client.removeAllListeners('practiceLobbyUpdate')
  dota2Client.removeAllListeners('chatMessage')

  dota2Client.once('ready', async () => {
    const minutesPassed = getMinutesPassedCounter(startTime)
    const secondsPassed = getSecondsPassedCounter(startTime)
    serverLogger.info(
      `[${steamLogin}][${matchId}] Dota 2 now is alive (${minutesPassed} minutes ${secondsPassed} seconds passed).`,
    )

    if (timers.secondErrorConnectionTimeoutDota) {
      clearTimeout(timers.secondErrorConnectionTimeoutDota)
      timers.secondErrorConnectionTimeoutDota = null
    }

    await leavePreviousLobby(dota2Client)
    bot.gameConfig = await prepareLobby(dota2Client, steamClient, bot.config, bot)

    // Send event to RMQ dota_match_problem_resolved

    serverLogger.info(`[${steamLogin}][${matchId}] Restarting warm-up timer and countdown timer.`)
  })
}
