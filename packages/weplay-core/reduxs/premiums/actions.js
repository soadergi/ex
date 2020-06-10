import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import {
  getPremiumsRequest,
  postApplyPremiumRequest,
  deletePremiumRequest,
} from './requests'

const GET_PREMIUMS = 'GET_PREMIUMS'
const APPLY_PREMIUM = 'APPLY_PREMIUM'
const CANCEL_PREMIUM = 'CANCEL_PREMIUM'
export const getPremiums = createRequestActions(GET_PREMIUMS, getPremiumsRequest)
export const applyPremium = createRequestActions(APPLY_PREMIUM, postApplyPremiumRequest)
export const cancelPremium = createRequestActions(CANCEL_PREMIUM, deletePremiumRequest)
