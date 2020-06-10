import { axios } from 'weplay-core/services/axios'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'

const VOTING_URL = '/voting-service/votings'

export const readVotingRequest = ({ votingId }) => axios.get(`${VOTING_URL}/${votingId}`)
  .then(response => camelizeKeys(response.data.data))
