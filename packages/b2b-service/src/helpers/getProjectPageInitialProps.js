import { NEWS_TAG_ID, BRAND_INTEGRATION_TAG_ID } from 'config/projects'

import { createNewspapersByTagIdSelector } from 'weplay-core/reduxs/news/reducer'
import { readNews } from 'weplay-core/reduxs/news/actions'

import { eventsActions, eventsSelectors } from 'reduxs/events'

import { getNewspaperParams } from 'helpers/newspaperHelpers'

import { devConsole } from './index'

export const getProjectPageInitialProps = async ({ ctx, initialLocale }) => {
  // TODO: @Rohovoi rename nameAndId to projectSlug at the final step (before release updated projects)
  const { nameAndId: projectSlug } = ctx.query
  const projectId = Number(projectSlug.split('-').slice(-1)[0])

  try {
    await eventsActions.findRecord.request({
      id: projectId,
    })(ctx.store.dispatch, ctx.store.getState)
  } catch (err) {
    devConsole.warn('no project', err)
  }

  try {
    await readNews.request(getNewspaperParams(initialLocale))(ctx.store.dispatch, ctx.store.getState)
  } catch (err) {
    devConsole.warn('no newspapers', err)
  }

  try {
    await readNews.request(getNewspaperParams(
      initialLocale,
      { tag: BRAND_INTEGRATION_TAG_ID },
    ))(ctx.store.dispatch, ctx.store.getState)
  } catch (err) {
    devConsole.warn('no brand integration newspapers', err)
  }

  const store = ctx.store.getState()

  const project = store |> eventsSelectors.createRecordByIdSelector(projectId)
  const newspapers = store |> createNewspapersByTagIdSelector(NEWS_TAG_ID, initialLocale)
  const brandIntegrationNews = store |> createNewspapersByTagIdSelector(BRAND_INTEGRATION_TAG_ID, initialLocale)

  const isBrandIntegrationNewsExists = Boolean(brandIntegrationNews.length)
  const projectLocalization = project.eventLocalizations?.find(localization => localization.language === initialLocale)
  const sortedBrandIntegrationNews = isBrandIntegrationNewsExists && projectLocalization?.brandIntegrations
    .map(id => brandIntegrationNews
      .find(newspaper => newspaper.newsId === id))

  return {
    // response data
    project,
    newspapers,
    brandIntegrationNews: sortedBrandIntegrationNews,
    // props data
    projectSlug,
  }
}
