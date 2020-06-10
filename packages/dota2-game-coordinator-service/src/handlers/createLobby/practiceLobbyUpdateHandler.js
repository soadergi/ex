/* eslint-disable import/extensions,import/no-unresolved,node/no-missing-import */
import { gameOutcome, gameState, lobbyState } from '../../config'
import { checkLobbyReadiness } from '../checkLobbyReadiness'
import { validateMembers } from '../validateMembers'
import { validateSentInvites } from '../validateSentInvites'
import { checkMemberHeroIds } from './checkMemberHeroIds'
import { sendHeroSelectionEventOnce } from '../../rmq/sendHeroSelectionEventOnce'
import { sendGotInGameEventOnce } from '../../rmq/sendGotInGameEventOnce'
import { sendMapEndEventOnce } from '../../rmq/sendMapEndEventOnce'
import { cleanUpLobby } from '../cleanUpLobby'
import { stopWarmUp } from '../createBot/stopWarmUp'
import { cacheManager } from '../../services/cacheManager'
import { logLobbyImage } from './logLobbyImage'

/* eslint-enable import/extensions,import/no-unresolved,node/no-missing-import */

export const practiceLobbyUpdateHandler = (
  dota2Client,
  steamClient,
  gameConfig,
  initializeConfig,
  bot,
) => async lobby => {
  // eslint-disable-next-line no-param-reassign
  gameConfig.lastLobbyImage = lobby

  // if (lobby.game_name !== gameConfig.lobbyConfig.game_name) return

  bot.matchState = lobby.game_state
  bot.lobbyState = lobby.state

  logLobbyImage(lobby, gameConfig)

  if (lobby.state === lobbyState.UI) {
    initializeConfig(lobby)

    checkLobbyReadiness(dota2Client, steamClient, gameConfig, lobby, bot)
    validateMembers(dota2Client, gameConfig, lobby)
    validateSentInvites(dota2Client, gameConfig, lobby)
  }

  switch (lobby.game_state) {
    case gameState.HERO_SELECTION:
      await sendHeroSelectionEventOnce({ lobby })
      stopWarmUp(bot, gameConfig.steam_login, gameConfig.lobbyConfig.game_name)

      break
    case gameState.PRE_GAME: {
      const isHeroIdPresent = await checkMemberHeroIds(lobby.members)
      if (isHeroIdPresent) {
        await sendGotInGameEventOnce({ lobby })
      }

      // Clear member notifications cache
      const lobbyId = lobby.lobby_id.toString()
      const cacheKey = `notifiedMembers.${lobbyId}`

      const isNotified = await cacheManager.isCached(cacheKey)

      if (isNotified) {
        await cacheManager.removeCache(cacheKey)
      }

      break
    }
    case gameState.GAME_IN_PROGRESS:
      // TODO: check if someone left and send message to RMQ
      break
    case gameState.POST_GAME:
      if (lobby.match_outcome !== gameOutcome.Unknown) {
        await sendMapEndEventOnce({ lobby })
        cleanUpLobby(dota2Client, steamClient, gameConfig.chatId, gameConfig.steam_login, bot)
      }
      break
    default:
    // console.warn('Unhandled state', lobby.game_state)
  }
}
