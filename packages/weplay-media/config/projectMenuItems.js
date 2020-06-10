import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'

const PROJECT_LOKALISE_PATH = 'mediaCore.subHeader.projectMenu'

export const projectMenuItems = [
  {
    textKey: `${PROJECT_LOKALISE_PATH}.home`,
    url: pathWithParamsByRoute(NAMES.MEDIA),
    exact: true,
  },
  {
    textKey: `${PROJECT_LOKALISE_PATH}.csgo`,
    url: pathWithParamsByRoute(NAMES.CATEGORIES, { categoryName: 'cs-go' }),
    iconName: 'cs-go',
  },
  {
    textKey: `${PROJECT_LOKALISE_PATH}.dota2`,
    url: pathWithParamsByRoute(NAMES.CATEGORIES, { categoryName: 'dota-2' }),
    iconName: 'dota2',
  },
  {
    textKey: `${PROJECT_LOKALISE_PATH}.fightings`,
    url: pathWithParamsByRoute(NAMES.CATEGORIES, { categoryName: 'fighting-games' }),
    iconName: 'gamepad-filled',
  },
  {
    textKey: `${PROJECT_LOKALISE_PATH}.dotaUnderlords`,
    url: pathWithParamsByRoute(NAMES.CATEGORIES, { categoryName: 'dota-underlords' }),
    iconName: 'underlords',
  },
  {
    textKey: `${PROJECT_LOKALISE_PATH}.specialProjects`,
    url: pathWithParamsByRoute(NAMES.SPECIAL_TAGS),
  },
  {
    textKey: `${PROJECT_LOKALISE_PATH}.videoContent`,
    url: pathWithParamsByRoute(NAMES.UNUSUAL_TAG, { $placeholder: 'weplay-video', unusualTagId: 1 }),
  },
  {
    textKey: `${PROJECT_LOKALISE_PATH}.miniGames`,
    url: pathWithParamsByRoute(NAMES.MINI_GAMES),
    iconName: 'cup',
  },
  {
    textKey: `${PROJECT_LOKALISE_PATH}.giveaway`,
    url: pathWithParamsByRoute(NAMES.GIVEAWAY),
    iconName: 'weplay',
    label: {
      textKey: 'mediaCore.giveawayPage.seo.default.h1',
      color: 'magenta',
    },
  },
]
