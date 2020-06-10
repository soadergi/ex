import * as R from 'ramda'
import React, { useMemo } from 'react'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import getArticleImage from 'weplay-core/helpers/getArticleImage'
import transliterate from 'weplay-core/helpers/translit'
import { readNewspaper } from 'weplay-core/reduxs/news/actions'
import { createNewspapersByArticleIdSelector } from 'weplay-core/reduxs/news/reducer'

import Newspaper from 'weplay-media/pages/ArticlePage/Newspaper/Newspaper'

import AlternateHead from '../components/AlternateHead/AlternateHead'
import SeoTags from '../components/SeoTags/SeoTags'

const locationPage = 'weplay_business_general'
const getNewspaperUrl = (newspapers, language) => {
  const newspaper = newspapers.find(R.propEq('language', language))
  return `${transliterate(newspaper.title)}-${newspaper.articleId}`
}
const ArticlePage = ({
  router,
  articleNewspapers,
  articleLanguages,
  hrefLangUrls,
}) => {
  const { locale } = useLocale()
  const newspaper = useMemo(() => articleNewspapers.find(R.propEq('language', locale)), [articleNewspapers, locale])
  const t = useTranslation()
  const alternateLinks = useMemo(() => ({
    ru: `https://about.weplay.tv/ru/blog/article/${hrefLangUrls.ru}`,
    en: `https://about.weplay.tv/blog/article/${hrefLangUrls.en}`,
  }), [hrefLangUrls.en, hrefLangUrls.ru])
  const allBreadcrumbs = useMemo(() => [
    {
      name: t('common.breadcrumbs.home'),
      path: '/',
    },
    {
      name: t('blogPage.seo.breadcrumbs.blog'),
      path: '/blog',
    },
    {
      name: newspaper.title,
      path: router.asPath,
    },
  ], [newspaper.title, router.asPath, t])
  const img = useMemo(() => ({
    url: getArticleImage(newspaper, 'standard').url,
    width: 592,
    height: 352,
  }), [newspaper])
  if (!newspaper) {
    return null
  }
  delete newspaper.similar // eslint-disable-line
  return (
    <>
      <SeoTags
        title={newspaper.seo.title || `${newspaper.title} • ${t('blogPage.seo.title')}`}
        description={newspaper.seo.description || `${newspaper.description} | ${t('blogPage.seo.description')}`}
        img={img}
      />

      {hrefLangUrls && <AlternateHead links={alternateLinks} />}

      <Newspaper
        newspaper={newspaper}
        pageName={locationPage}
        articleLanguages={articleLanguages}
        hasBreadcrumbs
        hasCommentsSection={false}
        hasBookmarkButton={false}
        hasAuthor={false}
        hasTags={false}
        allBreadcrumbs={allBreadcrumbs}
        hasAdditionalBlocks={false}
      />
    </>
  )
}
ArticlePage.getInitialProps = async ({ ctx }) => {
  const articleId = ctx.query.nameAndId.split('-').slice(-1)[0]
  try {
    await readNewspaper.request({
      articleId,
    })(ctx.store.dispatch, ctx.store.getState)
  } catch (err) {
    console.warn('no newspaper', err)
  }

  const articleNewspapers = createNewspapersByArticleIdSelector(() => Number(articleId))(ctx.store.getState())
  const articleLanguages = articleNewspapers.map(R.prop('language'))
  return ({
    router: ctx.router,
    articleNewspapers,
    articleLanguages,
    hrefLangUrls: articleLanguages.length > 1
      && {
        ru: getNewspaperUrl(articleNewspapers, 'ru'),
        en: getNewspaperUrl(articleNewspapers, 'en'),
      },

  })
}
export default ArticlePage
