import { promises as fs } from 'fs'
import { weplayLogger } from '../../../services/logger'

const steamServersFilesPath = './steam_servers_files'

const serverLogger = weplayLogger.common.child({
  logger: 'createBot/getSteamServersFile',
})

// eslint-disable-next-line consistent-return
export const getSteamServersFile = async ({ steamLogin, matchId }) => {
  try {
    const steamServersFile = await fs.readFile(`${steamServersFilesPath}/steam_servers_${steamLogin}`)
    return JSON.parse(steamServersFile)
  } catch (err) {
    serverLogger.warn(`[${steamLogin}][${matchId}] Steam servers file doesn't exist.`)
  }
}
