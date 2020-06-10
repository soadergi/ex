export const ROUTE_NAMES = {
  ROOT: 'ROOT',
  SERVICES: 'SERVICES',
  ARENA_EVENTS: 'ARENA_EVENTS',
  BRAND_CONTENT: 'BRAND_CONTENT',
  BRAND_INTEGRATION: 'BRAND_INTEGRATION',
  BROADCASTING_RIGHTS: 'BROADCASTING_RIGHTS',
  CREATIVE_DEV: 'CREATIVE_DEV',
  ESPORTS_SHOWS: 'ESPORTS_SHOWS',
  EVENT_PRODUCTION: 'EVENT_PRODUCTION',
  MEDIA_RIGHTS: 'MEDIA_RIGHTS',
  NATIVE_INTEGRATION: 'NATIVE_INTEGRATION',
  PR_SMM: 'PR_SMM',
  SPONSORSHIP: 'SPONSORSHIP',
  TALK_SHOWS: 'TALK_SHOWS',
  TALK_SHOWS_RIGHTS: 'TALK_SHOWS_RIGHTS',
  TOURNAMENT_INTEGRATION: 'TOURNAMENT_INTEGRATION',
  VOD_RIGHTS: 'VOD_RIGHTS',
  WHITELABEL_TOURNAMENTS: 'WHITELABEL_TOURNAMENTS',

  BLOG: 'BLOG',
  ARTICLE: 'ARTICLE', // TODO: temp hack to get right subscription

  PROJECTS: 'PROJECTS',
  PROJECT: 'PROJECT', // TODO: subscribe form not working

  ABOUT_US: 'ABOUT_US',
  TEAM: 'TEAM',
  TEAM_MEMBER: 'TEAM_MEMBER',
  CONTACTS: 'CONTACTS',

  PRESS_ROOM: 'PRESS_ROOM',
}

export const ROUTES = [
  {
    name: ROUTE_NAMES.ROOT,
    path: '',
    lokaliseKey: 'mainPage',
    project: 'home',
  },
  {
    name: ROUTE_NAMES.BLOG,
    path: 'blog',
    lokaliseKey: 'blogPage',
    project: 'blog',
  },
  {
    name: ROUTE_NAMES.SERVICES,
    path: 'services',
    lokaliseKey: 'servicesPage',
    project: 'services',
  },
  {
    name: ROUTE_NAMES.ABOUT_US,
    path: 'about-us',
    lokaliseKey: 'aboutUsPage',
    project: 'about',
  },
  {
    name: ROUTE_NAMES.TEAM,
    path: 'team',
    lokaliseKey: 'teamPage',
    project: 'about',
  },
  {
    name: ROUTE_NAMES.TEAM_MEMBER,
    path: 'team/*-:memberName',
    project: 'about',
    // dynamic page, no lokaliseKey
  },
  {
    name: ROUTE_NAMES.CONTACTS,
    path: 'contacts',
    lokaliseKey: 'contactsPage',
    project: 'about',
  },
  {
    name: ROUTE_NAMES.ARENA_EVENTS,
    path: 'services/arena-events',
    lokaliseKey: 'arenaEventsPage',
    project: 'services',
  },
  {
    name: ROUTE_NAMES.BRAND_CONTENT,
    path: 'services/brand-content',
    lokaliseKey: 'brandContentPage',
    project: 'services',
  },
  {
    name: ROUTE_NAMES.BRAND_INTEGRATION,
    path: 'services/brand-integration',
    lokaliseKey: 'brandIntegrationPage',
    project: 'services',
  },
  {
    name: ROUTE_NAMES.BROADCASTING_RIGHTS,
    path: 'services/broadcasting-rights',
    lokaliseKey: 'broadcastingRightsPage',
    project: 'services',
  },
  {
    name: ROUTE_NAMES.CREATIVE_DEV,
    path: 'services/creative-dev',
    lokaliseKey: 'creativeDevPage',
    project: 'services',
  },
  {
    name: ROUTE_NAMES.ESPORTS_SHOWS,
    path: 'services/esports-shows',
    lokaliseKey: 'esportsShowsPage',
    project: 'services',
  },
  {
    name: ROUTE_NAMES.EVENT_PRODUCTION,
    path: 'services/event-production',
    lokaliseKey: 'eventProductionPage',
    project: 'services',
  },
  {
    name: ROUTE_NAMES.MEDIA_RIGHTS,
    path: 'services/media-rights',
    lokaliseKey: 'mediaRightsPage',
    project: 'services',
  },
  {
    name: ROUTE_NAMES.NATIVE_INTEGRATION,
    path: 'services/native-integration',
    lokaliseKey: 'nativeIntegrationPage',
    project: 'services',
  },
  {
    name: ROUTE_NAMES.PR_SMM,
    path: 'services/pr-smm',
    lokaliseKey: 'prSmmPage',
    project: 'services',
  },
  {
    name: ROUTE_NAMES.SPONSORSHIP,
    path: 'services/sponsorship',
    lokaliseKey: 'sponsorshipPage',
    project: 'services',
  },
  {
    name: ROUTE_NAMES.TALK_SHOWS,
    path: 'services/talk-shows',
    lokaliseKey: 'talkShowsPage',
    project: 'services',
  },
  {
    name: ROUTE_NAMES.TALK_SHOWS_RIGHTS,
    path: 'services/talk-shows-rights',
    lokaliseKey: 'talkShowsRightsPage',
    project: 'services',
  },
  {
    name: ROUTE_NAMES.TOURNAMENT_INTEGRATION,
    path: 'services/tournament-integration',
    lokaliseKey: 'tournamentIntegrationPage',
    project: 'services',
  },
  {
    name: ROUTE_NAMES.VOD_RIGHTS,
    path: 'services/vod-rights',
    lokaliseKey: 'vodRightsPage',
    project: 'services',
  },
  {
    name: ROUTE_NAMES.WHITELABEL_TOURNAMENTS,
    path: 'services/whitelabel-tournaments',
    lokaliseKey: 'whitelabelTournamentsPage',
    project: 'services',
  },
  {
    name: ROUTE_NAMES.ARTICLE,
    path: 'blog/article/*-:articleId',
    project: 'blog',
    // dynamic page, no lokaliseKey
  },
  {
    name: ROUTE_NAMES.PROJECTS,
    path: 'projects',
    project: 'projects',
    lokaliseKey: 'projects',
  },
  {
    name: ROUTE_NAMES.PROJECT,
    path: 'projects/*-:projectId',
    project: 'projects',
    // dynamic page, no lokaliseKey
  },
  {
    name: ROUTE_NAMES.PRESS_ROOM,
    path: 'press-room',
    project: 'pressRoom',
    lokaliseKey: 'pressRoomPage',
  },
]
export const getProjectPrefix = () => ''
