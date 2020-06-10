import { lobbySide } from '../../config'
// eslint-disable-next-line import/extensions,import/no-unresolved,node/no-missing-import
import { sendMessageToLobby } from '../helpers'

export const kickRedundantMembers = (
  dota2Client,
  members,
  players_radiant_ids,
  players_dire_ids,
  players_count,
  chatId,
) => {
  const membersRadiant = members.filter(member => member.team === lobbySide.RADIANT)
  const membersDire = members.filter(member => member.team === lobbySide.DIRE)

  const isAllRadiantMembersValid = membersRadiant.every(member => players_radiant_ids.includes(member.id.toString()))
  const isAllDireMembersValid = membersDire.every(member => players_dire_ids.includes(member.id.toString()))

  const messageRadiant = `Too many players on the Radiant side! Kicking all of them from the slots!`
  const messageDire = `Too many players on the Dire side! Kicking all of them from the slots!!`

  // For 2v2, 3v3, 4v4
  // Kick all Radiant members from the slots if joined more players than needed
  if (membersRadiant.length > players_count / 2 && isAllRadiantMembersValid) {
    sendMessageToLobby(dota2Client, chatId, messageRadiant)
    membersRadiant.forEach(member => dota2Client.practiceLobbyKickFromTeam(dota2Client.ToAccountID(member.id)))
  }

  // Kick all Dire members from the slots if joined more players than needed
  if (membersDire.length > players_count / 2 && isAllDireMembersValid) {
    sendMessageToLobby(dota2Client, chatId, messageDire)
    membersDire.forEach(member => dota2Client.practiceLobbyKickFromTeam(dota2Client.ToAccountID(member.id)))
  }
}
