import crypto from 'crypto'
import { promises as fs } from 'fs'

const shaSentryFilesPath = './sha_sentry_files'

export const saveSteamSha = async ({ steamLogin, shaSentryInput }) => {
  const hashedShaSentryFile = crypto
    .createHash('sha1')
    .update(shaSentryInput.bytes)
    .digest()
  return fs.writeFile(`${shaSentryFilesPath}/sha_sentryfile_${steamLogin}`, hashedShaSentryFile)
}
