import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import {
  getChallongeRequest,
} from './requests'

const GET_CHALLONGE = 'GET_CHALLONGE'
export const getChallonge = createRequestActions(GET_CHALLONGE, getChallongeRequest)
