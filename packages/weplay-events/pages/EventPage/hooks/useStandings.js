import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { getStagesByTournamentIdSelector } from 'weplay-events/reduxs/stages/selectors'
import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'

export default function useStandings() {
  const tournamentId = useCurrentTournamentId()

  const stagesByTournamentId = useSelector(getStagesByTournamentIdSelector)
  const tournamentStages = useMemo(
    () => stagesByTournamentId(tournamentId),
    [tournamentId, stagesByTournamentId],
  )

  return { tournamentStages }
}
