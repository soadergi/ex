import { weplayLogger } from '../../services/logger'
import { getMinutesPassedCounter, getSecondsPassedCounter } from '../helpers/timeCounters'

const firstErrorConnectionTimeoutSeconds = 20
const secondErrorConnectionTimeoutMinutes = 3

const serverLogger = weplayLogger.common.child({
  logger: 'createBot/connectSteamClient',
})

export const connectSteamClient = ({ steamClient, steamLogin, matchId, bot }) =>
  new Promise((resolve, reject) => {
    const startTime = Date.now()
    let isConnectionProblemPresent = false

    const { timers } = bot

    /* if (timers.firstErrorConnectionTimeoutSteam) {
      clearTimeout(timers.firstErrorConnectionTimeoutSteam)
      timers.firstErrorConnectionTimeoutSteam = null
    }
    if (timers.secondErrorConnectionTimeoutSteam) {
      clearTimeout(timers.secondErrorConnectionTimeoutSteam)
      timers.secondErrorConnectionTimeoutSteam = null
    } */

    timers.firstErrorConnectionTimeoutSteam = setTimeout(() => {
      serverLogger.warn(
        `[${steamLogin}][${matchId}] Connection to Steam passed ${firstErrorConnectionTimeoutSeconds} seconds...`,
      )

      // send msg to RMQ dota_match_problem, code: 1

      isConnectionProblemPresent = true
    }, firstErrorConnectionTimeoutSeconds * 1000)

    timers.secondErrorConnectionTimeoutSteam = setTimeout(() => {
      serverLogger.error(
        `[${steamLogin}][${matchId}] Connection to Steam passed ${secondErrorConnectionTimeoutMinutes} minutes...`,
      )

      // send msg to RMQ dota_match_problem, code: 3

      steamClient.disconnect()
      steamClient.removeAllListeners('connected')

      reject(new Error(`[${steamLogin}][${matchId}] Steam connection time is over.`))
    }, secondErrorConnectionTimeoutMinutes * 60 * 1000)

    steamClient.once('connected', () => {
      const minutesPassed = getMinutesPassedCounter(startTime)
      const secondsPassed = getSecondsPassedCounter(startTime)

      serverLogger.info(
        `[${steamLogin}][${matchId}] Client connected to Steam (${minutesPassed} minutes ${secondsPassed} seconds passed).`,
      )

      if (isConnectionProblemPresent) {
        // send msg to RMQ dota_match_problem_resolved
      }

      if (timers.firstErrorConnectionTimeoutSteam) {
        clearTimeout(timers.firstErrorConnectionTimeoutSteam)
        timers.firstErrorConnectionTimeoutSteam = null
      }
      if (timers.secondErrorConnectionTimeoutSteam) {
        clearTimeout(timers.secondErrorConnectionTimeoutSteam)
        timers.secondErrorConnectionTimeoutSteam = null
      }

      resolve()
    })

    serverLogger.info(
      `[${steamLogin}][${matchId}] Waiting ${secondErrorConnectionTimeoutMinutes} minutes until Steam connection is completed.`,
    )
    steamClient.connect()
  })
