import * as R from 'ramda'

import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import { readNews } from 'weplay-core/reduxs/news/actions'
import { readSpecialTag } from 'weplay-core/reduxs/specialTags/actions'

import { rootpageActions } from 'weplay-events/reduxs/rootpage'
import { createEventRootPageResourcesIdsSelector } from 'weplay-events/reduxs/rootpage/selectors'

import { ROOT_PAGE_ID } from './constants'

const getResourcesData = (currentLanguage, resourcesIds, dispatch, getState) => {
  if (R.not(R.isEmpty(resourcesIds.newsIds))) {
    readNews.request({
      language: currentLanguage,
      targetIds: resourcesIds.newsIds.join(','),
      limit: 20,
    })(dispatch, getState).catch(error => console.warn(error))
  }
  if (R.not(R.isNil(resourcesIds.specialTagId))) {
    readSpecialTag.request({
      specialTagId: resourcesIds.specialTagId,
    })(dispatch, getState).catch(error => console.warn(error))
  }
}

export const readHomePageAndNews = () => (dispatch, getState) => rootpageActions.findRecord.request({
  id: ROOT_PAGE_ID,
})(dispatch, getState)
  .then(() => {
    const state = getState()
    const resourcesIds = createEventRootPageResourcesIdsSelector(() => ROOT_PAGE_ID)(state)
    const currentLanguage = currentLanguageSelector(state)

    getResourcesData(currentLanguage, resourcesIds, dispatch, getState)
  })
