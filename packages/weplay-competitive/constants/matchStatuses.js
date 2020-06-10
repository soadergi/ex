export const MATCH_STATUSES = {
  PAUSE: 'PAUSE',
  CANCELED: 'CANCELED',

  // match in future
  UPCOMING: 'UPCOMING',

  // lobby_start_datetime -> X -> lobby_start_datetime + 120sec

  // lobby_start_datetime + 120sec -> X -> all players voted
  VOTING: 'VOTING',

  // all players voted -> X -> server setup started
  // VOTED?

  // server setup started  -> X -> server set up finished
  SETUP_SERVER: 'SETUP_SERVER',

  // server set up finished  -> X -> match finished
  ONGOING: 'ONGOING',

  // match finished -> X
  FINISHED: 'FINISHED',
  TECHNICAL_DEFEAT: 'TECHNICAL_DEFEAT',
}
