import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import { getBannersRequest, getBannerAccessKeyRequest, getBannerByIdRequest } from './requests'

const GET_BANNERS = 'GET_BANNERS'
export const getBanners = createRequestActions(GET_BANNERS, getBannersRequest)

const GET_BANNER_BY_ID = 'GET_BANNER_BY_ID'
export const getBannerById = createRequestActions(GET_BANNER_BY_ID, getBannerByIdRequest)

const GET_BANNER_ACCESS_KEY = 'GET_BANNER_ACCESS_KEY'
export const getBannerAccessKey = createRequestActions(GET_BANNER_ACCESS_KEY, getBannerAccessKeyRequest)
