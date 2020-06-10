import * as R from 'ramda'
import { createSelector } from 'reselect'
import { combineReducers } from 'redux'

import { arrayToMapById, localizeWith } from 'weplay-core/reduxs/helpers'
import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'

import { createRequestReducer } from '../_factories/request/createRequestReducer'
import { createRequestSelectors } from '../_factories/request/createRequestSelectors'

import { readHomepage } from './actions'

export const HOMEPAGE_RN = 'HOMEPAGE'
const READ_HOMEPAGE_RN = 'READ_HOMEPAGE'

export default combineReducers({
  [READ_HOMEPAGE_RN]: createRequestReducer(readHomepage),
})

const readHomepageAsyncSelectors = createRequestSelectors([HOMEPAGE_RN, READ_HOMEPAGE_RN])
const readHomepageDataSelector = readHomepageAsyncSelectors.dataSelector

const homepageLocalizedDataSelector = createSelector(
  [readHomepageDataSelector, currentLanguageSelector],
  (data, currentLanguage) => localizeWith(currentLanguage)(data),
)

export const isHomepageFetchedSelector = createSelector(
  [homepageLocalizedDataSelector],
  data => !R.isNil(data) && !R.isEmpty(data),
)

export const getHomepageResourceIds = resources => ({
  newsIds: R.concat(
    R.pipe(
      R.pathOr([], ['news', 'news']),
      R.filter(R.propEq('resourceType', 'news')),
      R.defaultTo([]),
      R.map(R.prop('resourceId')),
    )(resources),
    R.pipe(
      R.pathOr([], ['topSlider', 'news']),
      R.map(R.prop('newsId')),
    )(resources),
  ),
  specialTagId: R.pipe(
    R.pathOr([], ['news', 'news']),
    R.find(R.propEq('resourceType', 'special_tag')),
    R.propOr(null, 'resourceId'),
  )(resources),
})
export const homepageResourceIdsSelector = createSelector(
  [homepageLocalizedDataSelector],
  getHomepageResourceIds,
)

export const homepageNewsBlockSelector = createSelector(
  [homepageLocalizedDataSelector],
  R.propOr({}, 'news'),
)

export const homepageSliderSelector = createSelector(
  [homepageLocalizedDataSelector],
  R.propOr({}, 'topSlider'),
)
export const homepageSliderImagesSelector = createSelector(
  [homepageSliderSelector],
  R.pipe(
    R.propOr([], 'news'),
    news => arrayToMapById(news, 'newsId'),
  ),
)

export const homepageTournamentsSelector = createSelector(
  [homepageLocalizedDataSelector],
  R.propOr({}, 'tournament'),
)

export const homepageYoutubeSelector = createSelector(
  [homepageLocalizedDataSelector],
  R.propOr({}, 'youtube'),
)

export const homepageVideoSocialLinksSelector = createSelector(
  [homepageLocalizedDataSelector],
  R.propOr({}, 'videoSocialLinks'),
)

export const homepageSocialLinksSelector = createSelector(
  [homepageLocalizedDataSelector],
  R.propOr({}, 'socialLinks'),
)

export const homepageSocialPostsSelector = createSelector(
  [homepageLocalizedDataSelector],
  R.pathOr([], ['socialPosts', 'posts']),
)

export const homepageSubscriptionSelector = createSelector(
  [homepageLocalizedDataSelector],
  R.propOr({}, 'subscription'),
)
