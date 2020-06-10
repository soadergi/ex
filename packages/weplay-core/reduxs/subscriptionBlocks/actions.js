import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import { getSubscriptionBlockRequest } from './requests'

const GET_SUBSCRIPTION_BLOCKS = 'GET_SUBSCRIPTION_BLOCKS'

export const getSubscriptionBlock = createRequestActions(GET_SUBSCRIPTION_BLOCKS, getSubscriptionBlockRequest)
