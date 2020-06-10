import { SETTING_OPTION_TYPES } from 'weplay-competitive/constants/MM/settingOptionTypes'
import { GAME_MODE_TYPES } from 'weplay-competitive/constants/MM/gameModeTypes'

export const GAME_MODES = [
  {
    name: GAME_MODE_TYPES.ONE_ON_ONE,
    type: SETTING_OPTION_TYPES.GAME_MODE,
    disabled: false,
  },
  {
    name: GAME_MODE_TYPES.TWO_ON_TWO,
    type: SETTING_OPTION_TYPES.GAME_MODE,
    disabled: true,
  },
  {
    name: GAME_MODE_TYPES.FIVE_ON_FIVE,
    type: SETTING_OPTION_TYPES.GAME_MODE,
    disabled: true,
  },
]

export const GAME_SERVERS = [
  {
    name: 'CIS',
    type: SETTING_OPTION_TYPES.GAME_SERVER,
    disabled: false,
  },
  {
    name: 'EU',
    type: SETTING_OPTION_TYPES.GAME_SERVER,
    disabled: false,
  },
]

export const TEMP_LADDER = {
  name: 'Weekly Ladder',
  type: SETTING_OPTION_TYPES.LADDER,
  disabled: true,
}
