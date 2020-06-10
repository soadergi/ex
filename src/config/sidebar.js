
// TODO: move this to routes/contsts
export const mainMenuItems = [
  {
    icon: 'media',
    label: 'media',
    path: '/media',
  },
  {
    icon: 'tugOfWar',
    label: 'tugOfWar',
    path: '/events/dota-2/tug-of-war-dire-8',
  },
  {
    icon: 'cs-league',
    label: 'forgeOfMastersWePlayLeague',
    path: '/events/cs-go/forge-of-masters/spring-2019-lan-final',
  },
  {
    icon: 'tournamentsCup',
    label: 'tournaments',
    path: '/tournaments',
  },
]

export const footerPress = [
  {
    key: 7,
    label: 'pressRoom',
    pressRoom: true,
    path: 'http://press.weplay.tv/',
  },
]

export const footerNav = [
  {
    key: 2,
    label: 'termsOfService',
    path: '/legal/terms-of-service',
    terms: true,
  },
  {
    key: 3,
    label: 'privacyPolicy',
    path: '/legal/privacy-policy',
  },
  {
    key: 6,
    label: 'cookiePolicy',
    path: '/legal/cookie-policy',
  },
]

export const footerInfo = [
  {
    key: 0,
    label: 'oldWeplay',
    oldWeplay: true,
    path: 'https://old.weplay.tv/',
  },
  {
    key: 1,
    label: 'feedback',
    path: '/',
    feedback: true,
    icon: 'question',
  },
]
