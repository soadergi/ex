import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { tournamentSelectors } from 'weplay-events/reduxs/tournament'
import { TOURNAMENT_STATUSES } from 'weplay-events/pages/EventPage/constants'
import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'

export default () => {
  const tournamentId = useCurrentTournamentId()
  const getTournamentByIdSelector = useSelector(tournamentSelectors.getRecordByIdSelector)

  const { status } = useMemo(
    () => getTournamentByIdSelector(tournamentId),
    [tournamentId],
  )

  const statuses = useMemo(
    () => ({
      isUpcoming: status === TOURNAMENT_STATUSES.UPCOMING,
      isOngoing: status === TOURNAMENT_STATUSES.ONGOING,
      isEnded: status === TOURNAMENT_STATUSES.ENDED,
    }),
    [status],
  )

  return statuses
}
