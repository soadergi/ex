import steam from 'steam'
import retry from 'async-retry'
import { getConfigField } from 'weplay-node-cloud-config'
import { getAnotherSteamCredentialsFromGSM } from './getAnotherSteamCredentialsFromGSM'
import { loginSteamUser } from './loginSteamUser'
import { weplayLogger } from '../../services/logger'
import { connectSteamClient } from './connectSteamClient'
import { getEResultMessage } from '../helpers/getEResultMessage'
import { botManager } from '../../services/botManager'

const timeoutBetweenConnectionsMinutes = 2

const serverLogger = weplayLogger.common.child({
  logger: 'createBot/loginSteamUserPreparation',
})

export const loginSteamUserPreparation = async ({
  dota2Client,
  steamClient,
  steamUser,
  steamLogin,
  steamPassword,
  matchId,
  bot,
}) => {
  const loginRetriesCount = await getConfigField('loginRetriesCount')
  let username = steamLogin
  let password = steamPassword
  let loginSteamUserResponse

  bot.isLoginInProgress = true

  return retry(
    async (bail, retryNo) => {
      await connectSteamClient({ steamClient, steamLogin, matchId, bot })

      loginSteamUserResponse = await loginSteamUser({
        steamClient,
        steamUser,
        username,
        password,
        matchId,
      })

      const EResultMessage = getEResultMessage(loginSteamUserResponse.eresult)

      serverLogger.info(`[${steamLogin}][${matchId}] Login try #${retryNo} ended with EResult: ${EResultMessage}.`)

      switch (loginSteamUserResponse.eresult) {
        case steam.EResult.OK:
          if (retryNo !== 1) {
            // Send RMQ event dota_match_problem_resolved
          }
          bot.isLoginInProgress = false
          return { username, password }
        case steam.EResult.InvalidPassword: {
          if (retryNo === loginRetriesCount + 1) {
            setTimeout(() => {
              bot.isLoginInProgress = false
            }, 5 * 100)

            // send RMQ event dota_match_problem, code: 3

            serverLogger.error(`[${steamLogin}][${matchId}] Invalid Password and login retries count exceeded.`)
            throw Error(`[${steamLogin}][${matchId}] Invalid Password and login retries count exceeded.`)
          } else {
            // send RMQ event dota_match_problem, code: 1

            serverLogger.info(`[${steamLogin}][${matchId}] ${loginRetriesCount + 1 - retryNo} login retries left.`)
            serverLogger.warn(
              `[${steamLogin}][${matchId}] Invalid Password. Trying to reconnect in ${timeoutBetweenConnectionsMinutes} minutes.`,
            )
            const daemon = await getAnotherSteamCredentialsFromGSM({
              username,
              matchId,
            })
            username = daemon.username // 'weplay_bot2'
            password = daemon.password // 'kr474e8r'
            throw Error(`[${steamLogin}][${matchId}] Invalid Password`)
          }
        }
        case steam.EResult.ServiceUnavailable:
        default:
          if (retryNo === loginRetriesCount + 1) {
            setTimeout(() => {
              bot.isLoginInProgress = false
            }, 5 * 100)
            // send RMQ event dota_match_problem, code: 3

            dota2Client.exit()
            steamClient.disconnect()
            dota2Client.removeAllListeners()
            steamClient.removeAllListeners()

            await botManager.deleteBot(steamLogin)

            serverLogger.error(
              `[${steamLogin}][${matchId}] Unhandled Steam Error (${EResultMessage}) and login retries count exceeded.`,
            )
            throw Error(
              `[${steamLogin}][${matchId}] Unhandled Steam Error (${EResultMessage}) and login retries count exceeded.`,
            )
          } else {
            // send RMQ event dota_match_problem, code: 1

            serverLogger.info(`[${steamLogin}][${matchId}] ${loginRetriesCount + 1 - retryNo} login retries left.`)
            serverLogger.warn(
              `[${steamLogin}][${matchId}] Unhandled Steam Error (${EResultMessage}). Trying to reconnect in ${timeoutBetweenConnectionsMinutes} minutes.`,
            )
            throw Error(`[${steamLogin}][${matchId}] Unhandled Steam Error (${EResultMessage})`)
          }
      }
    },
    {
      retries: loginRetriesCount,
      minTimeout: timeoutBetweenConnectionsMinutes * 60 * 1000,
      factor: 1,
      randomize: false,
    },
  )
}
