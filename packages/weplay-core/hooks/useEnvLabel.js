import { getEnvironment } from 'weplay-singleton/helpers/getEnvironment'

const useEnvLabel = () => {
  if (typeof window === 'undefined') {
    return process.env.ENV_LABEL || 'localhost'
  }
  return getEnvironment(window.origin)
}

export default useEnvLabel
