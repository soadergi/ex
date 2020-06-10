import { PROFILE_PAGE_PATHS } from 'weplay-core/routes/profile'

export const popupItems = [
  {
    localizations: {
      en: {
        title: 'My bookmarks',
      },
      ru: {
        title: 'Мои закладки',
      },
    },
    url: PROFILE_PAGE_PATHS.MY_BOOKMARKS,
    iconName: 'bookmark',
  },
  {
    localizations: {
      en: {
        title: 'My browsing history',
      },
      ru: {
        title: 'История просмотров',
      },
    },
    url: PROFILE_PAGE_PATHS.BROWSING_HISTORY,
    iconName: 'history',
  },
  {
    localizations: {
      en: {
        title: 'My subscriptions',
      },
      ru: {
        title: 'Мои подписки',
      },
    },
    url: PROFILE_PAGE_PATHS.MY_SUBSCRIPTIONS,
    iconName: 'subscriptions',
  },
  {
    localizations: {
      en: {
        title: 'Premium',
      },
      ru: {
        title: 'Premium',
      },
    },
    url: PROFILE_PAGE_PATHS.PREMIUM_SUBSCRIPTION,
    iconName: 'premium',
    isPremium: true,
    lastInCategory: true,
  },
  {
    localizations: {
      en: {
        title: 'Account settings',
      },
      ru: {
        title: 'Настройки аккаунта',
      },
    },
    url: PROFILE_PAGE_PATHS.PERSONAL_INFO,
    iconName: 'settings',
    subItems: [
      {
        localizations: {
          en: {
            title: 'Personal info',
          },
          ru: {
            title: 'Личные данные',
          },
        },
        url: PROFILE_PAGE_PATHS.PERSONAL_INFO,
      },
      {
        localizations: {
          en: {
            title: 'Sign in methods',
          },
          ru: {
            title: 'Соцсети',
          },
        },
        url: PROFILE_PAGE_PATHS.SIGN_IN_METHODS,
      },
    ],
  },
]
