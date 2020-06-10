import { getSteamSha } from './steamSha/getSteamSha'

export const loginSteamUser = async ({ steamClient, steamUser, username, password, matchId }) => {
  const shaSentryFile = await getSteamSha({ username, matchId })

  return new Promise(resolve => {
    steamClient.once('logOnResponse', resolve)
    steamUser.logOn({
      account_name: username,
      password,
      sha_sentryfile: shaSentryFile,
    })
  })
}
