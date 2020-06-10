import { createSelector } from 'reselect'

import { stageSelectors } from './index'

export const getStagesByTournamentIdSelector = createSelector(
  [stageSelectors.allRecordsSelector],
  allStages => tournamentId => allStages.filter(
    stage => stage?.relationships?.tournament?.id === tournamentId,
  ),
)
