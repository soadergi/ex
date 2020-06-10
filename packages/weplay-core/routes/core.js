export const NAMES = {
  ROOT: 'root',
  PROFILE: 'profile',
  CODES: 'promocodes',
  VOTING: 'voting',
  CANDIDATE: 'candidate',
  LANDING: 'TOURNAMENTS_LANDING',
  AUTH_VERIFY_CODE: 'authVerifyCode',
  NOT_FOUND: 'notFound',
  VOTING_MWP: 'mvpDire',
  NOTIFICATIONS_SETTINGS: 'notificationsSettings',
  SERVICE_PAGE: 'servicePage',
  CRYSTAL_BALL: 'crystalBall',
  TICKETS_MANAGEMENT: 'ticketsManagement',
  DONATE_CHARITY_PLAY: 'donateCharityPlay',
  DONATE_CHARITY_SUCCESS: 'donateCharitySuccess',
  OAUTH_MOBILE_VERIFY: 'oAuthMobileVerify',
}

export const PROFILE_PATHS = {
  PERSONAL_INFO: 'personal-info',
  SIGN_IN_METHODS: 'sign-in-methods',
  ARTICLES: 'browsing-history',
  SUBSCRIPTIONS: 'managing-subscriptions',
  PREMIUM_SUBSCRIPTION: 'premium-subscription',
  BOOKMARKS: 'bookmarks',
}

export const PROJECT_PREFIX = 'core'
export const ROUTES = [
  {
    name: NAMES.ROOT,
    path: '',
  },
  {
    name: NAMES.PROFILE,
    path: 'cabinet/:section?',
    title: 'profile',
    sections: Object.values(PROFILE_PATHS),
  },
  {
    name: NAMES.CODES,
    path: 'codes',
    title: 'promocode',
  },
  {
    name: NAMES.VOTING_MWP,
    path: 'voting/:votingStageTitle',
    title: 'votingMVP',
  },
  {
    name: NAMES.VOTING,
    path: 'votings/:votingId',
    title: 'voting',
  },
  {
    name: NAMES.CANDIDATE,
    path: 'votings/:votingId/candidates/:votingOptionId',
    title: 'voting',
  },
  {
    name: NAMES.AUTH_VERIFY_CODE,
    path: 'social-auth-code/:source',
    title: '',
  },
  {
    name: NAMES.SERVICE_PAGE,
    path: 'legal/:legalName',
    title: '',
  },
  {
    name: NAMES.NOT_FOUND,
    path: 'not-found',
    title: '',
  },
  {
    name: NAMES.NOTIFICATIONS_SETTINGS,
    path: 'notifications/settings',
    title: 'settings',
  },
  {
    name: NAMES.OAUTH_MOBILE_VERIFY,
    path: 'oauth-callback/:source',
  },
  {
    name: NAMES.CRYSTAL_BALL,
    path: 'crystal-ball/:section?',
  },
  {
    name: NAMES.TICKETS_MANAGEMENT,
    path: 'tickets',
  },
  {
    name: NAMES.DONATE_CHARITY_PLAY,
    path: 'donate-we-save',
  },
  {
    name: NAMES.DONATE_CHARITY_SUCCESS,
    path: 'donate-we-save/success-donate',
  },
]
