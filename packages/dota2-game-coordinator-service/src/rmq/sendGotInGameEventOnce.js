import { publishMessage } from './publishMessage'
import { lobbySide } from '../config/index'

const isGotInGameEventHash = {
  // [lobbyID]: true | false
}
export const sendGotInGameEventOnce = async ({ lobby }) => {
  if (isGotInGameEventHash[lobby.lobby_id]) {
    return null
  }
  isGotInGameEventHash[lobby.lobby_id] = true
  return publishMessage({
    data: {
      weplay_matchid: lobby.game_name,
      dota_matchid: lobby.match_id.toString(),
      server_steamid: lobby.connect,
      server_steamid64: lobby.server_id.toString(),
      league_id: lobby.leagueid,
      players: lobby.members
        .filter(member => member.team === lobbySide.RADIANT || member.team === lobbySide.DIRE)
        .map((member, i) => ({
          id: i,
          steam_id: member.id.toString(),
          hero_id: member.hero_id,
        })),
    },
    event: 'dota_got_ingame',
  })
}
