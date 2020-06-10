import { weplayLogger } from '../../../services/logger'

const serverLogger = weplayLogger.common.child({
  logger: 'createBot/handleHellotimeout',
})

export const handleDotaHellotimeout = (steamLogin, matchId) => () => {
  // TODO: add some logic here
  serverLogger.info(`[${steamLogin}][${matchId}] Dota 2 received hellotimeout...`)
}
