import { loginSteamUserPreparation } from '../loginSteamUserPreparation'
import { startDota } from '../startDota'
import { getKeyByValue } from '../../helpers'
import { gameState } from '../../../config'
import { weplayLogger } from '../../../services/logger'

const serverLogger = weplayLogger.common.child({
  logger: 'createBot/handleSteamError',
})

export async function steamErrorOtherState(
  steamClient,
  dota2Client,
  steamUser,
  steamLogin,
  steamPassword,
  matchId,
  bot,
) {
  const gameStateName = getKeyByValue(gameState, bot.matchState)

  serverLogger.info(`[${steamLogin}][${matchId}] Match state: ${gameStateName}`)

  await loginSteamUserPreparation({
    dota2Client,
    steamClient,
    steamUser,
    steamLogin,
    steamPassword,
    matchId,
    bot,
  })
  await startDota({ steamClient, dota2Client, steamLogin, matchId, bot })

  // Send event to RMQ dota_match_problem_resolved
}
