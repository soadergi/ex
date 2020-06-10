import { weplayLogger } from '../../services/logger'

const serverLogger = weplayLogger.common.child({
  logger: 'createBot/chatMessageHandler',
})

export const chatMessageHandler = (dota2Client, steamLogin, matchId) => (channel, personaName, message, chatData) => {
  const personSteamId = dota2Client.ToSteamID(chatData.account_id).toString()

  serverLogger.info(
    `[${steamLogin}][${matchId}] ${personaName} (${personSteamId}) sent message in lobby channel: ${message}`,
  )
}
