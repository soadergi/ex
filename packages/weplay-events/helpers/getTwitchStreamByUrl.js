import config, { TwitchUrl } from 'weplay-core/config'
import { getTwitchChannelId } from 'weplay-core/helpers/getTwitchChannelId'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'
import { axios } from 'weplay-core/services/axios'

export default ({ streamUrl }) => {
  if (!streamUrl.includes('https://www.twitch.tv/')) {
    throw new Error('not a twitch url')
  }
  const channelId = getTwitchChannelId(streamUrl)

  return axios.get(config.twitchApiProxyService.url, {
    params: {
      query: `${TwitchUrl}/streams?user_login=${channelId}`,
    },
    withCredentials: false,
  })
    .then(camelizeKeys)
    .catch(error => Promise.reject(error))
}
