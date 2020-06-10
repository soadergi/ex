import { axios } from 'weplay-core/services/axios'
import config from 'weplay-core/config'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'

const VOTING_CHANNEL = 'SITE'

export const API_URL = `${config.votingApi.url}/v1`

export const getVotingItemsByVotingIdRequest = votingId => axios.get(`${API_URL}/voting/${votingId}`)
  .then(camelizeKeys)

export const voteRequest = ({ votingId, choiceId }) => axios.post(
  'promo-processor-service/voting/v1/vote',
  {
    channel: VOTING_CHANNEL,
    choice_id: choiceId,
    voting_id: votingId,
  },
)

export const getVotingVoteRequest = ({
  votingId,
  idAtChannel,
}) => axios.get(`${API_URL}/vote/${votingId}/${VOTING_CHANNEL}/${idAtChannel}`)
  .then(camelizeKeys)

export const getVotingResultsRequest = ({ votingId }) => axios.get(`${API_URL}/vote/results/${votingId}`)
  .then(camelizeKeys)
