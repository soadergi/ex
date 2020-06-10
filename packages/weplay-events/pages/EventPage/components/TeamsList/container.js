import { useSelector } from 'react-redux'

import { tournamentSelectors } from 'weplay-events/reduxs/tournament'
import { TBD_TEAM } from 'weplay-events/constants/tbdTeam'
import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'
import { participantsWithDataSelector } from 'weplay-events/reduxs/getTournamentParticipantsByTournamentIdSelector'

export const useTeamsList = () => {
  const tournamentId = useCurrentTournamentId()

  const participantsWithData = useSelector(participantsWithDataSelector)
    .filter(participant => participant.relationships.tournament.id === tournamentId)
  const { participantsAmount } = useSelector(tournamentSelectors.getRecordByIdSelector)(tournamentId)
  const tbdTeamsAmount = participantsAmount - participantsWithData.length

  if (!tournamentId || tbdTeamsAmount < 1) return participantsWithData

  const tbdTeams = new Array(tbdTeamsAmount).fill({
    ...TBD_TEAM,
  }).map((tbdTeam, index) => ({
    ...tbdTeam,
    id: index,
  }))

  return [
    ...participantsWithData,
    ...tbdTeams,
  ]
}
