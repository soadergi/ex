import { $map } from 'weplay-core/$utils/$map'
import { localizeWith } from 'weplay-core/reduxs/helpers'

const globalNavigation = {
  services: {
    id: 1,
    project: 'services',
    url: '/services',
    localizations: {
      en: { title: 'Services' },
      ru: { title: 'Сервисы' },
    },
    headerMenu: [{
      id: 11,
      localizations: {
        en: { url: '/services', text: 'Home' },
        ru: { url: '/services', text: 'Главная' },
      },
    }, {
      id: 12,
      localizations: {
        en: { url: '/services/brand-integration', text: 'Brand integrations' },
        ru: { url: '/services/brand-integration', text: 'Бренд-интеграции' },
      },
    }, {
      id: 13,
      localizations: {
        en: { url: '/services/media-rights', text: 'Media rights in esports' },
        ru: { url: '/services/media-rights', text: 'Медиаправа в киберспорте' },
      },
    }, {
      id: 14,
      localizations: {
        en: { url: '/services/event-production', text: 'Event and video production' },
        ru: { url: '/services/event-production', text: 'Ивент и видео продакшн' },
      },
    }],
  },
  projects: {
    id: 2,
    project: 'projects',
    url: '/projects',
    localizations: {
      en: { title: 'Projects' },
      ru: { title: 'Проекты' },
    },
    headerMenu: [{
      id: 21,
      localizations: {
        en: { url: '/projects', text: 'Home' },
        ru: { url: '/projects', text: 'Главная' },
      },
    }, {
      id: 22,
      localizations: {
        en: { url: '/projects/weplay-bukovel-minor-2020', text: 'WePlay! Bukovel Minor 2020' },
        ru: { url: '/projects/weplay-bukovel-minor-2020', text: 'WePlay! Bukovel Minor 2020' },
      },
    }, {
      id: 23,
      localizations: {
        en: { url: '/projects/weplay-dota-underlords-open', text: 'WePlay! Dota Underlords Open' },
        ru: { url: '/projects/weplay-dota-underlords-open', text: 'WePlay! Dota Underlords Open' },
      },
    }, {
      id: 24,
      localizations: {
        en: { url: '/projects/tug-of-war-dire', text: 'WePlay! Dota 2 Tug of War: Dire' },
        ru: { url: '/projects/tug-of-war-dire', text: 'WePlay! Dota 2 Tug of War: Dire' },
      },
    }],
  },
  blog: {
    id: 3,
    project: 'blog',
    url: '/blog',
    localizations: {
      en: { title: 'Blog' },
      ru: { title: 'Блог' },
    },
    headerMenu: [],
  },
  about: {
    id: 4,
    project: 'about',
    url: '/about-us',
    localizations: {
      en: { title: 'About Us' },
      ru: { title: 'О нас' },
    },
    headerMenu: [{
      id: 41,
      localizations: {
        en: { url: '/about-us', text: 'Home' },
        ru: { url: '/about-us', text: 'Главная' },
      },
    }, {
      id: 42,
      localizations: {
        en: { url: '/team', text: 'Our team' },
        ru: { url: '/team', text: 'Наша команда' },
      },
    }, {
      id: 43,
      localizations: {
        en: {
          url: 'https://aboutweplay.zendesk.com/hc/en-us/sections/360000812598-FAQ-FOR-BRANDS-IN-ESPORTS',
          text: 'FAQ',
        },
        ru: {
          // eslint-disable-next-line max-len
          url: 'https://aboutweplay.zendesk.com/hc/ru/sections/360000812598-FAQ-%25D0%2594%25D0%259B%25D0%25AF-%25D0%2591%25D0%25A0%25D0%2595%25D0%259D%25D0%2594%25D0%259E%25D0%2592-%25D0%2592-%25D0%259A%25D0%2598%25D0%2591%25D0%2595%25D0%25A0%25D0%25A1%25D0%259F%25D0%259E%25D0%25A0%25D0%25A2%25D0%2595',
          text: 'FAQ',
        },
      },
    }, {
      id: 44,
      localizations: {
        en: { url: '/contacts', text: 'Contacts' },
        ru: { url: '/contacts', text: 'Контакты' },
      },
    }],
  },
  pressRoom: {
    id: 5,
    project: 'pressRoom',
    url: {
      en: 'https://press.weplay.tv/en',
      ru: 'https://press.weplay.tv/',
    },
    localizations: {
      en: { title: 'Press Room' },
      ru: { title: 'Press Room' },
    },
    headerMenu: [],
  },
}

export const getGlobalMenu = language => globalNavigation
  |> Object.values
  |> $map(localizeWith(language))
  |> $map(value => ({
    ...value,
    headerMenu: value.headerMenu.map(localizeWith(language)),
  }))

export const getMobileMenu = language => getGlobalMenu(language)
