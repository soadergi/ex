import { promises as fs } from 'fs'

const steamServersFilesPath = './steam_servers_files'

export const saveSteamServers = async ({ steamLogin, steamServers }) =>
  fs.writeFile(`${steamServersFilesPath}/steam_servers_${steamLogin}`, JSON.stringify(steamServers))
