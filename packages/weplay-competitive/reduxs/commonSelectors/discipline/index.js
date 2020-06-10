import { createSelector } from 'reselect'
import * as R from 'ramda'

import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

export const createIsPlayerHaveBetaAccess = mapPropsToTournamentDiscipline => createSelector(
  [
    currentUserSelector,
    (state, props) => mapPropsToTournamentDiscipline(props),
  ],
  (currentUser, tournamentDiscipline) => R.pipe(
    R.pathOr([], ['access', 'params']),
    R.map(accessParam => R.pipe(
      R.prop(accessParam),
      Boolean,
    )(currentUser)),
    R.filter(accessParam => accessParam !== true),
    R.isEmpty,
  )(tournamentDiscipline),
)
