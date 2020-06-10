import * as R from 'ramda'
import { createSelector } from 'reselect'
import { combineReducers } from 'redux'

import { createRequestReducer } from '../_factories/request/createRequestReducer'
import { createRequestSelectors } from '../_factories/request/createRequestSelectors'

import {
  getUserWallet,
} from './actions'

export const WALLET_RN = 'WALLET'
const GET_WALLET_RN = 'GET_WALLET'

export default combineReducers({
  [GET_WALLET_RN]: createRequestReducer(getUserWallet),
})

const getWalletAsyncSelectors = createRequestSelectors([WALLET_RN, GET_WALLET_RN])
const walletDataSelector = createSelector(
  [getWalletAsyncSelectors.dataSelector],
  R.defaultTo({}),
)
const walletBalancesSelector = createSelector(
  [walletDataSelector],
  R.propOr([], 'balances'),
)

export const isUserHasPositiveBalanceSelector = createSelector(
  [walletDataSelector],
  R.pipe(
    R.propOr([], 'balances'),
    R.ifElse(
      R.find(R.propSatisfies(Boolean, 'balance')),
      R.always(true),
      R.always(false),
    ),
  ),
)

const createAmountByCurrencyNameSelector = currency => createSelector(
  [walletBalancesSelector],
  R.pipe(
    R.find(R.propEq('currency', currency)),
    R.propOr(0, 'balance'),
  ),
)

export const wpPointsAmountSelector = createAmountByCurrencyNameSelector('WEPLAY_POINTS')
export const usdAmountSelector = createAmountByCurrencyNameSelector('USD')
