import { createSelector } from 'reselect'
import * as R from 'ramda'

import { tournamentDataAsyncSelectors } from 'weplay-events/reduxs/tournaments/reducer'

export const amountOfGroupWinnersSelector = createSelector(
  [tournamentDataAsyncSelectors.dataSelector],
  R.pathOr('', ['settings', 'groupWinnersNumber']),
)

export const amountOfRoundRobinGroupWinnersSelector = createSelector(
  [tournamentDataAsyncSelectors.dataSelector],
  R.pathOr('', ['settings', 'rrGroupWinnersNumber']),
)
