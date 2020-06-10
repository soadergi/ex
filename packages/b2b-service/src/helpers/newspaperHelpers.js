import getArticleImage from 'weplay-core/helpers/getArticleImage'
import transliterate from 'weplay-core/helpers/translit'
import { readNews } from 'weplay-core/reduxs/news/actions'

const b2bOtherNewsTagId = 1440
const b2bNewsAboutEventsTagId = 1439
const requestConfig = {
  limit: 4,
  showHiddenFromListing: 1,
  sort: '-published',
}

export const getNewspaperParams = (language, params = {}) => ({
  language,
  tag: b2bOtherNewsTagId,
  ...requestConfig,
  ...params,
})

const getNewspaperAboutEventsParams = language => ({
  language,
  tag: b2bNewsAboutEventsTagId,
  ...requestConfig,
})

export const getNewspapers = async ({ initialLocale, ctx }) => {
  const response = await readNews.request(getNewspaperParams(initialLocale))(ctx.store.dispatch, ctx.store.getState)
  return response
}

export const getBrandIntegrationNewspapers = async ({ initialLocale, ctx, brandIntegrationTagId }) => {
  const params = { tag: brandIntegrationTagId }
  const response = await readNews
    .request(getNewspaperParams(initialLocale, params))(ctx.store.dispatch, ctx.store.getState)
  return response
}

export const getNewspapersAboutEvents = ({ initialLocale, ctx }) => readNews.request(
  getNewspaperAboutEventsParams(initialLocale),
)(ctx.store.dispatch, ctx.store.getState)

export const normalizeNewspaperAboutEvents = newspapers => (
  newspapers.map(item => ({
    ...item,
    url: `/blog/article/${transliterate(item.title)}-${item.articleId}`,
    image: getArticleImage(item, 'big'),
  }))
)
