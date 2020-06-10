import { createSelector } from 'reselect'

import { prizesSelectors } from './index'

export const getPrizesByTournamentIdSelector = createSelector(
  [prizesSelectors.allRecordsSelector],
  allPrizes => tournamentId => allPrizes.filter(
    prize => prize?.relationships?.tournament?.id === tournamentId,
  ),
)
