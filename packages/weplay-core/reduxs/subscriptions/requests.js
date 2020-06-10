import * as R from 'ramda'

import { axios } from 'weplay-core/services/axios'
import { camelizeKeys, snakeizeKeys } from 'weplay-core/reduxs/helpers'

const SUBSCRIPTION_URL = '/subscription-service'

export const createUserSubscriptionRequest = ({
  email,
  language,
  scope,
}) => axios.post(`${SUBSCRIPTION_URL}/member/subscribe`, {
  email,
  language,
  scopes: [scope],
})
  .then(response => camelizeKeys(response.data))
  .catch(axiosError => Promise.reject(camelizeKeys(axiosError.response.data.error)))

export const createSubscriptionApproveRequest = ({
  id,
}) => axios.post(`${SUBSCRIPTION_URL}/member/subscribe-request/${id}/approve`)

export const getUserSubscriptionsRequest = ({ userEmail, params }) => axios
  .get(`${SUBSCRIPTION_URL}/member/${userEmail}/scopes`, { params: snakeizeKeys(params) })
  .then(R.prop('data'))
  .then(camelizeKeys)

export const deleteUserSubscriptionRequest = ({
  email,
  scope,
  token,
}) => axios.post(`${SUBSCRIPTION_URL}/member/unsubscribe`, {
  email,
  scopes: [scope],
  token,
})
  .then(R.prop('data'))
  .then(camelizeKeys)

export const getSubscriptionScopesRequest = params => axios
  .get(`${SUBSCRIPTION_URL}/scope`, snakeizeKeys(params))
  .then(camelizeKeys)
