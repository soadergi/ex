import { NAMES, PROFILE_PATHS } from 'weplay-core/routes/core'
import { pathWithParamsByRoute } from 'weplay-core/routes/index'

export const PROFILE_PAGE_PATHS = {
  BROWSING_HISTORY: pathWithParamsByRoute(NAMES.PROFILE, { section: PROFILE_PATHS.ARTICLES }),
  MY_BOOKMARKS: pathWithParamsByRoute(NAMES.PROFILE, { section: PROFILE_PATHS.BOOKMARKS }),
  MY_SUBSCRIPTIONS: pathWithParamsByRoute(NAMES.PROFILE, { section: PROFILE_PATHS.SUBSCRIPTIONS }),
  PERSONAL_INFO: pathWithParamsByRoute(NAMES.PROFILE, { section: PROFILE_PATHS.PERSONAL_INFO }),
  PREMIUM_SUBSCRIPTION: pathWithParamsByRoute(NAMES.PROFILE, { section: PROFILE_PATHS.PREMIUM_SUBSCRIPTION }),
  SIGN_IN_METHODS: pathWithParamsByRoute(NAMES.PROFILE, { section: PROFILE_PATHS.SIGN_IN_METHODS }),
}
