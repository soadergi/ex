import { publishMessage } from './publishMessage'
import { prepareTeams } from './prepareTeams'
import { gameOutcome } from '../config/index'

const isGameNotStartedEventHash = {
  // [lobbyID]: true | false
}

export const sendGameNotStartedEventOnce = async ({ lobby }) => {
  if (isGameNotStartedEventHash[lobby.lobby_id]) {
    return null
  }
  isGameNotStartedEventHash[lobby.lobby_id] = true
  return publishMessage({
    data: {
      weplay_matchid: lobby.game_name,
      league_id: lobby.leagueid,
      teams: prepareTeams(lobby.members),
      match_outcome: gameOutcome.NotScored_NeverStarted,
    },
    event: 'dota_not_started',
  })
}
