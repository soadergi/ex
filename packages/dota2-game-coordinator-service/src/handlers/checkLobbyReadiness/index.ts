/* eslint-disable import/no-unresolved,import/extensions,node/no-missing-import */
import { lobbySide, lobbyState } from '../../config/index'
import { cleanUpLobby } from '../cleanUpLobby'
import { sendMessageToLobby } from '../helpers'
import { startGame } from '../startGame'
import { isWarmUpTimePassed } from './isWarmUpTimePassed'
import { kickUnnecessaryMembers } from './kickUnnecessaryMembers'
import { sendGameNotStartedEventOnce } from '../../rmq/sendGameNotStartedEventOnce'
import { cacheManager } from '../../services/cacheManager'
/* eslint-enable import/no-unresolved,import/extensions,node/no-missing-import */

const message = 'Aborting! Something went wrong...'

export const checkLobbyReadiness = async (
  dota2Client,
  steamClient,
  {
    botSteamId,
    players_radiant_ids,
    players_dire_ids,
    players_count,
    chatId,
    lobbyCreatedTime,
    minutesBeforeStart,
    secondsBeforeStart,
    steam_login,
  },
  lobby,
  bot,
  isWarmUpTimer = false,
) => {
  const { lobby_id, state, members } = lobby
  // -------WarmUp timer protection-------
  if (state !== lobbyState.UI) return
  // -------WarmUp timer protection-------

  const lobbyId = lobby_id.toString()

  const membersRadiant = members.filter(member => member.team === lobbySide.RADIANT)
  const membersDire = members.filter(member => member.team === lobbySide.DIRE)

  const isAllRadiantMembersValid = membersRadiant.every(member => players_radiant_ids.includes(member.id.toString()))
  const isAllDireMembersValid = membersDire.every(member => players_dire_ids.includes(member.id.toString()))

  const isWarmUpTimeOver = isWarmUpTimePassed(lobbyCreatedTime, minutesBeforeStart)

  const cacheKey = `lobby5SecondTimers.${lobbyId}`
  const isLobby5SecondTimerExist = await cacheManager.isCached(cacheKey)

  if (
    membersRadiant.length === players_count / 2 &&
    membersDire.length === players_count / 2 &&
    isAllRadiantMembersValid &&
    isAllDireMembersValid // &&
    // !isLobby5SecondTimerExist
  ) {
    kickUnnecessaryMembers(dota2Client, members, botSteamId, chatId)

    if (isLobby5SecondTimerExist) return

    const clearLobby5SecondTimer = async () => {
      await cacheManager.removeCache(cacheKey)
    }

    const intervalId = startGame({
      dota2Client,
      secondsBeforeStart,
      chatId,
      clearLobby5SecondTimer,
    })

    await cacheManager.addCache(cacheKey, intervalId)
  } else {
    if (isLobby5SecondTimerExist) {
      const intervalId = await cacheManager.getCache(cacheKey)
      clearInterval(intervalId)
      await cacheManager.removeCache(cacheKey)

      sendMessageToLobby(dota2Client, chatId, message)
    }

    if (isWarmUpTimeOver || isWarmUpTimer) {
      await sendGameNotStartedEventOnce({
        lobby,
      })
      cleanUpLobby(dota2Client, steamClient, chatId, steam_login, bot)
    }
  }
}
