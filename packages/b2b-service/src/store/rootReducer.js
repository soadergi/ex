import { combineReducers } from 'redux'

import layoutReducer, { LAYOUT_RN } from 'weplay-core/reduxs/_legacy/layout/reducer'
import subscriptionsReducer, { SUBSCRIPTIONS_RN } from 'weplay-core/reduxs/subscriptions/reducer'
import subscriptionBlocksReducer, { SUBSCRIPTION_BLOCKS_RN } from 'weplay-core/reduxs/subscriptionBlocks/reducer'
import news, { NEWS_RN } from 'weplay-core/reduxs/news/reducer'

import { ROOTPAGE_RN, rootpageReducer } from 'weplay-events/reduxs/rootpage'
import { DISCIPLINE_RN, disciplineReducer } from 'weplay-events/reduxs/discipline'
import { TOURNAMENT_RN, tournamentReducer } from 'weplay-events/reduxs/tournament'
import { TOURNAMENT_TEAM_RN, tournamentTeamReducer } from 'weplay-events/reduxs/tournamentTeam'
import { TOURNAMENT_PLAYER_RN, tournamentPlayerReducer } from 'weplay-events/reduxs/tournamentPlayer'
import { TOURNAMENT_COMPANIES_RN, tournamentCompanyReducer } from 'weplay-events/reduxs/tournamentCompanies'
import { PARTICIPANTS_RN, participantsReducer } from 'weplay-events/reduxs/participants'
import { EVENTS } from 'weplay-events/reduxs/reducerName'

import bannersReducer, { BANNERS_RN } from 'weplay-media/reduxs/banners/reducer'
import { MEDIA } from 'weplay-media/reduxs/reducerName'

import { EVENTS_RN, eventsReducer } from 'reduxs/events'
import { EVENT_LOCALIZATIONS_RN, eventLocalizationsReducer } from 'reduxs/event-localizations'
import { B2B } from 'reduxs/reducerName'

export default combineReducers({
  [LAYOUT_RN]: layoutReducer,
  [SUBSCRIPTIONS_RN]: subscriptionsReducer,
  [SUBSCRIPTION_BLOCKS_RN]: subscriptionBlocksReducer,
  [NEWS_RN]: news,
  [MEDIA]: combineReducers({
    [BANNERS_RN]: bannersReducer,
  }),
  [EVENTS]: combineReducers({
    [ROOTPAGE_RN]: rootpageReducer,
    [DISCIPLINE_RN]: disciplineReducer,
    [TOURNAMENT_RN]: tournamentReducer,
    [TOURNAMENT_TEAM_RN]: tournamentTeamReducer,
    [TOURNAMENT_PLAYER_RN]: tournamentPlayerReducer,
    [TOURNAMENT_COMPANIES_RN]: tournamentCompanyReducer,
    [PARTICIPANTS_RN]: participantsReducer,
  }),
  [B2B]: combineReducers({
    [EVENTS_RN]: eventsReducer,
    [EVENT_LOCALIZATIONS_RN]: eventLocalizationsReducer,
  }),
})
