import { lobbySide } from '../config'

export const prepareTeams = members => [
  {
    radiant_players: members
      .map(({ team, id, name }) => {
        return (
          Number(team) === lobbySide.RADIANT && {
            steam_id: id.toString(),
            nickname: name,
          }
        )
      })
      .filter(Boolean),
    dire_players: members
      .map(({ team, id, name }) => {
        return (
          Number(team) === lobbySide.DIRE && {
            steam_id: id.toString(),
            nickname: name,
          }
        )
      })
      .filter(Boolean),
  },
]
