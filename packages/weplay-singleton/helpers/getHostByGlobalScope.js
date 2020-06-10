import { getEnvironment, ENV_NAMES } from './getEnvironment'

export const API_HOSTS = {
  [ENV_NAMES.LOCALHOST]: 'https://api-dev.weplay.space',
  [ENV_NAMES.DEV]: 'https://api-dev.weplay.space',
  [ENV_NAMES.QA]: 'https://api-qa.weplay.space',
  [ENV_NAMES.PROD]: 'https://api.weplay.tv',
}
export const getHostByGlobalScope = (globalScope) => {
  const origin = globalScope.location.origin
  const environment = getEnvironment(origin)
  return API_HOSTS[environment]
}
