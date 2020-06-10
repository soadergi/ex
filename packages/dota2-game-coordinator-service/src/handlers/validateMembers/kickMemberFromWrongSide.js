import { lobbySide } from '../../config'
// eslint-disable-next-line import/extensions,import/no-unresolved,node/no-missing-import
import { sendMessageToLobby } from '../helpers'

export function kickMemberFromWrongSide(dota2Client, correctSide, { id, team, name }, chatId) {
  const message = `${name}, you picked the wrong side. Please join the ${correctSide} side!`

  switch (correctSide) {
    case 'Radiant':
      if (team !== lobbySide.RADIANT && team !== lobbySide.PLAYER_POOL) {
        sendMessageToLobby(dota2Client, chatId, message)
        dota2Client.practiceLobbyKickFromTeam(dota2Client.ToAccountID(id))
      }
      break
    case 'Dire':
      if (team !== lobbySide.DIRE && team !== lobbySide.PLAYER_POOL) {
        sendMessageToLobby(dota2Client, chatId, message)
        dota2Client.practiceLobbyKickFromTeam(dota2Client.ToAccountID(id))
      }
      break
    default:
  }
}
