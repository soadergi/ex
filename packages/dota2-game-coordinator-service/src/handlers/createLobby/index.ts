/* eslint-disable import/no-unresolved,import/extensions,node/no-missing-import */
// @ts-ignore
import { once } from 'lodash'
import { gameState, lobbyState } from '../../config'
import { chatMessageHandler } from './chatMessageHandler'
import { practiceLobbyUpdateHandler } from './practiceLobbyUpdateHandler'
import { prepareGameConfig } from './prepareGameConfig'
import { createLobby } from './createLobby'
// import { leavePreviousLobby } from './leavePreviousLobby'
import { joinPlayerPoolTeam } from './joinPlayerPoolTeam'
import { checkLobbyReadiness } from '../checkLobbyReadiness'
import { sendRemainingTimeNotification } from '../chatTimer'
import { joinChat } from './joinChat'
import { weplayLogger } from '../../services/logger'
import { isWarmUpTimePassed } from '../checkLobbyReadiness/isWarmUpTimePassed'
import { getKeyByValue } from '../helpers'
/* eslint-enable import/no-unresolved,import/extensions,node/no-missing-import */

const serverLogger = weplayLogger.common.child({
  logger: 'createLobby/index',
})

export const prepareLobby = async (
  dota2Client,
  steamClient,
  { teams, bot_steam_id, players_count, weplay_matchid, location_name, game_mode_name, daemon },
  bot,
) => {
  const gameConfig = await prepareGameConfig({
    teams,
    bot_steam_id,
    players_count,
    weplay_matchid,
    location_name,
    game_mode_name,
    daemon,
  })
  const steamLogin = daemon.username
  const matchId = weplay_matchid

  const initializeConfig = once(async lobby => {
    gameConfig.chatId = `Lobby_${lobby.lobby_id}`
    gameConfig.lobbyCreatedTime = Date.now()

    await joinChat(dota2Client, gameConfig.chatId)
    await joinPlayerPoolTeam(dota2Client)

    sendRemainingTimeNotification(dota2Client, gameConfig)
    gameConfig.warmUpTimerId = setTimeout(() => {
      const isWarmUpTimeOver = isWarmUpTimePassed(gameConfig.lobbyCreatedTime, gameConfig.minutesBeforeStart)

      const gameStateName = getKeyByValue(gameState, bot.matchState)
      const lobbyStateName = getKeyByValue(lobbyState, bot.lobbyState)

      serverLogger.info(
        `[${steamLogin}][${matchId}] Warm-up time is over (${isWarmUpTimeOver}, ${lobbyStateName}, ${gameStateName}).`,
      )

      checkLobbyReadiness(dota2Client, steamClient, gameConfig, gameConfig.lastLobbyImage, bot, true)
    }, gameConfig.minutesBeforeStart * 60 * 1000)
  })

  // ========= add listeners ==========
  dota2Client.on('chatMessage', chatMessageHandler(dota2Client, steamLogin, matchId))
  dota2Client.on(
    'practiceLobbyUpdate',
    practiceLobbyUpdateHandler(dota2Client, steamClient, gameConfig, initializeConfig, bot),
  )
  // ========= add listeners ==========

  // await leavePreviousLobby(dota2Client)
  await createLobby(dota2Client, gameConfig)

  return gameConfig
}
