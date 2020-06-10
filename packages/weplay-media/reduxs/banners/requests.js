import { axios } from 'weplay-core/services/axios'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'

const ADD_SERVICE_URL = 'ad-service'
const CAMPAIGN_ID = 1
const ADVERTISER_ID = 1

export const getBannersRequest = params => axios.get(
  `${ADD_SERVICE_URL}/serving`, {
    params: {
      campaign: CAMPAIGN_ID,
      advertiser: ADVERTISER_ID,
      ...params,
    },
  },
).then(
  axiosResponse => camelizeKeys(axiosResponse?.data?.data),
  axiosError => throw new Error(axiosError?.response?.data),
)

export const getBannerByIdRequest = bannerId => axios.get(
  `${ADD_SERVICE_URL}/serving/${bannerId}`,
).then(
  axiosResponse => camelizeKeys(axiosResponse?.data?.data),
  axiosError => throw new Error(axiosError?.response?.data),
)

export const getBannerAccessKeyRequest = accessKey => axios.get(`${ADD_SERVICE_URL}/click/${accessKey}`)
  .then((response) => {
    window.location.href = response.request.responseURL
    return response
  })
