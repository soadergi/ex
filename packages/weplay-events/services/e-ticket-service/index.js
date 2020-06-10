import { axios } from 'weplay-core/services/axios'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'
import config from 'weplay-core/config'

import downloadBlobFile from 'weplay-events/helpers/downloadBlobFile'

export const TICKETS_SERVICE_API_URL = `${config.eTicketApi.url}/v1/e-tickets`
export const USER_SERVICE_API_URL = `${config.UMSApi.url}/v1/users`

export const getUserTicketIdRequest = ({ userId, tournamentId }) => axios.post(
  `${TICKETS_SERVICE_API_URL}/generate`,
  {
    user_id: userId,
    tournament_id: Number(tournamentId),
  },
)

export const downloadTicketByIdRequest = ticketId => axios.post(
  `${TICKETS_SERVICE_API_URL}/${ticketId}/pdf`, {}, {
    responseType: 'blob',
  },
)
  .then(resp => downloadBlobFile(resp.data, 'ticket.pdf'))

export const activateTicketRequest = hash => axios.patch(
  `${TICKETS_SERVICE_API_URL}/activate`, {
    qr_secret: hash,
  },
)

export const getActivatedTicketsListRequest = params => axios.get(TICKETS_SERVICE_API_URL, { ...params })
  .then(camelizeKeys)

export const getUserByIdRequest = id => axios.get(USER_SERVICE_API_URL, {
  params: {
    id,
  },
}).then(camelizeKeys)
