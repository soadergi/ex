// eslint-disable-next-line import/extensions,import/no-unresolved,node/no-missing-import
import { botManager } from '../../services/botManager'
import { channelType } from '../../config/index'
import { stopWarmUp } from '../createBot/stopWarmUp'
import { weplayLogger } from '../../services/logger'

const serverLogger = weplayLogger.common.child({
  logger: 'cleanUpLobby/index',
})

export const cleanUpLobby = (dota2Client, steamClient, chatId, steam_login, bot) => {
  if (bot.hasReceivedCancelMatchEvent) {
    serverLogger.warn(`[${steam_login}] Ignoring redundant cleanup lobby event.`)
    return
  }

  serverLogger.info(`[${steam_login}] Received cleanup lobby event.`)

  bot.hasReceivedCancelMatchEvent = true

  dota2Client.removeAllListeners()
  steamClient.removeAllListeners()

  stopWarmUp(bot, steam_login, bot.config.weplay_matchid)

  const { timers } = bot

  if (timers.firstErrorConnectionTimeoutSteam) {
    clearTimeout(timers.firstErrorConnectionTimeoutSteam)
    timers.firstErrorConnectionTimeoutSteam = null
  }
  if (timers.secondErrorConnectionTimeoutSteam) {
    clearTimeout(timers.secondErrorConnectionTimeoutSteam)
    timers.secondErrorConnectionTimeoutSteam = null
  }

  if (timers.firstErrorConnectionTimeoutDota) {
    clearTimeout(timers.firstErrorConnectionTimeoutDota)
    timers.firstErrorConnectionTimeoutDota = null
  }
  if (timers.secondErrorConnectionTimeoutDota) {
    clearTimeout(timers.secondErrorConnectionTimeoutDota)
    timers.secondErrorConnectionTimeoutDota = null
  }

  if (chatId) {
    dota2Client.leaveChat(chatId, channelType.Lobby)
  }

  setTimeout(() => {
    dota2Client.destroyLobby()
  }, 1000)
  setTimeout(() => {
    dota2Client.leavePracticeLobby()
  }, 2 * 1000)
  setTimeout(() => {
    dota2Client.abandonCurrentGame()
  }, 3 * 1000) // Callback doesn't work
  setTimeout(() => {
    dota2Client.exit()
  }, 4 * 1000)
  setTimeout(() => {
    steamClient.disconnect()
  }, 5 * 1000)
  setTimeout(async () => {
    await botManager.deleteBot(steam_login)
  }, 6 * 1000)
}
