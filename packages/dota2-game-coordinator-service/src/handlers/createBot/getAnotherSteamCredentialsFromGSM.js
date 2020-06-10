import axios from 'axios'
import { getConfigField } from 'weplay-node-cloud-config'
import { weplayLogger } from '../../services/logger'
import { name } from '../../../package.json'

const serverLogger = weplayLogger.common.child({
  logger: 'createBot/getAnotherSteamCredentialsFromGSM',
})

export const getAnotherSteamCredentialsFromGSM = async ({ username, matchId }) => {
  serverLogger.warn(`[${username}][${matchId}] Trying to get another credentials from GSM.`)

  const gsmAuthToken = await getConfigField('gsmAuthToken')
  const gsmLink = await getConfigField('gsmLink')

  // TODO: think about rejecting and timeout
  try {
    const response = await axios.post(`https://${gsmLink}change_daemons/${username}/`, null, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': name,
        'Secret-Key': gsmAuthToken,
      },
    })

    serverLogger.info(`[${username}][${matchId}] Got response from GSM: ${JSON.stringify(response)}`)

    // TODO: handle 401, 500 errors
    return response.data.daemon

    /* if (response?.data?.daemon) {
      return response.data.daemon
    } */
  } catch (err) {
    serverLogger.info(`[${username}][${matchId}] ${err}`)

    return new Error(err)
  }
}
