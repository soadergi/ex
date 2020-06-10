import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

import premiumsReducer, { PREMIUMS_RN } from 'weplay-core/reduxs/premiums/reducer'

import statisticReducer, { STATISTIC_RN } from 'weplay-competitive/reduxs/statistic/reducer'
import { TEAMS_RN, teamsReducer } from 'weplay-competitive/reduxs/teams'
import { MEMBER_RN, membersReducer } from 'weplay-competitive/reduxs/members'
import { TOURNAMENTS_RN, tournamentsReducer } from 'weplay-competitive/reduxs/tournaments'
import { TEAM_MEMBERS_RN, teamMembersReducer } from 'weplay-competitive/reduxs/teamMembers'
import { TOURNAMENT_MEMBERS_RN, tournamentMembersReducer } from 'weplay-competitive/reduxs/tournamentMembers'
import { ORGANIZERS_RN, organizersReducer } from 'weplay-competitive/reduxs/organizers'
import { INVITES_RN, invitesReducer } from 'weplay-competitive/reduxs/invites'
import { SPONSORS_RN, sponsorsReducer } from 'weplay-competitive/reduxs/sponsors'
import { STAGE_RN, stageReducer } from 'weplay-competitive/reduxs/stages'
import { GAME_MODES_RN, gameModesReducer } from 'weplay-competitive/reduxs/gameModes'
import { GAMES_RN, gamesReducer } from 'weplay-competitive/reduxs/games'
import { VOTE_ITEMS_RN, voteItemsReducer } from 'weplay-competitive/reduxs/voteItems'
import { MATCHES_RN, matchesReducer } from 'weplay-competitive/reduxs/matches'
import { BRACKETS_RN, bracketsReducer } from 'weplay-competitive/reduxs/brackets'
import { LOBBIES_RN, lobbiesReducer } from 'weplay-competitive/reduxs/lobbies'
import { LOBBY_MAPS_RN, lobbyMapsReducer } from 'weplay-competitive/reduxs/lobbyMaps'
import { NODES_RN, nodesReducer } from 'weplay-competitive/reduxs/nodes'
import { MATCH_MEMBERS_RN, matchMembersReducer } from 'weplay-competitive/reduxs/matchMembers'
import { MATCH_RESULT_RN, matchResultReducer } from 'weplay-competitive/reduxs/matchResults'
import { MATCH_ROUND_RN, matchRoundReducer } from 'weplay-competitive/reduxs/matchRounds'
import { REWARDS_RN, rewardsReducer } from 'weplay-competitive/reduxs/rewards'
import { MEMBER_GAME_PROFILES_RN, memberGameProfileReducer } from 'weplay-competitive/reduxs/memberGameProfiles'
import { FEATURES_RN, featuresReducer } from 'weplay-competitive/reduxs/features'
import defaultDisciplineSelectors, { DEFAULT_DISCIPLINE_RN } from 'weplay-competitive/reduxs/defaultDiscipline/reducer'
import { LADDER_RN, laddersReducer } from 'weplay-competitive/reduxs/ladders'
import { MM_QUEUES_RN, MMQueuesReducer } from 'weplay-competitive/reduxs/MMQueues'
import { SCORE_RN, scoresReducer } from 'weplay-competitive/reduxs/scores'
import { USER_SCORE_RN, userScoreReducer } from 'weplay-competitive/reduxs/userScores'
import { MODALS_RN, modalsReducer } from 'weplay-competitive/reduxs/modals/reducer'
import { MEMBER_INFO_RN, memberInfoReducer } from 'weplay-competitive/reduxs/memberInfoV3'
import { PENALTIES_RN, penaltiesReducer } from 'weplay-competitive/reduxs/penalties'
import { USER_PENALTIES_RN, userPenaltiesReducer } from 'weplay-competitive/reduxs/userPenalties'
import { MM_GAME_MODES_RN, MMGameModesReducer } from 'weplay-competitive/reduxs/MMGameModes'
import { MM_MATCHES_RN, MMMatchesReducer } from 'weplay-competitive/reduxs/MMMatches'
import { MM_VOTES_RN, MMVotesReducer } from 'weplay-competitive/reduxs/MMVotes'

import { NEW_TOURNAMENT_PLATFORM } from '../newTP/redux/reducerName'
import { newTPRootReducer } from '../newTP/redux/rootReducer'

const competitiveReducer = combineReducers({
  [BRACKETS_RN]: bracketsReducer,
  [DEFAULT_DISCIPLINE_RN]: defaultDisciplineSelectors,
  [FEATURES_RN]: featuresReducer,
  [GAME_MODES_RN]: gameModesReducer,
  [GAMES_RN]: gamesReducer,
  [INVITES_RN]: invitesReducer,
  [LADDER_RN]: laddersReducer,
  [LOBBIES_RN]: lobbiesReducer,
  [LOBBY_MAPS_RN]: lobbyMapsReducer,
  [MATCHES_RN]: matchesReducer,
  [MATCH_MEMBERS_RN]: matchMembersReducer,
  [MATCH_RESULT_RN]: matchResultReducer,
  [MATCH_ROUND_RN]: matchRoundReducer,
  [MEMBER_RN]: membersReducer,
  [MEMBER_INFO_RN]: memberInfoReducer,
  [MEMBER_GAME_PROFILES_RN]: memberGameProfileReducer,
  [MODALS_RN]: modalsReducer,
  [MM_GAME_MODES_RN]: MMGameModesReducer,
  [MM_MATCHES_RN]: MMMatchesReducer,
  [MM_QUEUES_RN]: MMQueuesReducer,
  [MM_VOTES_RN]: MMVotesReducer,
  [NODES_RN]: nodesReducer,
  [ORGANIZERS_RN]: organizersReducer,
  [PENALTIES_RN]: penaltiesReducer,
  [PREMIUMS_RN]: premiumsReducer,
  [REWARDS_RN]: rewardsReducer,
  [SCORE_RN]: scoresReducer,
  [SPONSORS_RN]: sponsorsReducer,
  [STATISTIC_RN]: statisticReducer,
  [STAGE_RN]: stageReducer,
  [TEAMS_RN]: teamsReducer,
  [TEAM_MEMBERS_RN]: teamMembersReducer,
  [TOURNAMENTS_RN]: tournamentsReducer,
  [TOURNAMENT_MEMBERS_RN]: tournamentMembersReducer,
  [USER_SCORE_RN]: userScoreReducer,
  [VOTE_ITEMS_RN]: voteItemsReducer,
  [USER_PENALTIES_RN]: userPenaltiesReducer,
  [NEW_TOURNAMENT_PLATFORM]: newTPRootReducer,
})

const persistConfig = {
  key: 'COMPETITIVE',
  storage,
  whitelist: [MM_QUEUES_RN],
}

export default persistReducer(persistConfig, competitiveReducer)
