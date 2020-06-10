import { ENV_NAMES, getEnvironment } from 'weplay-singleton/helpers/getEnvironment'

import getBrowserGlobal from 'weplay-core/helpers/ssr/getBrowserGlobal'

const apiHosts = {
  [ENV_NAMES.LOCALHOST]: 'api-dev.weplay.space',
  [ENV_NAMES.DEV]: 'api-dev.weplay.space',
  [ENV_NAMES.QA]: 'api-qa.weplay.space',
  [ENV_NAMES.PROD]: 'api.weplay.tv',
}

const WSS_PORT = 8443
const GAME_CENTER_SERVICE = 'game-center-service'

export const getMiniGamesSocketUrl = ({
  gameEngineName,
  gameId,
}) => {
  if (!gameEngineName || !gameId) return ''

  const apiHost = apiHosts[getEnvironment(getBrowserGlobal().origin)]
  return `wss://${apiHost}:${WSS_PORT}/${GAME_CENTER_SERVICE}/${gameEngineName}/${gameId}`
}
