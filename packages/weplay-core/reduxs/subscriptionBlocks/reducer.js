import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import * as R from 'ramda'
import _ from 'lodash'

import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'
import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'
import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'

import { getSubscriptionBlock } from './actions'

export const SUBSCRIPTION_BLOCKS_RN = 'SUBSCRIPTION_BLOCKS'
const GET_SUBSCRIPTION_BLOCK_RN = 'GET_SUBSCRIPTION_BLOCK'

export default combineReducers({
  [GET_SUBSCRIPTION_BLOCK_RN]: createRequestReducer(getSubscriptionBlock, {
    [getSubscriptionBlock.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        ...R.pipe(
          R.path(['config', 'params']),
          R.pick(['locationPage', 'locationId', 'language', 'isActive']),
          R.map(_.camelCase),
        )(payload),
      },
      loading: false,
      error: null,
    }),
  }),
})

const subscriptionBlockAsyncSelectors = createRequestSelectors([
  SUBSCRIPTION_BLOCKS_RN,
  GET_SUBSCRIPTION_BLOCK_RN,
])
export const isSubscriptionBlockLoadingSelector = subscriptionBlockAsyncSelectors.loadingSelector
export const isSubscriptionBlockAlreadyFetchedSelector = mapPropsToLocation => createSelector(
  [(state, props) => mapPropsToLocation(props), currentLanguageSelector, subscriptionBlockAsyncSelectors.dataSelector],
  ({ page: locationPage, id }, language, fetchedParams) => R.pipe(
    R.defaultTo({}),
    R.whereEq({
      locationId: `${id}`,
      locationPage,
      language,
    }),
  )(fetchedParams),
)
