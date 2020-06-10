import { createSelector } from 'reselect'
import * as R from 'ramda'

import { tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'
import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'
import { gamesSelectors } from 'weplay-competitive/reduxs/games'

export const createTournamentGameSelector = mapPropsToTournamentId => createSelector(
  [
    tournamentsSelectors.createRecordByIdSelector(mapPropsToTournamentId),
    gameModesSelectors.getRecordByIdSelector,
    gamesSelectors.getRecordByIdSelector,
  ],
  (tournament, getGameModeById, getGameById) => R.pipe(
    R.path(['relationships', 'gameMode', 'id']),
    getGameModeById,
    R.path(['relationships', 'game', 'id']),
    getGameById,
  )(tournament),
)
