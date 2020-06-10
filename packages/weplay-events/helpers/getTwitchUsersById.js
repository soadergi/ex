import config, { TwitchUrl } from 'weplay-core/config'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'
import { axios } from 'weplay-core/services/axios'

export default function getTwitchUsersById(twitchUserIds) {
  const idsList = `id=${twitchUserIds.join('&id=')}`

  return axios.get(config.twitchApiProxyService.url, {
    params: {
      query: `${TwitchUrl}/users?${idsList}`,
    },
    withCredentials: false,
  })
    .then(camelizeKeys)
    .catch(error => Promise.reject(error))
}
