import { promises as fs } from 'fs'

import { weplayLogger } from '../../../services/logger'

const serverLogger = weplayLogger.common.child({
  logger: 'createBot/getSteamSha',
})

const shaSentryFilesPath = './sha_sentry_files'

export const getSteamSha = async ({ username, matchId }) => {
  serverLogger.info(`[${username}][${matchId}] Getting sha sentry file.`)

  try {
    const sha_sentry_file = await fs.readFile(`${shaSentryFilesPath}/sha_sentryfile_${username}`)
    return sha_sentry_file
  } catch (err) {
    return ''
  }
}
