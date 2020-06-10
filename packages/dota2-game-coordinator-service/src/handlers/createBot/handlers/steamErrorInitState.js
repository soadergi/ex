import { stopWarmUp } from '../stopWarmUp'
import { loginSteamUserPreparation } from '../loginSteamUserPreparation'
import { startDota } from '../startDota'
import { prepareLobby } from '../../createLobby'
import { leavePreviousLobby } from '../../createLobby/leavePreviousLobby'

export async function steamErrorInitState(
  steamClient,
  dota2Client,
  steamUser,
  steamLogin,
  steamPassword,
  matchId,
  bot,
) {
  stopWarmUp(bot, steamLogin, matchId)

  dota2Client.removeAllListeners('ready')
  dota2Client.removeAllListeners('practiceLobbyUpdate')
  dota2Client.removeAllListeners('chatMessage')

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
  await leavePreviousLobby(dota2Client)
  bot.gameConfig = await prepareLobby(dota2Client, steamClient, bot.config, bot)

  // Send event to RMQ dota_match_problem_resolved
}
