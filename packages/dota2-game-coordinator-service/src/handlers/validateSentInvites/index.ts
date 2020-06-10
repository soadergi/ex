import { lobbySide } from '../../config/index'

export const validateSentInvites = (
  dota2Client,
  { players_radiant_ids, players_dire_ids, players_count },
  { members, pending_invites },
) => {
  const membersRadiant = members.filter(member => member.team === lobbySide.RADIANT)

  const membersDire = members.filter(member => member.team === lobbySide.DIRE)

  if (membersRadiant.length >= players_count / 2 && membersDire.length >= players_count / 2) return

  const playerIds = [...players_radiant_ids, ...players_dire_ids]

  const memberIds = members.map(member => member.id.toString())
  const pendingInvitesPlayerIds = pending_invites.map(player => player.toString())

  const notInvitedPlayerIds = playerIds.filter(
    playerId => !memberIds.includes(playerId) && !pendingInvitesPlayerIds.includes(playerId),
  )

  notInvitedPlayerIds.forEach(playerId => {
    dota2Client.inviteToLobby(playerId)
  })
}
