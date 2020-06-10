import * as R from 'ramda'
import { createSelector } from 'reselect'
import { combineReducers } from 'redux'
import cookies from 'js-cookie'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { getSubscriptionErrorText } from 'weplay-core/reduxs/subscriptions/helpers'
import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'
import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'
import {
  createSuccessDataByEntityId,
} from 'weplay-core/reduxs/helpers'
import { getSubscriptionBlock } from 'weplay-core/reduxs/subscriptionBlocks/actions'

import {
  getScopeSuccessData,
  getSubscriptionLocationFitScore,
} from './helpers'
import {
  createUserSubscription,
  deleteUserSubscription,
  getUserSubscriptions,
  getSubscriptionScopes,
} from './actions'

const SUBSCRIPTIONS_BY_ID = 'subscriptionsById'

export const SUBSCRIPTIONS_RN = 'SUBSCRIPTIONS'
const CREATE_USER_SUBSCRIPTION_RN = 'CREATE_USER_SUBSCRIPTION'
const DELETE_USER_SUBSCRIPTION_RN = 'DELETE_USER_SUBSCRIPTION'
const GET_USER_SUBSCRIPTIONS_RN = 'GET_USER_SUBSCRIPTIONS'
const SUBSCRIPTION_SCOPES_RN = 'SUBSCRIPTION_SCOPES'
export default combineReducers({
  [CREATE_USER_SUBSCRIPTION_RN]: createRequestReducer(createUserSubscription, {
    [createUserSubscription.SUCCESS]: () => ({
      data: {
        isSubscriptionRequestSent: true,
      },
      loading: false,
      error: null,
    }),
  }),
  [DELETE_USER_SUBSCRIPTION_RN]: createRequestReducer(deleteUserSubscription),

  [GET_USER_SUBSCRIPTIONS_RN]: createRequestReducer(getUserSubscriptions, {
    [createUserSubscription.SUCCESS]: getScopeSuccessData,
    [deleteUserSubscription.SUCCESS]: getScopeSuccessData,
    [getUserSubscriptions.SUCCESS]: getScopeSuccessData,
  }),

  [SUBSCRIPTION_SCOPES_RN]: createRequestReducer(getSubscriptionScopes, {
    [getSubscriptionScopes.SUCCESS]: createSuccessDataByEntityId({
      entityName: SUBSCRIPTIONS_BY_ID,
      payloadPath: ['data'],
    }),
    [getSubscriptionBlock.SUCCESS]: createSuccessDataByEntityId({
      entityName: SUBSCRIPTIONS_BY_ID,
      payloadPath: ['data'],
    }),
    [getUserSubscriptions.SUCCESS]: createSuccessDataByEntityId({
      entityName: SUBSCRIPTIONS_BY_ID,
      payloadPath: ['scopes'],
    }),
  }),
})

const createUserSubscriptionAsyncSelectors = createRequestSelectors([
  SUBSCRIPTIONS_RN,
  CREATE_USER_SUBSCRIPTION_RN,
])

export const isCreateUserSubscriptionLoadingSelector = createUserSubscriptionAsyncSelectors.loadingSelector
// TODO: @Andrew, @Artem, move i18n logic outside of reducer
export const createSubscriptionErrorTextSelector = mapPropsToSource => createSelector(
  [createUserSubscriptionAsyncSelectors.errorSelector, i18nTextsSelector, (state, props) => mapPropsToSource(props)],
  getSubscriptionErrorText,
)

export const isSubscriptionRequestSentSelector = createSelector(
  [createUserSubscriptionAsyncSelectors.dataSelector],
  R.prop('isSubscriptionRequestSent'),
)

const deleteUserSubscriptionAsyncSelectors = createRequestSelectors([
  SUBSCRIPTIONS_RN,
  DELETE_USER_SUBSCRIPTION_RN,
])
const isDeleteUserSubscriptionLoadingSelector = deleteUserSubscriptionAsyncSelectors.loadingSelector

export const isCreateDeleteSubscriptionLoadingSelector = createSelector(
  [isCreateUserSubscriptionLoadingSelector, isDeleteUserSubscriptionLoadingSelector],
  R.or,
)

const userSubscriptionsAsyncSelectors = createRequestSelectors([
  SUBSCRIPTIONS_RN,
  GET_USER_SUBSCRIPTIONS_RN,
])
export const isUserSubscriptionsLoadingSelector = userSubscriptionsAsyncSelectors.loadingSelector
// TODO: @Andrew, remove this selector after removing GeneralSubscribeForm
export const subscribedScopesSelector = createSelector(
  [userSubscriptionsAsyncSelectors.dataSelector],
  (subscription) => {
    const scopesFromCookies = R.pipe(
      R.defaultTo('[]'),
      JSON.parse,
    )(cookies.get('subscribedScopes'))

    return R.pipe(
      R.propOr([], 'scopes'),
      R.map(R.prop('name')),
      R.concat(scopesFromCookies),
      R.uniq,
    )(subscription)
  },
)
// TODO: @Andrew, remove this selector after removing GeneralSubscribeForm
export const createIsUserSubscribedSelector = mapPropsToScope => createSelector(
  [(state, props) => mapPropsToScope(props), subscribedScopesSelector],
  R.contains,
)
export const userTokenSelector = createSelector(
  [userSubscriptionsAsyncSelectors.dataSelector],
  R.propOr([], 'token'),
)
export const userSubscriptionIdsSelector = createSelector(
  [userSubscriptionsAsyncSelectors.dataSelector],
  R.propOr([], 'scopes'),
)
export const isUserHasSubscriptionsSelector = createSelector(
  [userSubscriptionIdsSelector],
  R.complement(R.isEmpty),
)
export const isUserSubscribedToScopeSelector = scopeId => createSelector(
  [userSubscriptionIdsSelector],
  userSubscriptionIds => R.contains(scopeId, userSubscriptionIds),
)

const subscriptionScopesAsyncSelectors = createRequestSelectors([
  SUBSCRIPTIONS_RN,
  SUBSCRIPTION_SCOPES_RN,
])
export const isSubscriptionScopesLoadingSelector = subscriptionScopesAsyncSelectors.loadingSelector

const subscriptionsByIdSelector = createSelector(
  [subscriptionScopesAsyncSelectors.dataSelector],
  subscriptions => R.pipe(
    R.propOr({}, SUBSCRIPTIONS_BY_ID),
  )(subscriptions),
)
export const subscriptionsIdsSelector = createSelector(
  [subscriptionsByIdSelector],
  R.keys,
)
export const createSubscriptionByLocationSelector = mapPropsToLocation => createSelector(
  [(state, props) => mapPropsToLocation(props), subscriptionsByIdSelector],
  (location, subscriptions) => R.pipe(
    R.values,
    R.reduce(
      R.maxBy(getSubscriptionLocationFitScore(location)),
      null,
    ),
  )(subscriptions),
)
export const allSubscriptionsSelector = createSelector(
  [subscriptionsByIdSelector],
  R.values,
)
export const createFirstNSubscriptionsSelector = n => createSelector(
  [allSubscriptionsSelector],
  R.slice(0, n),
)
export const createSubscriptionsByIdsSelector = mapPropsToIds => createSelector(
  [(state, props) => mapPropsToIds(props), subscriptionsByIdSelector],
  (ids, subscriptions) => R.pipe(
    R.pick(ids),
    R.values,
  )(subscriptions),
)

export const createSubscriptionNameByIdSelector = mapPropsToId => createSelector(
  [(state, props) => mapPropsToId(props), allSubscriptionsSelector],
  (id, subscriptions) => R.pipe(
    R.find(R.propEq('id', id)),
    R.prop('name'),
  )(subscriptions),
)
