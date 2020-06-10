import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import { readVotingOptionsRequest, createVoteRequest, readVotingOptionRequest } from './requests'

const READ_VOTING_OPTIONS = 'READ_VOTING_OPTIONS'
export const readVotingOptions = createRequestActions(READ_VOTING_OPTIONS, readVotingOptionsRequest)

const POST_VOTE = 'POST_VOTE'
export const createVote = createRequestActions(POST_VOTE, createVoteRequest)

const READ_VOTING_OPTION = 'READ_VOTING_OPTION'
export const readVotingOption = createRequestActions(READ_VOTING_OPTION, readVotingOptionRequest)
