import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { DOTA_PLAYER_ROLES } from 'weplay-events/constants/participantGameRoles'
import getIsCaptain from 'weplay-events/pages/EventPage/helpers/getIsCaptain'
import getPlayerModifiers from 'weplay-events/pages/EventPage/helpers/getPlayerModifiers'
import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'
import { getDisciplineByTournamentIdSelector } from 'weplay-events/reduxs/discipline/selectors'

import { avatarPlaceholder } from './constants'

export const useParticipant = ({ player, setActivePlayer, isActive }) => {
  const tournamentId = useCurrentTournamentId()
  const { name } = useSelector(getDisciplineByTournamentIdSelector)(tournamentId)
  const isDisciplineHasRoles = name === 'Dota2'
  const playerGameRole = useMemo(
    () => DOTA_PLAYER_ROLES[player?.gameRole],
    [player],
  )

  const getCaptainPlayerRoleLabel = useCallback(
    () => (isDisciplineHasRoles
      ? `${player?.teamPosition}${playerGameRole ? `, ${playerGameRole}` : ''}`
      : player?.teamPosition),
    [],
  )

  const isCaptain = getIsCaptain(player)

  const playerRoleLabel = isCaptain
    ? getCaptainPlayerRoleLabel()
    : playerGameRole

  const handleClick = useCallback(() => setActivePlayer(player), [])
  const modifiers = useMemo(() => getPlayerModifiers({ player, isActive }), [player, isActive])

  const playerAvatar = player.logoUrl || avatarPlaceholder

  return {
    playerRoleLabel,
    handleClick,
    modifiers,
    isCaptain,
    playerAvatar,
  }
}
