import steam from 'steam'
import { getSteamServersFile } from '../createBot/steamServers/getSteamServersFile'
import { getSteamSha } from '../createBot/steamSha/getSteamSha'
import { handleSteamServers } from '../createBot/handlers/handleSteamServers'
import { handleUpdateMachineAuth } from '../createBot/handlers/handleUpdateMachineAuth'
import { weplayLogger } from '../../services/logger'
import { botManager } from '../../services/botManager'
import { getEResultMessage } from '../helpers/getEResultMessage'

const serverLogger = weplayLogger.common.child({
  logger: 'test/index',
})

const logOnResponseHandler = (username, matchId) => logOnResponse => {
  if (logOnResponse.eresult === steam.EResult.OK) {
    serverLogger.info(`[${username}][${matchId}] Steam servers file doesn't exist.`)
  }
}
const loggedOffHandler = (username, matchId) => EResultCode => {
  const EResultMessage = getEResultMessage(EResultCode)

  serverLogger.info(`[${username}][${matchId}] Logged off from Steam: ${EResultMessage}`)
}
const connectedHandler = (username, password, matchId, steamUser) => async () => {
  serverLogger.info(`[${username}][${matchId}] Client connected to Steam.`)

  const shaSentryFile = await getSteamSha({ username, matchId })

  steamUser.logOn({
    account_name: username,
    password,
    sha_sentryfile: shaSentryFile,
  })
}
const errorHandler = (username, matchId) => error => {
  serverLogger.info(`[${username}][${matchId}] Connection closed by Steam server: ${error}.`)
}

export async function crashSteam(req, res) {
  const { username, password } = req.body
  const steamLogin = username
  const matchId = 'QA-TEST'

  if (!username || !password) {
    return res.status(400).json({
      code: -1,
      message: 'Bad Request',
    })
  }

  res.status(200).json({
    code: 0,
    message: 'Config Received',
  })

  const steamClient = new steam.SteamClient()
  const steamUser = new steam.SteamUser(steamClient)

  steamClient.servers = await getSteamServersFile({ steamLogin, matchId })

  // ----- LISTENERS -----
  steamClient.once('connected', connectedHandler(username, password, matchId, steamUser))
  steamClient.once('logOnResponse', logOnResponseHandler(username, matchId))
  steamClient.on('loggedOff', loggedOffHandler(username, matchId))
  steamClient.on('error', errorHandler(username, matchId))
  steamClient.on('servers', handleSteamServers(username, matchId))
  steamUser.on('updateMachineAuth', handleUpdateMachineAuth(username, matchId))
  // ----- LISTENERS -----

  steamClient.connect()
}

export async function disableDota2(req, res) {
  const { username } = req.body

  if (!username) {
    return res.status(400).json({
      code: -1,
      message: 'Bad Request',
    })
  }

  const bot = await botManager.getBot(username)

  if (bot) {
    res.status(200).json({
      code: 0,
      message: 'Config Received',
    })

    bot.dota2Client.exit()
    bot.dota2Client.emit('unready')
  } else {
    res.status(404).json({
      code: -1,
      message: 'Bot Not Found',
    })
  }
}

export async function enableDota2(req, res) {
  const { username } = req.body

  if (!username) {
    return res.status(400).json({
      code: -1,
      message: 'Bad Request',
    })
  }
  const bot = await botManager.getBot(username)

  if (bot) {
    res.status(200).json({
      code: 0,
      message: 'Config Received',
    })

    bot.dota2Client.launch()
  } else {
    res.status(404).json({
      code: -1,
      message: 'Bot Not Found',
    })
  }
}
