import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import { activatePromoCodeRequest, getPromoCodesCountRequest, getPromoConfigRequest } from './requests'

const ACTIVATE_PROMOCODE = 'ACTIVATE_PROMOCODE'
const GET_PROMOCODES_COUNT = 'GET_PROMOCODES_COUNT'
const GET_PROMO_CONFIG = 'GET_PROMO_CONFIG'

export const getPromoCodesCount = createRequestActions(GET_PROMOCODES_COUNT, getPromoCodesCountRequest)
export const activatePromoCode = createRequestActions(ACTIVATE_PROMOCODE, activatePromoCodeRequest)
export const getPromoConfig = createRequestActions(GET_PROMO_CONFIG, getPromoConfigRequest)
