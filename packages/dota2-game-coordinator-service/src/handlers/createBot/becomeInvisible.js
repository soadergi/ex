import steam from 'steam'

export function becomeInvisible(steamClient) {
  new steam.SteamFriends(steamClient).setPersonaState(
    steam.EPersonaState.Invisible,
  )
}
