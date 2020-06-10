import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import { getUserWalletRequest, getWalletTokenRequest } from './requests'

const GET_USER_WALLET = 'GET_USER_WALLET'
const GET_WALLET_TOKEN = 'GET_WALLET_TOKEN'
export const getUserWallet = createRequestActions(GET_USER_WALLET, getUserWalletRequest)
export const getWalletToken = createRequestActions(GET_WALLET_TOKEN, getWalletTokenRequest)
