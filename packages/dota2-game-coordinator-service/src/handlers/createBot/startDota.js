import { weplayLogger } from '../../services/logger'
import { getMinutesPassedCounter, getSecondsPassedCounter } from '../helpers/timeCounters'
import { botManager } from '../../services/botManager'

const firstErrorConnectionTimeoutSeconds = 20
const secondErrorConnectionTimeoutMinutes = 10

const serverLogger = weplayLogger.common.child({
  logger: 'createBot/startDota',
})

export const startDota = ({ steamClient, dota2Client, steamLogin, matchId, bot }) =>
  new Promise((resolve, reject) => {
    const startTime = Date.now()
    let isConnectionProblemPresent = false

    const { timers } = bot

    /* if (timers.firstErrorConnectionTimeoutDota) {
      clearTimeout(timers.firstErrorConnectionTimeoutDota)
      timers.firstErrorConnectionTimeoutDota = null
    }
    if (timers.secondErrorConnectionTimeoutDota) {
      clearTimeout(timers.secondErrorConnectionTimeoutDota)
      timers.secondErrorConnectionTimeoutDota = null
    } */

    timers.firstErrorConnectionTimeoutDota = setTimeout(() => {
      serverLogger.warn(
        `[${steamLogin}][${matchId}] Dota 2 launch passed ${firstErrorConnectionTimeoutSeconds} seconds...`,
      )

      // Send msg to RMQ dota_match_problem, code: 2
      isConnectionProblemPresent = true
    }, firstErrorConnectionTimeoutSeconds * 1000)

    timers.secondErrorConnectionTimeoutDota = setTimeout(() => {
      serverLogger.warn(
        `[${steamLogin}][${matchId}] Dota 2 launch passed ${secondErrorConnectionTimeoutMinutes} minutes. Manual match control is required!`,
      )

      // Send msg to RMQ dota_match_problem, code: 3

      dota2Client.exit()
      dota2Client.removeAllListeners()
      steamClient.disconnect()
      steamClient.removeAllListeners()

      botManager.deleteBot(steamLogin)

      reject(new Error(`[${steamLogin}][${matchId}] Dota 2 launch time is over.`))
    }, secondErrorConnectionTimeoutMinutes * 60 * 1000)

    dota2Client.once('ready', () => {
      const minutesPassed = getMinutesPassedCounter(startTime)
      const secondsPassed = getSecondsPassedCounter(startTime)

      serverLogger.info(
        `[${steamLogin}][${matchId}] Client connected to Dota 2 (${minutesPassed} minutes ${secondsPassed} seconds passed).`,
      )

      if (isConnectionProblemPresent) {
        // Send msg to RMQ dota_match_problem_resolved
      }

      if (timers.firstErrorConnectionTimeoutDota) {
        clearTimeout(timers.firstErrorConnectionTimeoutDota)
        timers.firstErrorConnectionTimeoutDota = null
      }
      if (timers.secondErrorConnectionTimeoutDota) {
        clearTimeout(timers.secondErrorConnectionTimeoutDota)
        timers.secondErrorConnectionTimeoutDota = null
      }

      resolve()
    })

    serverLogger.info(
      `[${steamLogin}][${matchId}] Waiting ${secondErrorConnectionTimeoutMinutes} minutes until Dota 2 connection is completed.`,
    )
    dota2Client.launch()
  })
