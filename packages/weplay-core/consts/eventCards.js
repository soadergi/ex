import * as R from 'ramda'

import { localizeWith } from 'weplay-core/reduxs/helpers'

const eventsList = [
  {
    id: 1,
    isLan: false,
    prizePool: '$50 000',
    discipline: 'CS:GO',
    url: '/events/cs-go/we-play-clutch-island',
    backgroundUrl: 'https://static-prod.weplay.tv/2020-06-03/6cba72c6cd8a4de0745acd73e4c37c2e.08110B-1E3824-114145.png',
    logoUrl: 'https://static-prod.weplay.tv/2020-06-03/f0fd2888eab74655c4d7656b6f50f48f.34BCEB-95411D-9CCC3C.png',
    tags: [
      {
        name: 'CS:GO',
        url: '/special-tags/weplay-clutch-island-18',
      },
    ],
    localizations: {
      en: {
        title: 'WePlay! Clutch Island',
      },
      ru: {
        title: 'WePlay! Clutch Island',
      },
    },
  },
  {
    id: 2,
    isLan: true,
    isSpecial: false,
    prizePool: null,
    cashPrize: false,
    discipline: '',
    url: '/mini-games/2048',
    isExternalLink: true,
    backgroundUrl: 'https://static-prod.weplay.tv/2020-04-22/22f8cb39fb9489b4da338a96cf771fbb.151825-C7C4C3-749B9F.jpeg', // eslint-disable-line
    localizations: {
      en: {
        title: 'Unlock The Hero',
        buttonText: 'Play now!',
        eventType: 'game',
      },
      ru: {
        title: 'Открой своего героя',
        buttonText: 'Играть!',
        eventType: 'game',
      },
    },
  },
]

export const getEventsList = language => R.map(localizeWith(language))(eventsList)
