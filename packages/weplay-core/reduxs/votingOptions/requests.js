import { axios } from 'weplay-core/services/axios'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'

const VOTING_URL = '/voting-service/votings'
export const readVotingOptionsRequest = ({
  votingId,
  params,
}) => axios.get(`${VOTING_URL}/${votingId}/options`, { params })
  .then(response => response.data.data.map(camelizeKeys))

export const createVoteRequest = ({
  votingId,
  votingOptionId,
}) => axios.post(`${VOTING_URL}/${votingId}/options/${votingOptionId}/vote`)

  .then(response => camelizeKeys(response.data.data))
  .then(voteOption => ({ ...voteOption, id: votingOptionId }))

export const readVotingOptionRequest = ({
  votingId,
  votingOptionId,
}) => axios.get(`${VOTING_URL}/${votingId}/options/${votingOptionId}`)
  .then(response => camelizeKeys(response.data.data))
