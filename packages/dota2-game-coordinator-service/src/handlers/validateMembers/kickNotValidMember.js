// eslint-disable-next-line import/extensions,import/no-unresolved,node/no-missing-import
import { sendMessageToLobby } from '../helpers'

// Kick Stranger from the lobby
export function kickNotValidMember(dota2Client, correctSide, { name, id }, chatId) {
  const message = `${name} is not a player in this match!`

  // Kick from lobby, if not player in this match
  if (!correctSide) {
    sendMessageToLobby(dota2Client, chatId, message)
    dota2Client.practiceLobbyKick(dota2Client.ToAccountID(id))
  }
}
