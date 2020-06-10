import { publishMessage } from './publishMessage'
import { prepareTeams } from './prepareTeams'

const isMapEndEventHash = {
  // [lobbyID]: true | false
}

export const sendMapEndEventOnce = async ({ lobby }) => {
  if (isMapEndEventHash[lobby.lobby_id]) {
    return null
  }
  isMapEndEventHash[lobby.lobby_id] = true
  return publishMessage({
    data: {
      weplay_matchid: lobby.game_name,
      dota_matchid: lobby.match_id.toString(),
      server_steamid: lobby.connect,
      server_steamid64: lobby.server_id.toString(),
      league_id: lobby.leagueid,
      match_outcome: lobby.match_outcome,
      teams: prepareTeams(lobby.members),
    },
    event: 'dota_map_end',
  })
}
