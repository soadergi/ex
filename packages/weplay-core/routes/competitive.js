export const NAMES = {
  INDEX: 'INDEX',
  TOURNAMENT: 'TOURNAMENT',
  TOURNAMENTS: 'TOURNAMENTS',
  LADDERS: 'LADDERS',
  LADDER: 'LADDER',
  TEAM: 'TEAM',
  TEAMS: 'TEAMS',
  MATCH: 'MATCH',
  MATCHES: 'MATCHES',
  MEMBER: 'MEMBER',
  MEMBER_TOURNAMENTS: 'MEMBER_TOURNAMENTS',
  TEAM_TOURNAMENTS: 'TEAM_TOURNAMENTS',
  MEMBER_MATCHES: 'MEMBER_MATCHES',
  TEAM_MATCHES: 'TEAM_MATCHES',
  TOURNAMENT_PARTICIPANTS: 'TOURNAMENT_PARTICIPANTS',
  STEAM_VERIFY: 'STEAM_VERIFY',
  ZENDESK_VERIFY: 'ZENDESK_VERIFY',
  TEAM_MEMBERS: 'TEAM_MEMBERS',
  LANDING: 'TOURNAMENTS_LANDING',
  PREMIUM: 'PREMIUM',
  PREMIUM_SUCCESS: 'PREMIUM_SUCCESS',
  MM_MATCH: 'MM_MATCH',

  NEW_TP: 'NEW_TP',
  NEW_TP__TOURNAMENTS_LIST: 'NEW_TP__TOURNAMENTS_LIST',
  NEW_TP__TEAM: 'NEW_TP__TEAM',
  NEW_TP__TEAM_TOURNAMENTS: 'NEW_TP__TEAM_TOURNAMENTS',
  NEW_TP__TEAM_MEMBERS: 'NEW_TP__TEAM_MEMBERS',
  NEW_TP__TEAM_MATCHES: 'NEW_TP__TEAM_MATCHES',
  NEW_TP__MEMBER: 'NEW_TP__MEMBER',
  NEW_TP__MEMBER_MATCHES: 'NEW_TP__MEMBER_MATCHES',
  NEW_TP__MEMBER_TOURNAMENTS: 'NEW_TP__MEMBER_TOURNAMENTS',
  NEW_TP__TOURNAMENT: 'NEW_TP__TOURNAMENT',
  NEW_TP__TOURNAMENT_PARTICIPANTS: 'NEW_TP__TOURNAMENT_PARTICIPANTS',
  NEW_TP__MATCH: 'NEW_TP__MATCH',
}
export const PROJECT_PREFIX = 'tournaments'

const commonRouteConfig = {
  title: 'tournaments',
  // SectionBody, BottomArticles, CookiesPolicyPopup
}
const newTPPath = 'new-tournament-platform'
export const ROUTES = [
  // ====== GENERRAL PAGES =======
  // ===============================
  {
    name: NAMES.STEAM_VERIFY,
    path: 'steam-verify',
    ...commonRouteConfig,
  }, {
    name: NAMES.ZENDESK_VERIFY,
    path: 'zendesk',
    ...commonRouteConfig,
  },
  {
    name: NAMES.PREMIUM,
    path: 'premium',
    ...commonRouteConfig,
  },
  {
    name: NAMES.PREMIUM_SUCCESS,
    path: 'premium-success',
    ...commonRouteConfig,
  },
  {
    name: NAMES.LANDING,
    path: '',
    ...commonRouteConfig,
    isTournamentLandingPage: true,
  },

  // ====== NEW API PAGES =======
  // ===============================
  {
    name: NAMES.MM_MATCH,
    path: ':discipline/matchmaking/match-:matchId',
    ...commonRouteConfig,
  },
  {
    name: NAMES.LADDER,
    path: ':discipline/ladders/:ladderName-id-:ladderId',
    ...commonRouteConfig,
  },
  {
    name: NAMES.LADDERS,
    path: ':discipline/ladders',
    ...commonRouteConfig,
  },

  // ======= OLD API PAGES ======
  // ===============================
  {
    name: NAMES.TOURNAMENTS,
    path: ':discipline/',
    ...commonRouteConfig,
  },

  // ==== TEAM PAGES ======
  {
    name: NAMES.TEAM,
    path: ':discipline/team-:teamName-id-:teamId',
    ...commonRouteConfig,
  },
  {
    name: NAMES.TEAM_TOURNAMENTS,
    path: ':discipline/team-:teamName-id-:teamId/list',
    ...commonRouteConfig,
  },
  {
    name: NAMES.TEAM_MEMBERS,
    path: ':discipline/team-:teamName-id-:teamId/members',
    ...commonRouteConfig,
  },
  {
    name: NAMES.TEAM_MATCHES,
    path: ':discipline/team-:teamName-id-:teamId/matches',
    ...commonRouteConfig,
  },

  // ==== MEMBER PAGES ======
  {
    name: NAMES.MEMBER,
    path: ':discipline/player-:memberName-id-:memberId',
    ...commonRouteConfig,
  },
  {
    name: NAMES.MEMBER_MATCHES,
    path: ':discipline/player-:memberName-id-:memberId/matches',
    ...commonRouteConfig,
  },
  {
    name: NAMES.MEMBER_TOURNAMENTS,
    path: ':discipline/player-:memberName-id-:memberId/list',
    ...commonRouteConfig,
  },

  // ==== TOURNAMENT PAGES ======
  {
    name: NAMES.TOURNAMENT,
    path: ':discipline/tournament-:tournamentName-id-:tournamentId',
    ...commonRouteConfig,
  },
  {
    name: NAMES.TOURNAMENT_PARTICIPANTS,
    path: ':discipline/tournament-:tournamentName-id-:tournamentId/participants',
    ...commonRouteConfig,
  },
  {
    name: NAMES.MATCH,
    path: ':discipline/tournament-:tournamentName-id-:tournamentId/:matchId',
    ...commonRouteConfig,
  },

  // ======= UNDER NEW API DEVELOPMENT PAGES ======
  // ===============================
  {
    name: NAMES.NEW_TP,
    path: newTPPath,
  },
  {
    name: NAMES.NEW_TP__TOURNAMENTS_LIST,
    path: ':discipline/',
    ...commonRouteConfig,
  },

  // ==== TEAM PAGES ======
  {
    name: NAMES.NEW_TP__TEAM,
    path: ':discipline/team-:teamName-id-:teamId',
    ...commonRouteConfig,
  },
  {
    name: NAMES.NEW_TP__TEAM_TOURNAMENTS,
    path: ':discipline/team-:teamName-id-:teamId/list',
    ...commonRouteConfig,
  },
  {
    name: NAMES.NEW_TP__TEAM_MEMBERS,
    path: ':discipline/team-:teamName-id-:teamId/members',
    ...commonRouteConfig,
  },
  {
    name: NAMES.NEW_TP__TEAM_MATCHES,
    path: ':discipline/team-:teamName-id-:teamId/matches',
    ...commonRouteConfig,
  },

  // ==== MEMBER PAGES ======
  {
    name: NAMES.NEW_TP__MEMBER,
    path: ':discipline/player-:memberName-id-:memberId',
    ...commonRouteConfig,
  },
  {
    name: NAMES.NEW_TP__MEMBER_MATCHES,
    path: ':discipline/player-:memberName-id-:memberId/matches',
    ...commonRouteConfig,
  },
  {
    name: NAMES.NEW_TP__MEMBER_TOURNAMENTS,
    path: ':discipline/player-:memberName-id-:memberId/list',
    ...commonRouteConfig,
  },

  // ==== TOURNAMENT PAGES ======
  {
    name: NAMES.NEW_TP__TOURNAMENT,
    path: ':discipline/tournament-:tournamentName-id-:tournamentId',
    ...commonRouteConfig,
  },
  {
    name: NAMES.NEW_TP__TOURNAMENT_PARTICIPANTS,
    path: ':discipline/tournament-:tournamentName-id-:tournamentId/participants',
    ...commonRouteConfig,
  },
  {
    name: NAMES.NEW_TP__MATCH,
    path: ':discipline/tournament-:tournamentName-id-:tournamentId/:matchId',
    ...commonRouteConfig,
  },
]
