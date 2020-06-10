import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import { readVotingRequest } from './requests'

const READ_VOTING = 'READ_VOTING'
export const readVoting = createRequestActions(READ_VOTING, readVotingRequest)
