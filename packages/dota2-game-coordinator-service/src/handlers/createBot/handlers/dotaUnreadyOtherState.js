import { getMinutesPassedCounter, getSecondsPassedCounter } from '../../helpers/timeCounters'
import { weplayLogger } from '../../../services/logger'
import { getKeyByValue } from '../../helpers'
import { gameState } from '../../../config'

const serverLogger = weplayLogger.common.child({
  logger: 'createBot/handleDotaUnready',
})

export function dotaUnreadyOtherState(dota2Client, steamClient, steamLogin, matchId, bot) {
  const startTime = Date.now()
  const gameStateName = getKeyByValue(gameState, bot.matchState)

  serverLogger.info(`[${steamLogin}][${matchId}] Match state: ${gameStateName}`)

  dota2Client.removeAllListeners('ready')

  dota2Client.once('ready', async () => {
    const minutesPassed = getMinutesPassedCounter(startTime)
    const secondsPassed = getSecondsPassedCounter(startTime)

    serverLogger.info(
      `[${steamLogin}][${matchId}] Dota 2 now is alive (${minutesPassed} minutes ${secondsPassed} seconds passed).`,
    )

    // Send event to RMQ dota_match_problem_resolved
  })
}
