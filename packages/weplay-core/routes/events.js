export const NAMES = {
  RESHUFFLE_MADNESS_2018: 'reshuffleMadness2018',
  ARTIFACT: 'artifact',
  WINTER_MADNESS: 'winterMadness',
  LOCK_AND_LOAD: 'lockAndLoad',
  TUG_OF_WAR: 'tugOfWar',
  EVENTS_ROOT: 'eventsRoot',
  DOTA_UNDERLORDS: 'dotaUnderlords',
  EVENT_PAGE: 'eventPage',
  WATCH_LIVE: 'watchLive',
  PARTICIPANTS: 'participants',
  SCHEDULE: 'schedule',
  STANDINGS: 'standings',
  MAD_MOON_COMICS: 'madMoonComics',
  PREDICTIONS: 'guessWinners',
  MVP: 'mvpVoting',
}
export const PROJECT_PREFIX = 'events'

export const ROUTES = [
  {
    name: NAMES.RESHUFFLE_MADNESS_2018,
    path: 'reshuffle',
    title: 'reshuffle',
  },
  {
    name: NAMES.ARTIFACT,
    path: 'artifact/mighty-triad-:stageTitle*-:tournamentId',
    title: 'artifact',
  },
  {
    name: NAMES.WINTER_MADNESS,
    path: 'dota-2/winter-madness',
    title: 'winterMadness',
  },
  {
    name: NAMES.LOCK_AND_LOAD,
    path: 'cs-go/lock-and-load',
    title: 'lockAndLoad',
  },
  {
    name: NAMES.TUG_OF_WAR,
    path: 'dota-2/tug-of-war-:stageTitle-:tournamentId',
    title: 'tugOfWar',
  },
  {
    name: NAMES.DOTA_UNDERLORDS,
    path: 'dota-underlords/weplay-underlords-open',
    title: 'dotaUnderlords',
  },
  {
    name: NAMES.EVENTS_ROOT,
    path: '',
  },
  {
    name: NAMES.MAD_MOON_COMICS,
    path: 'mad-moon-comics',
    title: 'madMoodComics',
  },
  {
    name: NAMES.EVENT_PAGE,
    path: ':tournamentDiscipline/:tournamentSlug',
    title: 'eventPage',
  },
  {
    name: NAMES.WATCH_LIVE,
    path: ':tournamentDiscipline/:tournamentSlug/watch-live',
    title: 'watchLive',
  },
  {
    name: NAMES.SCHEDULE,
    path: ':tournamentDiscipline/:tournamentSlug/schedule',
    title: 'schedule',
  },
  {
    name: NAMES.STANDINGS,
    path: ':tournamentDiscipline/:tournamentSlug/standings',
    title: 'standings',
  },
  {
    name: NAMES.PARTICIPANTS,
    path: ':tournamentDiscipline/:tournamentSlug/participants',
    title: 'participants',
  },
  {
    name: NAMES.MVP,
    path: ':tournamentDiscipline/:tournamentSlug/mvp-voting',
    title: 'mvpVoting',
  },
  {
    name: NAMES.PREDICTIONS,
    path: ':tournamentDiscipline/:tournamentSlug/guess-winners',
    title: 'guessWinners',
  },
]
