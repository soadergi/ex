/* eslint-disable import/no-unresolved,node/no-missing-import */
import steam from 'steam'
import Dota2 from '../../lib/dota2'
import { becomeInvisible } from './becomeInvisible'
import { handleUpdateMachineAuth } from './handlers/handleUpdateMachineAuth'
import { handleSteamError } from './handlers/handleSteamError'
import { handleSteamLogOff } from './handlers/handleSteamLogOff'
import { handleSteamServers } from './handlers/handleSteamServers'
import { loginSteamUserPreparation } from './loginSteamUserPreparation'
import { startDota } from './startDota'
import { handleDotaUnready } from './handlers/handleDotaUnready'
import { handleDotaHellotimeout } from './handlers/handleDotaHellotimeout'
import { getSteamServersFile } from './steamServers/getSteamServersFile'
import { weplayLogger } from '../../services/logger'
/* eslint-enable import/no-unresolved,node/no-missing-import */

const serverLogger = weplayLogger.common.child({
  logger: 'createBot/index',
})

export const createBot = async config => {
  let steamLogin = config.daemon.username
  let steamPassword = config.daemon.password
  const matchId = config.weplay_matchid
  const steamClient = new steam.SteamClient()
  const steamUser = new steam.SteamUser(steamClient)
  const dota2Client = new Dota2.Dota2Client(steamClient, true)

  steamClient.servers = await getSteamServersFile({ steamLogin, matchId })

  dota2Client.Logger.debug = msg => {
    serverLogger.info(`[${steamLogin}][${matchId}] ${msg}`)
  }
  dota2Client.Logger.error = msg => {
    serverLogger.error(`[${steamLogin}][${matchId}] ${msg}`)
  }
  dota2Client.Logger.warn = msg => {
    serverLogger.warn(`[${steamLogin}][${matchId}] ${msg}`)
  }

  const bot = {
    steamClient,
    dota2Client,
    config,
    // matchState: undefined,
    // isLoginInProgress: false,
    timers: {},
  }

  // ========= add listeners ==========
  steamClient.on('loggedOff', handleSteamLogOff(dota2Client, steamLogin, matchId))
  steamClient.on('error', handleSteamError(steamUser, steamLogin, steamPassword, matchId, bot))
  steamClient.on('servers', handleSteamServers(steamLogin, matchId))
  steamUser.on('updateMachineAuth', handleUpdateMachineAuth(steamLogin, matchId))
  dota2Client.on('unready', handleDotaUnready(dota2Client, steamClient, steamLogin, matchId, bot))
  dota2Client.on('hellotimeout', handleDotaHellotimeout(steamLogin, matchId))
  // ========= add listeners ==========

  const loginUserResponse = await loginSteamUserPreparation({
    dota2Client,
    steamClient,
    steamUser,
    steamLogin,
    steamPassword,
    matchId,
    bot,
  })
  becomeInvisible(steamClient)
  // TODO: fix
  // eslint-disable-next-line no-param-reassign
  bot.config.bot_steam_id = steamClient.steamID

  if (loginUserResponse && steamLogin !== loginUserResponse.username) {
    bot.config.daemon.username = loginUserResponse.username
    bot.config.daemon.password = loginUserResponse.password
    steamLogin = loginUserResponse.username
    steamPassword = loginUserResponse.password
  }

  await startDota({ steamClient, dota2Client, steamLogin, matchId, bot })

  return bot
}
