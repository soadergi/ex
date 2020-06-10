import { axios } from 'weplay-core/services/axios'
import config from 'weplay-core/config'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'

export const getPremiumsRequest = () => axios.get(`${config.walletApi.url}/v1/premiums`)
  .then(response => camelizeKeys(response.data))

export const postApplyPremiumRequest = ({
  params,
}) => axios.post(`${config.walletApi.url}/v1/premiums/apply`, (params))

export const deletePremiumRequest = () => axios.delete(`${config.walletApi.url}/v1/premiums/cancel`)
