import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { tournamentSelectors } from 'weplay-events/reduxs/tournament'
import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'

function useCurrentTournament() {
  const tournamentId = useCurrentTournamentId()
  const getTournamentByIdSelector = useSelector(tournamentSelectors.getRecordByIdSelector)

  return useMemo(() => getTournamentByIdSelector(tournamentId), [tournamentId])
}

export default useCurrentTournament
