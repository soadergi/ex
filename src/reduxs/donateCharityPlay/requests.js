import { $prop } from 'weplay-core/$utils/$prop'
import { axios } from 'weplay-core/services/axios'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'

export const getCharityLeadersRequest = params => axios
  .get('/charity-service/v1/charity-members', { params })
  .then($prop('data'))
  .then(camelizeKeys)
