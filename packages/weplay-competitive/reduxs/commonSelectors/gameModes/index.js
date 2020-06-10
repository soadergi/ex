import { createSelector } from 'reselect'
import * as R from 'ramda'

import { tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'
import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'

export const createTournamentGameModeSelector = mapPropsToTournamentId => createSelector(
  [
    tournamentsSelectors.createRecordByIdSelector(mapPropsToTournamentId),
    gameModesSelectors.getRecordByIdSelector,
  ],
  (tournament, getGameModeById) => R.pipe(
    R.path(['relationships', 'gameMode', 'id']),
    getGameModeById,
  )(tournament),
)
