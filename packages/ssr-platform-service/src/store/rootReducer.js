import { combineReducers } from 'redux'
import { BACKOFFICE_CONTENT_RN, contentEditLinkReducer } from 'weplay-core/reduxs/contentEditLink/reducer'
import homepage, { HOMEPAGE_RN } from 'weplay-core/reduxs/homepage/reducer'
import notifications, { NOTIFICATIONS_RN } from 'weplay-core/reduxs/notifications/reducer'
import promoCodesReducer, { PROMO_CODES_RN } from 'weplay-core/reduxs/promoCodes/reducer'
import searchResult, { SEARCH_RESULT_RN } from 'weplay-core/reduxs/search/reducer'
import sections, { SECTIONS_RN } from 'weplay-core/reduxs/sections/reducer'
import specialTags, { SPECIAL_TAGS_RN } from 'weplay-core/reduxs/specialTags/reducer'
import news, { NEWS_RN } from 'weplay-core/reduxs/news/reducer'
import tooltips, { TOOLTIPS_RN } from 'weplay-core/reduxs/tooltips/reducer'
import userHistory, { USER_HISTORY_RN } from 'weplay-core/reduxs/userHistory/reducer'
import votingOptionsReducer, { VOTING_OPTIONS_RN } from 'weplay-core/reduxs/votingOptions/reducer'
import wallet, { WALLET_RN } from 'weplay-core/reduxs/wallets/reducer'
import articlesReducer, { ARTICLES_OLD_RN } from 'weplay-core/reduxs/_legacy/articles/reducer'
import authReducer, { AUTH_RN } from 'weplay-core/reduxs/_legacy/auth/reducer'
import layoutReducer, { LAYOUT_RN } from 'weplay-core/reduxs/_legacy/layout/reducer'
import notificationsReducer, { LOBBY_NOTIFICATIONS_RN } from 'weplay-core/reduxs/_legacy/lobbyNotifications/reducer'
import emailSubscriptions, { SUBSCRIPTIONS_RN } from 'weplay-core/reduxs/subscriptions/reducer'
import subscriptionBlocks, { SUBSCRIPTION_BLOCKS_RN } from 'weplay-core/reduxs/subscriptionBlocks/reducer'
import modalsReducer, { MODALS_RN } from 'weplay-core/reduxs/_legacy/modals/reducer'
import activeTournamentReducer, { ACTIVE_TOURNAMENT_LIVE_STREAM_RN } from 'weplay-core/reduxs/activeTournament/reducer'
import bookmarks, { BOOKMARKS_RN } from 'weplay-core/reduxs/bookmarks/reducer'
import competitiveReducer from 'weplay-competitive/reduxs'
import { COMPETITIVE } from 'weplay-competitive/reduxs/reducerName'
import eventsReducer from 'weplay-events/reduxs'
import { EVENTS } from 'weplay-events/reduxs/reducerName'
import mediaReducer from 'weplay-media/reduxs'
import { MEDIA } from 'weplay-media/reduxs/reducerName'

// TODO: remove duplicated reducer, extract src reducer to somewhere
export default combineReducers({

  [EVENTS]: eventsReducer,
  [COMPETITIVE]: competitiveReducer,
  [MEDIA]: mediaReducer,

  [ARTICLES_OLD_RN]: articlesReducer,
  [AUTH_RN]: authReducer,
  [LAYOUT_RN]: layoutReducer,
  // [LIVE_COMMENTS_RN]: liveCommentsReducer,
  [MODALS_RN]: modalsReducer,
  [LOBBY_NOTIFICATIONS_RN]: notificationsReducer,
  [HOMEPAGE_RN]: homepage,
  [NEWS_RN]: news,
  [SECTIONS_RN]: sections,
  [SUBSCRIPTIONS_RN]: emailSubscriptions,
  [SUBSCRIPTION_BLOCKS_RN]: subscriptionBlocks,
  [VOTING_OPTIONS_RN]: votingOptionsReducer,
  [PROMO_CODES_RN]: promoCodesReducer,
  [SPECIAL_TAGS_RN]: specialTags,
  [USER_HISTORY_RN]: userHistory,
  [BACKOFFICE_CONTENT_RN]: contentEditLinkReducer,
  [WALLET_RN]: wallet,
  [NOTIFICATIONS_RN]: notifications,
  [SEARCH_RESULT_RN]: searchResult,
  [BOOKMARKS_RN]: bookmarks,

  // [VOTINGS_RN]: votingsReducer,
  // [SERVICE_PAGE_RN]: servicePage,
  // [GAME_2048_RN]: game2048,

  [ACTIVE_TOURNAMENT_LIVE_STREAM_RN]: activeTournamentReducer,
  [TOOLTIPS_RN]: tooltips,

  serverLanguage: language => language || '',
  requestKey: requestKey => requestKey || '',
})
