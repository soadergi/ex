import * as R from 'ramda'
import { createSelector } from 'reselect'

import { tournamentsSelectors } from '../tournaments'

import { matchesSelectors } from './index'

export const createMatchesByTournamentIdSelector = mapPropsToTournamentId => createSelector(
  [
    matchesSelectors.allRecordsSelector,
    tournamentsSelectors.createRecordByIdSelector(mapPropsToTournamentId),
  ],
  (matches, tournament) => R.filter(
    R.pathEq(
      ['relationships', 'tournament', 'id'],
      R.prop('id', tournament),
    ),
  )(matches),
)
