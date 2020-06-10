import { axios } from 'weplay-core/services/axios'

import normalizeParimatchFeed from './normalizeParimatchFeed'

const PARIMATCH_FEED_URL = 'https://api.weplay.tv/parimatch-proxy-service/feed'
export const getParimatchBetsRequest = () => axios.get(PARIMATCH_FEED_URL)
  .then(response => response.data)
  .then(normalizeParimatchFeed)
