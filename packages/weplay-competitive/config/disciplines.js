/* eslint-disable max-lines */
import { DOTA2_ROLES } from 'weplay-competitive/constants/roles/dota2'
import {
  STATISTIC_PERFORMANCE_CSGO_NAMES,
  STATISTIC_GAME_CSGO,
  STATISTIC_SCOREBOX_HEAD_CSGO,
  STATISTIC_SCOREBOX_CSGO,
} from 'weplay-competitive/constants/statistic/csgo'
import {
  STATISTIC_PERFORMANCE_DOTA2_NAMES,
  STATISTIC_GAME_DOTA2,
  STATISTIC_SCOREBOX_HEAD_DOTA_2,
  STATISTIC_SCOREBOX_DOTA_2,
} from 'weplay-competitive/constants/statistic/dota2'
import {
  DISCORD_LINK_DOTA2_EN,
  DISCORD_LINK_DOTA2_RU,
  DISCORD_LINK_CSGO_EN,
  DISCORD_LINK_CSGO_RU,
  DISCORD_LINK_UNDERLORDS_EN,
  DISCORD_LINK_UNDERLORDS_RU,
  DISCORD_LINK_TFT_RU,
  DISCORD_LINK_TFT_EN,
} from 'weplay-competitive/constants/externalLinks'

import { IMAGES } from './images'

export const ACCESS_TYPES = {
  ALL: 'all',
  DISABLED: 'disabled',
  BETA: 'beta',
}

export const DISCIPLINES = {
  'cs-go': {
    id: 1,
    isShowInGamesProfile: true,
    gameSteamId: 730,
    name: 'CS:GO',
    hasMM: true,
    hasLadders: true,
    backgrounds: {
      logo: IMAGES.CSGO.logoCSGO,
      iconMemberPage: IMAGES.CSGO.iconMemberPage,
      heroSectionButton: IMAGES.CSGO.heroSectionButton,
      iconTournamentsPage: IMAGES.CSGO.iconTournamentsPageCSGO,
      mainTournamentsPage: IMAGES.CSGO.mainTournamentsPage,
      teamCardPlaceholder: IMAGES.CSGO.teamCardPlaceholder,
      matchHeaderBackground: IMAGES.CSGO.matchHeaderBackground,
      MMSettings: IMAGES.CSGO.MMSettings,
    },
    icons: {
      iconStyle: 'csGo',
      iconName: 'cs-go',
    },
    access: {
      type: ACCESS_TYPES.ALL,
      params: [],
    },
    url: 'cs-go',
    statistic: {
      name: 'csgo',
      performanceNames: STATISTIC_PERFORMANCE_CSGO_NAMES,
      statisticGame: STATISTIC_GAME_CSGO,
      roleSelectOptions: [],
      scoreBox: {
        head: STATISTIC_SCOREBOX_HEAD_CSGO,
        body: STATISTIC_SCOREBOX_CSGO,
      },
    },
    pool: 'mapPool',
    runCommand: 'steam://connect/',
    discord: {
      ru: DISCORD_LINK_CSGO_RU,
      en: DISCORD_LINK_CSGO_EN,
    },
  },
  dota2: {
    id: 2,
    isShowInGamesProfile: true,
    gameSteamId: 570,
    name: 'DOTA 2',
    hasMM: false,
    hasLadders: false,
    backgrounds: {
      logo: IMAGES.DOTA2.logoDOTA,
      iconMemberPage: IMAGES.DOTA2.iconMemberPage,
      heroSectionButton: IMAGES.DOTA2.heroSectionButton,
      iconTournamentsPage: IMAGES.DOTA2.iconTournamentsPageDOTA,
      mainTournamentsPage: IMAGES.DOTA2.mainTournamentsPage,
      teamCardPlaceholder: IMAGES.DOTA2.teamCardPlaceholder,
      matchHeaderBackground: IMAGES.DOTA2.matchHeaderBackground,
    },
    icons: {
      iconStyle: 'dota2',
      iconName: 'dota2',
    },
    access: {
      type: ACCESS_TYPES.ALL,
      params: [],
    },
    url: 'dota2',
    statistic: {
      name: 'dota2',
      performanceNames: STATISTIC_PERFORMANCE_DOTA2_NAMES,
      statisticGame: STATISTIC_GAME_DOTA2,
      roleSelectOptions: [
        {
          label: DOTA2_ROLES.OFFLANE,
          value: DOTA2_ROLES.OFFLANE,
        },
        {
          label: DOTA2_ROLES.SUPPORT,
          value: DOTA2_ROLES.SUPPORT,
        },
        {
          label: DOTA2_ROLES.CARRY,
          value: DOTA2_ROLES.CARRY,
        },
      ],
      scoreBox: {
        head: STATISTIC_SCOREBOX_HEAD_DOTA_2,
        body: STATISTIC_SCOREBOX_DOTA_2,
      },
    },
    pool: 'heroPool',
    runCommand: 'steam://rungameid/570',
    discord: {
      ru: DISCORD_LINK_DOTA2_RU,
      en: DISCORD_LINK_DOTA2_EN,
    },
  },
  'dota-underlords': {
    id: 3,
    isShowInGamesProfile: false,
    gameSteamId: 0,
    name: 'Underlords',
    backgrounds: {
      logo: IMAGES.UNDERLORDS.logoUNDERLORDS,
      iconMemberPage: '',
      heroSectionButton: IMAGES.UNDERLORDS.heroSectionButton,
      iconTournamentsPage: IMAGES.UNDERLORDS.iconTournamentsPageUNDERLORDS,
      mainTournamentsPage: IMAGES.UNDERLORDS.mainTournamentsPage,
      matchHeaderBackground: '',
      defaultTournamentCard: IMAGES.UNDERLORDS.defaultTournamentCard,
    },
    icons: {
      iconStyle: 'underlords',
      iconName: 'underlords',
    },
    access: {
      type: ACCESS_TYPES.ALL,
      params: [],
    },
    url: 'dota-underlords',
    discord: {
      ru: DISCORD_LINK_UNDERLORDS_RU,
      en: DISCORD_LINK_UNDERLORDS_EN,
    },
    challonge: {
      responseGameName: 'Dota Underlords',
    },
  },
  'teamfight-tactics': {
    id: 4,
    isShowInGamesProfile: false,
    gameSteamId: 0,
    name: 'Teamfight Tactics',
    shortName: 'TFT',
    backgrounds: {
      logo: IMAGES.TFT.logoTFT,
      iconMemberPage: '',
      heroSectionButton: IMAGES.TFT.heroSectionButton,
      iconTournamentsPage: IMAGES.TFT.iconTournamentsPageTFT,
      mainTournamentsPage: IMAGES.TFT.mainTournamentsPage,
      matchHeaderBackground: '',
      defaultTournamentCard: IMAGES.TFT.defaultTournamentCard,
    },
    icons: {
      iconStyle: 'tft',
      iconName: 'tft',
    },
    access: {
      type: ACCESS_TYPES.ALL,
      params: [],
    },
    url: 'teamfight-tactics',
    discord: {
      ru: DISCORD_LINK_TFT_RU,
      en: DISCORD_LINK_TFT_EN,
    },
    challonge: {
      responseGameName: 'Teamfight Tactics',
    },
  },
}

export const DISCIPLINE_NAME_DOTA = 'dota2'
export const DISCIPLINE_NAME_CSGO = 'cs-go'
export const DISCIPLINE_NAME_UNDERLORDS = 'dota-underlords'
export const DISCIPLINE_NAME_TFT = 'teamfight-tactics'
export const DISCIPLINE_NAMES = Object.keys(DISCIPLINES)
export const TOURNAMENT_DISCIPLINES = [
  DISCIPLINES[DISCIPLINE_NAME_CSGO],
  DISCIPLINES[DISCIPLINE_NAME_DOTA],
  DISCIPLINES[DISCIPLINE_NAME_UNDERLORDS],
  DISCIPLINES[DISCIPLINE_NAME_TFT],
]
