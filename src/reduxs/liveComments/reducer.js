import * as R from 'ramda'
import { combineReducers } from 'redux'
import { readLiveComments, SAVE_LIVE_COMMENT } from 'reduxs/liveComments/actions'
import { createSelector } from 'reselect'
import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'
import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'
import { createSuccessDataByEntityId } from 'weplay-core/reduxs/helpers'
import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'

export const LIVE_COMMENTS_RN = 'LIVE_COMMENTS'
const READ_LIVE_COMMENTS_RN = 'READ_LIVE_COMMENTS'

const LIVE_COMMENTS_BY_ID = 'liveCommentsById'

export default combineReducers({
  [READ_LIVE_COMMENTS_RN]: createRequestReducer(readLiveComments, {
    [readLiveComments.SUCCESS]: createSuccessDataByEntityId({
      entityName: LIVE_COMMENTS_BY_ID,
    }),

    [SAVE_LIVE_COMMENT]: (state, action) => R.assocPath(
      ['data', LIVE_COMMENTS_BY_ID, R.prop('id', action.data)],
      action.data,
      state,
    ),
  }),
})

const liveCommentsAsyncSelectors = createRequestSelectors([LIVE_COMMENTS_RN, READ_LIVE_COMMENTS_RN])
const liveCommentsDataSelector = liveCommentsAsyncSelectors.dataSelector

export const isLiveCommentsLoadingSelector = liveCommentsAsyncSelectors.loadingSelector
export const liveCommentsSelector = createSelector(
  [liveCommentsDataSelector, currentLanguageSelector],
  (liveComments, currentLanguage) => R.pipe(
    R.prop(LIVE_COMMENTS_BY_ID),
    R.values,
    R.filter(
      R.allPass([
        R.propEq('language', currentLanguage),
        R.propEq('status', 'active'),
      ]),
    ),
    R.sort(R.descend(R.prop('createdDate'))),
    R.slice(0, 20),
    R.defaultTo([]),
  )(liveComments),
)
