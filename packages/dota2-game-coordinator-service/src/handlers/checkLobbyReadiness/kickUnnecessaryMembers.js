import { lobbySide } from '../../config'
import { sendMessageToLobby } from '../helpers'

export const kickUnnecessaryMembers = (dota2Client, members, botSteamId, chatId) => {
  members.forEach(member => {
    const memberSteamId = member.id.toString()
    if (memberSteamId === botSteamId) return

    if (member.team !== lobbySide.RADIANT && member.team !== lobbySide.DIRE) {
      const message = `Kicking unnecessary member ${member.name}.`

      sendMessageToLobby(dota2Client, chatId, message)
      dota2Client.practiceLobbyKick(dota2Client.ToAccountID(member.id))
    }
  })
}
