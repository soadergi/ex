import { saveSteamServers } from '../steamServers/saveSteamServers'
import { weplayLogger } from '../../../services/logger'

const serverLogger = weplayLogger.common.child({
  logger: 'createBot/handleSteamServers',
})

export function handleSteamServers(steamLogin, matchId) {
  serverLogger.info(`[${steamLogin}][${matchId}] Received Steam servers.`)

  return steamServers =>
    saveSteamServers({
      steamLogin,
      steamServers,
    })
}
