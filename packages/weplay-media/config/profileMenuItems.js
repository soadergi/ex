import { PROFILE_PAGE_PATHS } from 'weplay-core/routes/profile'

const PROFILE_LOKALISE_PATH = 'mediaCore.subHeader.profileMenu'
export const profileMenuItems = [
  {
    textKey: `${PROFILE_LOKALISE_PATH}.myAccount`,
    url: PROFILE_PAGE_PATHS.PERSONAL_INFO,
  },
  {
    textKey: `${PROFILE_LOKALISE_PATH}.myBookmarks`,
    url: PROFILE_PAGE_PATHS.MY_BOOKMARKS,
  },
  {
    textKey: `${PROFILE_LOKALISE_PATH}.browsingHistory`,
    url: PROFILE_PAGE_PATHS.BROWSING_HISTORY,
  },
  {
    textKey: `${PROFILE_LOKALISE_PATH}.subscriptions`,
    url: PROFILE_PAGE_PATHS.MY_SUBSCRIPTIONS,
  },
]
