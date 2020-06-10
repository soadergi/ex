import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import useConnectedTwitchAccountId from 'weplay-events/pages/EventPage/hooks/useConnectedTwitchAccountId'
import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'
import { getMatchUserPredictionSelector } from 'weplay-events/reduxs/predictions/selectors'

function useMatchPredictions(matchId) {
  const findMatchUserPredictionSelector = useSelector(getMatchUserPredictionSelector)
  const tournamentId = useCurrentTournamentId()
  const connectedTwitchAccountId = useConnectedTwitchAccountId()

  return useMemo(() => findMatchUserPredictionSelector({
    tournamentId: Number(tournamentId),
    connectedTwitchAccountId,
  })(Number(matchId)) || {},
  [findMatchUserPredictionSelector, tournamentId, connectedTwitchAccountId, matchId])
}

export default useMatchPredictions
