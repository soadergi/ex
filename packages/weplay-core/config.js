export const facebookAppId = 399708430548935
export const TwitchUrl = 'https://api.twitch.tv/helix'
export const AMPLITUDE_API_KEY__PROD = '63fdcebb66676eed6566c2bdbc0da4e7'
export const AMPLITUDE_API_KEY__DEV = 'fd0843fbd65d672aaeb58519b73dc543'
export const SentryDSNKey = 'https://9ba47bdf60844b049afd9d7e14593053@sentry.weplay.space/64'

export default ({
  languages: ['en', 'ru'], // first is the default one
  languagesMap: {
    ru: 'ru',
    uk: 'ru',
    be: 'ru',
    en: 'en',
  },
  mediaApi: {
    url: 'media-service',
  },
  authorsApi: {
    url: 'media-authors-service',
  },
  tagsApi: {
    url: 'media-tags-service',
  },
  commentsApi: {
    url: 'comment-service',
  },
  staticApi: {
    url: 'static-service',
  },
  UMSApi: {
    url: 'user-management-service',
  },
  authApi: {
    url: 'auth-service',
  },
  promoApi: {
    url: 'promo-service',
  },
  subscriptionApi: {
    url: 'subscription-service',
  },
  votesApi: {
    url: 'likes',
  },
  backofficeApi: {
    url: 'backoffice',
  },
  walletApi: {
    url: 'wallet-service',
  },
  notificationsApi: {
    url: 'notification-service',
  },
  eTicketApi: {
    url: 'e-ticket-service',
  },
  votingApi: {
    url: 'voting-service-java',
  },
  miniGamesApi: {
    url: 'game-center-service',
  },
  predictionsApi: {
    url: 'predictions-management-service',
  },
  twitchApiProxyService: {
    url: 'twitch-api-proxy-service/v1/forward',
  },
})

export const zendeskLinks = {
  howToWithdraw: {
    ru: 'https://weplayhelp.zendesk.com/hc/ru/articles/360001940458-%D0%9A%D0%B0%D0%BA-'
            + '%D0%B2%D1%8B%D0%B2%D0%B5%D1%81%D1%82%D0%B8-WP-Points-',
    en: 'https://weplayhelp.zendesk.com/hc/en-us/articles/360001940458-How-to-withdraw-WP-',
  },
  whatIsWp: {
    ru: 'https://weplayhelp.zendesk.com/hc/ru/articles/360001950778'
            + '-%D0%A7%D1%82%D0%BE-%D0%B4%D0%B0%D1%8E%D1%82-WePlay-Points-',
    en: 'https://weplayhelp.zendesk.com/hc/en-us/articles/360001950778-Whats-value-of-WP-',
  },
}

export const ARTICLE_STATUS = {
  PUBLISHED: 'published',
}

export const SOCIAL_NAMES = {
  FB: 'facebook',
  TW: 'twitter',
  INST: 'instagram',
  LINK: 'linkedin',
  YOUTUBE: 'youtube',
  TWITCH: 'twitch',
}

export const amplitudeConfig = {
  includeUtm: true,
  includeReferrer: true,
}
