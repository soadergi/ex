import * as R from 'ramda'
import { createSelector } from 'reselect'

import { stageSelectors } from 'weplay-competitive/reduxs/stages'
import { tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'

export const createCurrentStagesSelectors = mapPropsToTournamentId => createSelector(
  [
    tournamentsSelectors.createRecordByIdSelector(mapPropsToTournamentId),
    stageSelectors.allRecordsSelector,
  ],
  (tournament, allStages) => R.filter(
    R.pathEq(['relationships', 'tournament', 'id'], tournament.id),
  )(allStages),
)

export const createTournamentStageIdsSelector = mapPropsToTournamentId => createSelector(
  [createCurrentStagesSelectors(mapPropsToTournamentId)],
  R.map(R.propOr([], 'id')),
)
