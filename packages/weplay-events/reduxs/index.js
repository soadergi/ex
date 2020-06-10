import { combineReducers } from 'redux'

import { ROOTPAGE_RN, rootpageReducer } from './rootpage'
import tournamentReducerLegacy, { TOURNAMENT_LEGACY_RN } from './tournaments/reducer'
import { BETS_RN, betsReducer } from './bets/reducer'
import gameStats, { GAME_STATS_RN } from './gameStats/reducer'
import openDotaStats, { OPEN_DOTA_STATS_RN } from './openDota/reducer'
import { TOURNAMENT_RN, tournamentReducer } from './tournament'
import { SEO_SNIPPETS_RN, seoSnippetsReducer } from './seoSnippet'
import { PRIZES_RN, prizesReducer } from './prizes'
import { MEDIA_TAG_RN, mediaTagReducer } from './mediaTag'
import { TOURNAMENT_COMPANIES_RN, tournamentCompanyReducer } from './tournamentCompanies'
import { GAME_MODE_RN, gameModeReducer } from './gameMode'
import { TOURNAMENT_PLAYER_RN, tournamentPlayerReducer } from './tournamentPlayer'
import { TOURNAMENT_TEAM_RN, tournamentTeamReducer } from './tournamentTeam'
import { TOURNAMENT_RESOURCES_RN, tournamentResourcesReducer } from './tournamentResources'
import { TOURNAMENT_STREAMS_RN, tournamentStreamsReducer } from './streams'
import { DISCIPLINE_RN, disciplineReducer } from './discipline'
import { STAGES_RN, stageReducer } from './stages'
import { GRIDS_RN, gridReducer } from './grids'
import { GRID_ITEMS_RN, gridItemsReducer } from './gridItems'
import { MATCHES_RN, matchesReducer } from './matches'
import { PARTICIPANTS_RN, participantsReducer } from './participants'
import { GAMES_RN, gamesReducer } from './games'
import votingReducer, { VOTING_RN } from './voting/reducer'
import { PREDICTIONS_RN, predictionReducer } from './predictions'

export default combineReducers({
  [TOURNAMENT_LEGACY_RN]: tournamentReducerLegacy,
  [BETS_RN]: betsReducer,
  [GAME_STATS_RN]: gameStats,
  [OPEN_DOTA_STATS_RN]: openDotaStats,
  [ROOTPAGE_RN]: rootpageReducer,
  [TOURNAMENT_RN]: tournamentReducer,
  [SEO_SNIPPETS_RN]: seoSnippetsReducer,
  [PRIZES_RN]: prizesReducer,
  [MEDIA_TAG_RN]: mediaTagReducer,
  [TOURNAMENT_COMPANIES_RN]: tournamentCompanyReducer,
  [GAME_MODE_RN]: gameModeReducer,
  [TOURNAMENT_PLAYER_RN]: tournamentPlayerReducer,
  [TOURNAMENT_TEAM_RN]: tournamentTeamReducer,
  [TOURNAMENT_RESOURCES_RN]: tournamentResourcesReducer,
  [TOURNAMENT_STREAMS_RN]: tournamentStreamsReducer,
  [DISCIPLINE_RN]: disciplineReducer,
  [STAGES_RN]: stageReducer,
  [GRIDS_RN]: gridReducer,
  [GRID_ITEMS_RN]: gridItemsReducer,
  [MATCHES_RN]: matchesReducer,
  [PARTICIPANTS_RN]: participantsReducer,
  [GAMES_RN]: gamesReducer,
  [VOTING_RN]: votingReducer,
  [PREDICTIONS_RN]: predictionReducer,
})
