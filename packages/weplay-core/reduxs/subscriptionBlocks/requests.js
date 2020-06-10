import { axios } from 'weplay-core/services/axios'
import { camelizeKeys, snakeizeKeys } from 'weplay-core/reduxs/helpers'

const SUBSCRIPTION_URL = '/subscription-service'

export const getSubscriptionBlockRequest = params => axios
  .get(`${SUBSCRIPTION_URL}/scope`, snakeizeKeys(params))
  // fix for SSR circular dependency
  .then(
    (response) => {
      delete response.request
      return camelizeKeys(response)
    },
    axiosError => throw new Error(axiosError?.response?.data),
  )
