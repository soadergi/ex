/* eslint-disable import/no-unresolved,import/extensions,node/no-missing-import */
import { createBot } from '../createBot/index'
import { prepareLobby } from '../createLobby'
import { lobbySide } from '../../config/index'
import { cleanUpLobby } from '../cleanUpLobby'
import { botManager } from '../../services/botManager'
import { weplayLogger } from '../../services/logger'
/* eslint-enable import/no-unresolved,import/extensions,node/no-missing-import */

const serverLogger = weplayLogger.common.child({
  logger: 'matchManager/index',
})

const validateGameConfig = gameConfig => {
  return (
    gameConfig.daemon &&
    gameConfig.daemon.username &&
    gameConfig.daemon.password &&
    gameConfig.players_count &&
    gameConfig.weplay_matchid &&
    gameConfig.location_name &&
    gameConfig.game_mode_name &&
    gameConfig.teams &&
    gameConfig.teams.every(
      team => (team.side === lobbySide.RADIANT || team.side === lobbySide.DIRE) && team.players.length > 0,
    )
  )
}

// eslint-disable-next-line consistent-return
export const createMatch = async (req, res) => {
  serverLogger.info(`Received Config: ${JSON.stringify(req.body)}`)

  const gameConfig = req.body

  const isGameConfigValid = await validateGameConfig(gameConfig)
  if (!isGameConfigValid) {
    return res.status(400).json({
      code: -1,
      message: 'Bad Request',
    })
  }

  const { username } = gameConfig.daemon
  const isBotExist = await botManager.getBot(username)

  if (isBotExist) {
    return res.status(400).json({
      code: -1,
      message: 'Credentials are in use',
    })
  }

  res.status(200).json({
    code: 0,
    message: 'Config Received',
  })

  try {
    const bot = await createBot(gameConfig)
    // TODO: remove mutation here
    bot.gameConfig = await prepareLobby(bot.dota2Client, bot.steamClient, bot.config, bot)
    await botManager.addBot(bot)
  } catch (err) {
    // TODO: add some logic
    serverLogger.error(err)
  }
}

export const deleteMatch = async (req, res) => {
  const { steam_login } = req.query

  if (!steam_login) {
    res.status(400).json({
      code: -1,
      message: 'Bad Request',
    })
  }
  const bot = await botManager.getBot(steam_login)
  if (bot) {
    cleanUpLobby(bot.dota2Client, bot.steamClient, bot.gameConfig.chatId, steam_login, bot)
    res.status(200).json({
      code: 0,
      message: 'Bot Removed',
    })
  } else {
    res.status(404).json({
      code: -1,
      message: 'Bot Not Found',
    })
  }
}
