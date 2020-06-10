import { getConfigField } from 'weplay-node-cloud-config'
import { gameMode, lobbyDotaPauseSetting, lobbyDotaTVDelay, lobbySide, serverRegion } from '../../config'

export const prepareGameConfig = async ({
  teams,
  bot_steam_id,
  players_count,
  weplay_matchid,
  location_name,
  game_mode_name,
  daemon,
}) => {
  const radiantPlayerIds = teams.find(team => team.side === lobbySide.RADIANT).players.map(player => player.steam_id)
  const direPlayerIds = teams.find(team => team.side === lobbySide.DIRE).players.map(player => player.steam_id)

  const leagueId = await getConfigField('leagueId')
  const minutesBeforeStart = await getConfigField('minutesBeforeStart') // 24 * 60
  const secondsBeforeStart = await getConfigField('secondsBeforeStart')
  const allowSpectating = await getConfigField('allowSpectating')
  const dotaTVDelay = await getConfigField('dotaTVDelay')
  const pauseSettings = await getConfigField('pauseSettings')

  return {
    steam_login: daemon.username,
    botSteamId: bot_steam_id,
    secondsBeforeStart,
    players_count,
    players_radiant_ids: radiantPlayerIds,
    players_dire_ids: direPlayerIds,
    minutesBeforeStart: game_mode_name === 'CM' ? minutesBeforeStart * 2 : minutesBeforeStart,
    chatId: '',
    lobbyCreatedTime: 0,
    lobbyCountdownTimerId: undefined,
    warmUpTimerId: undefined,
    lastLobbyImage: {},
    lobbyConfig: {
      game_name: weplay_matchid,
      // pass_key: generatePassword(),
      server_region: serverRegion[location_name],
      game_mode: gameMode[game_mode_name],
      pause_setting: game_mode_name === 'CM' ? lobbyDotaPauseSetting.Limited : lobbyDotaPauseSetting[pauseSettings],
      allow_spectating: allowSpectating,
      leagueid: leagueId,
      dota_tv_delay: lobbyDotaTVDelay[dotaTVDelay],
    },
  }
}
