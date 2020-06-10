import { BRAND_INTEGRATION_TAG_ID } from 'config/projects'

import { getSubscriptionBlock } from 'weplay-core/reduxs/subscriptionBlocks/actions'
import { createNewspapersByTagIdSelector } from 'weplay-core/reduxs/news/reducer'

import {
  getNewspapers,
  getNewspapersAboutEvents,
  normalizeNewspaperAboutEvents,
} from './newspaperHelpers'

const locationPage = 'weplay_business_general'

export const getServicesInitialProps = async ({ ctx, initialLocale }) => {
  const b2bOtherNewsTagId = 1440
  const b2bNewsAboutEventsTagId = 1439

  const store = ctx.store.getState()

  const newspapers = store
    |> createNewspapersByTagIdSelector(b2bOtherNewsTagId, initialLocale)
  const newspapersAboutEvents = store
    |> createNewspapersByTagIdSelector(b2bNewsAboutEventsTagId, initialLocale)

  const isNewspapersExists = Boolean(newspapers.length)
  const isNewspapersAboutEventsExists = Boolean(newspapersAboutEvents.length)

  const initialNewspapers = isNewspapersExists
    ? newspapers
    : await getNewspapers({ ctx, initialLocale })
      .then(res => res.data)

  const initialNewspapersAboutEvents = isNewspapersAboutEventsExists
    ? normalizeNewspaperAboutEvents(newspapersAboutEvents)
    : await getNewspapersAboutEvents({ ctx, initialLocale })
      .then(res => normalizeNewspaperAboutEvents(res.data))

  const subscriptionPromise = await getSubscriptionBlock.request({
    params: {
      language: initialLocale,
      isActive: 1,
      locationPage,
      locationId: 0,
    },
  })(ctx.store.dispatch, ctx.store.getState)

  return {
    initialNewspapers,
    initialNewspapersAboutEvents,
    promise: subscriptionPromise,
  }
}

export const getMediaRightsInitialProps = async ({ ctx, initialLocale }) => {
  const store = ctx.store.getState()

  const brandIntegrationNews = store
    |> createNewspapersByTagIdSelector(BRAND_INTEGRATION_TAG_ID, initialLocale)

  const isBrandIntegrationNewsExists = Boolean(brandIntegrationNews.length)

  const initialBrandIntegrationNews = isBrandIntegrationNewsExists
    ? normalizeNewspaperAboutEvents(brandIntegrationNews)
    : await getNewspapersAboutEvents({ ctx, initialLocale })
      .then(res => normalizeNewspaperAboutEvents(res.data))

  const subscriptionPromise = await getSubscriptionBlock.request({
    params: {
      language: initialLocale,
      isActive: 1,
      locationPage,
      locationId: 0,
    },
  })(ctx.store.dispatch, ctx.store.getState)

  return {
    initialBrandIntegrationNews,
    promise: subscriptionPromise,
  }
}
