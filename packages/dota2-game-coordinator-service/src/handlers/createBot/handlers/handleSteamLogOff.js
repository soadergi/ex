import { weplayLogger } from '../../../services/logger'
import { getEResultMessage } from '../../helpers/getEResultMessage'

const serverLogger = weplayLogger.common.child({
  logger: 'createBot/handleSteamLogOff',
})

export const handleSteamLogOff = (dota2Client, steamLogin, matchId) => EResultCode => {
  const EResultMessage = getEResultMessage(EResultCode)

  serverLogger.info(`[${steamLogin}][${matchId}] Logged off from Steam: ${EResultMessage}`)
}
