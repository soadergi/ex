import * as R from 'ramda'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'
import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'

import { getPromoCodesCount, activatePromoCode, getPromoConfig } from './actions'

export const PROMO_CODES_RN = 'PROMO_CODES'
export const GET_PROMOCODES_COUNT = 'GET_PROMOCODES_COUNT'
export const ACTIVATE_PROMOCODE = 'ACTIVATE_PROMOCODE'
export const GET_PROMO_CONFIG = 'GET_PROMO_CONFIG'

export default combineReducers({
  [GET_PROMOCODES_COUNT]: createRequestReducer(getPromoCodesCount),
  [ACTIVATE_PROMOCODE]: createRequestReducer(activatePromoCode),
  [GET_PROMO_CONFIG]: createRequestReducer(getPromoConfig),
})

const getPromoCodesAsyncSelectors = createRequestSelectors([PROMO_CODES_RN, GET_PROMOCODES_COUNT])
export const promoCodesCountSelector = createSelector(
  [getPromoCodesAsyncSelectors.dataSelector],
  R.propOr('', 'count'),
)

const activatePromoCodeAsyncSelectors = createRequestSelectors([PROMO_CODES_RN, ACTIVATE_PROMOCODE])
export const isPromoCodeSuccessSelector = createSelector(
  [activatePromoCodeAsyncSelectors.errorSelector],
  R.complement(Boolean),
)
// TODO use this selector when backoffice ready
const getPromoConfigAsyncSelectors = createRequestSelectors([PROMO_CODES_RN, GET_PROMO_CONFIG])
export const promoConfigSelector = createSelector(
  [getPromoConfigAsyncSelectors.dataSelector],
  R.defaultTo({}),
)
