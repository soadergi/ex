import * as R from 'ramda'
import { createSelector } from 'reselect'
import { combineReducers } from 'redux'
import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'
import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'
import { localizeWith } from 'weplay-core/reduxs/helpers'
import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'

import { readVoting } from './actions'

export const VOTINGS_RN = 'VOTINGS'
const READ_VOTING_RN = 'READ_VOTING'

// TODO: make from this factory
export default combineReducers({
  [READ_VOTING_RN]: createRequestReducer(readVoting, {
    [readVoting.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        [payload.id]: payload,
      },
    }),
  }),
})


const votingsAsyncSelectors = createRequestSelectors([VOTINGS_RN, READ_VOTING_RN])
export const votingsHashSelector = createSelector(
  [votingsAsyncSelectors.dataSelector],
  R.defaultTo({}),
)

export const votingByIdSelector = mapPropsToVotingId => createSelector(
  [votingsHashSelector, (state, props) => mapPropsToVotingId(props), currentLanguageSelector],
  (votingsHash, votingId, currentLanguage) => R.pipe(
    R.propOr([], votingId),
    localizeWith(currentLanguage),
  )(votingsHash),
)
