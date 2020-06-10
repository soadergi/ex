// TODO: This mocked API has been created while we haven't real API for Header config
// TODO: When we'll have real API this config must die!

import * as R from 'ramda'

import { localizeWith } from 'weplay-core/reduxs/helpers'

const globalNavigation = {
  media: {
    id: 0,
    project: 'media',
    url: '/media',
    localizations: {
      en: {
        title: 'Media',
        description: 'Finest content from the world of esports',
      },
      ru: {
        title: 'Медиа',
        description: 'Разбираем киберспорт по буквам',
      },
    },
  },
  events: {
    id: 1,
    project: 'events',
    url: '/events',
    localizations: {
      en: {
        title: 'Events',
        description: 'Esportainment on the go',
      },
      ru: {
        title: 'Ивенты',
        description: 'Делаем шоу из киберспорта',
      },
    },
  },
  tournaments: {
    id: 2,
    project: 'tournaments',
    url: '/tournaments',
    localizations: {
      en: {
        title: 'Tournament platform',
        description: 'The beginning of your esports journey',
        label: 'Beta',
      },
      ru: {
        title: 'Турнирная платформа',
        description: 'Держим фокус на твоей победе',
        label: 'Beta',
      },
    },
  },
}

export const getGlobalMenu = language => R.pipe(
  R.map(localizeWith(language)),
  R.values,
)(globalNavigation)
