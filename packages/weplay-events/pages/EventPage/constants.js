export const subscriptionScopeIds = {
  'weplay-bukovel-minor-2020': '5ddcea1fb087111d81375fb2',
  'tug-of-war-mad-moon': '5e28196fb08711d64820bd15',
  'we-save-charity-play': '5e6f4c1ab0871139e760b0f7',
  'we-play-pushka-league': '5e85a484b08711f82c32dbe4',
  'we-play-clutch-island': '5ed7593c4cac612cfdf672ff',
}

export const socialChannels = {
  youtube: {
    default: {
      en: {
        url: 'https://www.youtube.com/channel/UCBiFae7FtktcnHAwmgUTOIg',
        type: 'youtube',
        title: 'WePlay! Esports',
        description: 'Highlights, interview, memes, and more',
      },
      ru: {
        url: 'https://www.youtube.com/channel/UCBiFae7FtktcnHAwmgUTOIg',
        type: 'youtube',
        title: 'WePlay! Esports',
        description: 'Хайлайты, интервью, мемы и многое другое',
      },
    },
    en: {
      'cs-go':
        {
          url: 'https://www.youtube.com/channel/UC7fnl0dTMEHnJQ-55CmzTbQ',
          type: 'youtube',
          title: 'WePlay! CS:GO',
          description: 'The Top videos of WePlay! tournaments',
        },
      'dota-2':
        {
          url: 'https://www.youtube.com/channel/UCB1Cp_eNvUGWoIt4K0ZGDDg',
          type: 'youtube',
          title: 'WePlay! DOTA2',
          description: 'The best content of Dota 2 WePlay! Events',
        },
    },
    ru: {
      'cs-go':
        {
          url: 'https://www.youtube.com/channel/UC7fnl0dTMEHnJQ-55CmzTbQ',
          type: 'youtube',
          title: 'WePlay! CS:GO',
          description: 'The Top videos of WePlay! tournaments',
        },
      'dota-2':
        {
          url: 'https://www.youtube.com/channel/UCB1Cp_eNvUGWoIt4K0ZGDDg',
          type: 'youtube',
          title: 'WePlay! DOTA2',
          description: 'Лучшее из WePlay! турниров по Dota 2',
        },
    },
  },
  twitch: {
    en: {
      url: 'https://www.twitch.tv/weplayesport_en',
      type: 'twitch',
      title: 'WePlay! Twitch - EN',
      description: 'Аll streaming and chatting is here',
    },
    ru: {
      url: 'https://www.twitch.tv/weplayesport_ru',
      type: 'twitch',
      title: 'WePlay! Twitch - RU',
      description: 'Стримим, общаемся, общаемся, стримим',
    },
  },
}

export const TOURNAMENT_DISCIPLINES = {
  Dota2: 'dota-2',
  'CS:GO': 'cs-go',
}

export const TOURNAMENT_STATUSES = {
  UPCOMING: 'upcoming',
  ONGOING: 'ongoing',
  ENDED: 'ended',
}

export const MATCH_STATUSES = {
  SCHEDULED: 'scheduled',
  ACTIVE: 'active',
  FINISHED: 'finished',
  INACTIVE: 'inactive',
}

export const TOURNAMENT_SLUGS_WITH_TICKETS = [
  'tug-of-war-mad-moon',
]

export const MATCH_FORMATS = {
  'best of one': 'BO1',
  'best of two': 'BO2',
  'best of three': 'BO3',
  'best of five': 'BO5',
  'best of seven': 'BO7',
}

export const BUKOVEL_MINOR_ID = 1
export const MAD_MOON_ID = 47

export const MAX_ENTITIES_PER_REQUEST = 100
