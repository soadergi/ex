import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import {
  getCharityLeadersRequest,
} from './requests'

const GET_CHARITY_LEADERS = 'GET_CHARITY_LEADERS'

export const getCharityLeaders = createRequestActions(GET_CHARITY_LEADERS, getCharityLeadersRequest)
