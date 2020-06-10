import * as R from 'ramda'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'
import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'

import { MEDIA } from '../reducerName'

import { getBanners, getBannerById } from './actions'
import { BANNERS_FORMATS } from './constants'

export const BANNERS_RN = 'BANNERS'
const GET_BANNERS_RN = 'GET_BANNERS'
const GET_BANNER_BY_ID_RN = 'GET_BANNER_BY_ID'

export default combineReducers({
  [GET_BANNERS_RN]: createRequestReducer(getBanners),
  [GET_BANNER_BY_ID_RN]: createRequestReducer(getBannerById),
})

const bannersSelectors = createRequestSelectors([MEDIA, BANNERS_RN, GET_BANNERS_RN])
const bannerByIdSelectors = createRequestSelectors([MEDIA, BANNERS_RN, GET_BANNER_BY_ID_RN])

const bannersDataSelector = createSelector(
  [bannersSelectors.dataSelector],
  R.defaultTo([]),
)

export const bannerByIdDataSelector = bannerByIdSelectors.dataSelector

export const createBannersByTypeSelector = bannerType => createSelector(
  [bannersDataSelector],
  banners => banners.filter(banner => banner.ad?.format === bannerType),
)

export const bigBannersSelector = createSelector(
  [createBannersByTypeSelector(BANNERS_FORMATS.BIG_BOTTOM)],
  banners => banners,
)
