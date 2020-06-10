import * as R from 'ramda'
import { createSelector } from 'reselect'

import { TOURNAMENT_STATUSES } from 'weplay-competitive/constants/tournamentStatuses'
import { tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments/index'

export const createTournamentStageIdSelector = mapPropsToId => createSelector(
  [tournamentsSelectors.createRecordByIdSelector(mapPropsToId)],
  tournament => R.pipe(
    R.pathOr([], ['relationships', 'stages']),
    R.head,
    R.prop('id'),
  )(tournament),
)

export const createIsTournamentFinishedSelector = mapPropsToId => createSelector(
  [tournamentsSelectors.createRecordByIdSelector(mapPropsToId)],
  tournament => tournament.status === TOURNAMENT_STATUSES.ENDED || tournament.status === TOURNAMENT_STATUSES.CANCELED,
)

export const createTournamentBracketTypeSelector = mapPropsToId => createSelector(
  [tournamentsSelectors.createRecordByIdSelector(mapPropsToId)],
  tournament => R.prop('bracket')(tournament),
)
