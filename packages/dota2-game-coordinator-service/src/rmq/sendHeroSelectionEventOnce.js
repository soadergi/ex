import { publishMessage } from './publishMessage'
import { prepareTeams } from './prepareTeams'

const isHeroSelectionEventHash = {
  // [lobbyID]: true | false
}
export const sendHeroSelectionEventOnce = async ({ lobby }) => {
  if (isHeroSelectionEventHash[lobby.lobby_id]) {
    return null
  }
  isHeroSelectionEventHash[lobby.lobby_id] = true
  return publishMessage({
    data: {
      weplay_matchid: lobby.game_name,
      dota_matchid: lobby.match_id.toString(),
      server_steamid: lobby.connect,
      server_steamid64: lobby.server_id.toString(),
      league_id: lobby.leagueid,
      teams: prepareTeams(lobby.members),
    },
    event: 'dota_picking_heroes',
  })
}
