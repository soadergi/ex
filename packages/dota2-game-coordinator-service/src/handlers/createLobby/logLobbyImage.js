import { lobbySide, lobbyState, gameState, leaverStatus, heroes } from '../../config'
import { weplayLogger } from '../../services/logger'
import { getKeyByValue } from '../helpers'

const serverLogger = weplayLogger.common.child({
  logger: 'validateMembers/index',
})
function capitalizeFirstLetter(string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}

export function logLobbyImage(lobby, { steam_login, lobbyConfig, players_radiant_ids, players_dire_ids, botSteamId }) {
  const membersArray = []

  lobby.members.forEach(member => {
    const memberSteamId = member.id.toString()

    if (memberSteamId === botSteamId) return

    const isRadiantPlayer = players_radiant_ids.includes(memberSteamId)
    const isDirePlayer = players_dire_ids.includes(memberSteamId)

    let correctSide = null

    if (isRadiantPlayer) {
      correctSide = 'Radiant'
    }
    if (isDirePlayer) {
      correctSide = 'Dire'
    }

    const teamName = getKeyByValue(lobbySide, member.team)
    // lodash/capitalize
    const memberTeam = teamName === 'PLAYER_POOL' ? teamName : capitalizeFirstLetter(teamName)
    const heroName = getKeyByValue(heroes, member.hero_id)
    const leaverStatusName = getKeyByValue(leaverStatus, member.leaver_status)

    membersArray.push({
      steam_id: memberSteamId,
      name: member.name,
      side: memberTeam,
      expected_side: correctSide,
      slot: member.slot,
      hero: heroName || member.hero_id,
      leaver_status: leaverStatusName,
    })
  })

  membersArray.sort((a, b) => a.side - b.side || parseInt(a.slot, 10) - parseInt(b.slot, 10))

  const lobbyStateName = getKeyByValue(lobbyState, lobby.state)
  const gameStateName = getKeyByValue(gameState, lobby.game_state)

  const lobbyObj = {
    lobby_state: lobbyStateName,
    game_state: gameStateName,
    members: membersArray,
    pending_invites: lobby.pending_invites.map(player => player.toString()),
  }

  serverLogger.info(`[${steam_login}][${lobbyConfig.game_name}] Lobby snapshot: ${JSON.stringify(lobbyObj)}`)
}
