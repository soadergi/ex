import * as R from 'ramda'
import { createSelector } from 'reselect'

import { rootpageSelectors } from './index'

export const createEventRootPageResourcesIdsSelector = getPageId => createSelector(
  [rootpageSelectors.createRecordByIdSelector(getPageId)],
  R.pipe(
    R.pathOr([], ['news', 'news']),
    news => ({
      newsIds: R.pipe(
        R.filter(R.propEq('resourceType', 'news')),
        R.defaultTo([]),
        R.map(R.prop('resourceId')),
      )(news),
      specialTagId: R.pipe(
        R.find(R.propEq('resourceType', 'special_tag')),
        R.propOr(null, 'resourceId'),
      )(news),
    }),
  ),
)

export const createEventRootPageGalleryImagesSelector = getPageId => createSelector(
  [rootpageSelectors.createRecordByIdSelector(getPageId)],
  R.pathOr([], ['gallery', 'images']),
)

export const createEventsRootPageTalentsSelector = pageId => createSelector(
  [rootpageSelectors.createRecordByIdSelector(pageId)],
  R.pathOr([], ['talents', 'talents']),
)

export const createEventRootPageTopSliderSelector = mapPropsToPageId => createSelector(
  [rootpageSelectors.createRecordByIdSelector(mapPropsToPageId)],
  R.pipe(
    R.pathOr([], ['topSlider', 'events']),
    R.map(item => ({
      id: item.title,
      title: item.title,
      images: {
        preview: item.mainImage,
        lg: item.previewImage,
        md: item.previewImage,
      },
      url: item.btnLink,
    })),
  ),
)

export const createEventRootPageNewsSourceListSelector = getPageId => createSelector(
  [rootpageSelectors.createRecordByIdSelector(getPageId)],
  R.pathOr([], ['news', 'news']),
)

export const createEventsRootPageArchiveEventsSelector = getPageId => createSelector(
  [rootpageSelectors.createRecordByIdSelector(getPageId)],
  R.pathOr([], ['archiveEvents', 'events']),
)

export const createEventsRootPageFutureEventsSelector = getPageId => createSelector(
  [rootpageSelectors.createRecordByIdSelector(getPageId)],
  R.pathOr([], ['futureEvents', 'events']),
)
