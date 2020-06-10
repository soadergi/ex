import * as R from 'ramda'

import { axios } from 'weplay-core/services/axios'
import config from 'weplay-core/config'

export const getUserWalletRequest = () => axios.get(`${config.walletApi.url}/v1/wallets/me`)
  .then(R.prop('data'))
export const getWalletTokenRequest = () => axios.get(`${config.walletApi.url}/v1/wallets/token`)
  .then(R.prop('data'))
