import { saveSteamSha } from '../steamSha/saveSteamSha'
import { weplayLogger } from '../../../services/logger'

const serverLogger = weplayLogger.common.child({
  logger: 'createBot/saveSteamSha',
})

export function handleUpdateMachineAuth(steamLogin, matchId) {
  serverLogger.info(`[${steamLogin}][${matchId}] Saving sha sentry file...`)

  return async (shaSentryInput, callback) => {
    const hashedShaSentryFile = await saveSteamSha({
      steamLogin,
      shaSentryInput,
    })
    // Steam uses this callback it under the hood
    callback({
      sha_file: hashedShaSentryFile,
    })
  }
}
