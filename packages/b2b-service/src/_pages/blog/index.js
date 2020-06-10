import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react'
import AlternateHead from 'components/AlternateHead/AlternateHead'
import B2BBreadcrumbs from 'components/B2BBreadcrumbs/B2BBreadcrumbs'
import FourTiles from 'components/FourTiles/FourTiles'
import Articles from 'components/Articles/Articles'
import B2BSection from 'components/B2BSection/B2BSection'
import ContactUsSection from '_pages/_app/ContactUsModal/ContactUsSection/ContactUsSection'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { allSettled } from 'weplay-core/helpers/allSettled'
import { axios } from 'weplay-core/services/axios'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'
import getArticleImage from 'weplay-core/helpers/getArticleImage'
import transliterate from 'weplay-core/helpers/translit'

import LoadMoreButton from 'weplay-components/LoadMoreButton'

import classes from './styles.scss'

const topNewsPaperAmount = 4
const moreNewsAmount = 4
const moreNewsStep = 8
const b2bNewsAboutEventsTagId = 1439
const b2bOtherNewsTagId = 1440
const topNewsParams = {
  tag: b2bNewsAboutEventsTagId,
  limit: topNewsPaperAmount,
  show_hidden_from_listing: 1,
  sort: '-published',
}
const bottomNewsParams = {
  limit: moreNewsAmount,
  offset: 0,
  tag: b2bOtherNewsTagId,
  sort: '-published',
  show_hidden_from_listing: 1,
}
const getNewspapers = async (locale, params, imageFormat) => {
  let response
  try {
    response = await axios.get('/media-service/news', {
      params: {
        language: locale,
        ...params,
      },
    })
  } catch (err) {
    console.warn('getNewspapers failed with ', err)
    response = {
      data: {
        data: [],
        paginationInfo: {
          count: 0,
          limit: 0,
          offset: 0,
        },
      },
    }
  }

  const responseData = camelizeKeys(response.data)
  return {
    ...responseData,
    data: responseData.data.map(newspaper => ({
      ...newspaper,
      url: `/blog/article/${transliterate(newspaper.title)}-${newspaper.articleId}`,
      image: getArticleImage(newspaper, imageFormat),
    })),
  }
}
const BlogPage = ({
  initialTopNewspapers,
  initialMoreNewspapers,
}) => {
  const t = useTranslation()
  const { locale } = useLocale()
  const [topNewspapers, setTopNewspapers] = useState(initialTopNewspapers.data)
  const [moreNewspapers, setMoreNewspapers] = useState(initialMoreNewspapers.data)
  const [pagination, setPagination] = useState(initialMoreNewspapers.paginationInfo)
  const [isNewspapersLoading, setLoading] = useState(false)

  const allBreadcrumbs = useMemo(() => [
    {
      name: t('common.breadcrumbs.home'),
      path: '/',
    },
    {
      name: t('blogPage.seo.breadcrumbs.blog'),
      path: '/blog',
    },
  ], [t])

  useEffect(() => {
    getNewspapers(locale, topNewsParams, 'big')
      .then(response => response.data)
      .then(setTopNewspapers)
    setLoading(true)
    getNewspapers(locale, bottomNewsParams, 'standard')
      .then((response) => {
        setPagination(response.paginationInfo)
        setMoreNewspapers(response.data)
      })
      .then(() => setLoading(false))
  }, [locale])

  const hasMore = useMemo(
    () => pagination.count > pagination.offset + pagination.limit,
    [
      pagination.count,
      pagination.limit,
      pagination.offset,
    ],
  )

  const alternateLinks = {
    ru: 'https://about.weplay.tv/ru/blog',
    en: 'https://about.weplay.tv/blog',
  }

  const loadMoreNewspapers = useCallback(() => {
    setLoading(true)
    getNewspapers(locale, {
      ...bottomNewsParams,
      limit: moreNewsStep,
      offset: pagination.offset + pagination.limit,
    }, 'standard')
      .then((response) => {
        setPagination(response.paginationInfo)
        setMoreNewspapers(moreNewspapers.concat(response.data))
      })
      .then(() => setLoading(false))
  }, [locale, moreNewspapers, pagination.limit, pagination.offset])

  return (
    <>
      <AlternateHead links={alternateLinks} />

      <B2BBreadcrumbs allBreadcrumbs={allBreadcrumbs} />

      <B2BSection>
        <FourTiles
          tiles={topNewspapers}
          title={t('blogPage.news.title')}
        />
      </B2BSection>
      <B2BSection>
        <Articles
          newspapers={moreNewspapers}
          button={(
            <LoadMoreButton
              isLoading={isNewspapersLoading}
              onClick={loadMoreNewspapers}
              buttonText={t('blogPage.latest.button.text')}
              isVisible={hasMore}
            />
        )}
        />
      </B2BSection>
      <div className={classes.sectionGrey}>
        <div className={classes.formWrap}>
          <ContactUsSection />
        </div>
      </div>
    </>
  )
}
BlogPage.getInitialProps = async ({ initialLocale }) => {
  const [
    topNewspapers,
    moreNewspapers,
  ] = await allSettled([
    getNewspapers(initialLocale, topNewsParams, 'big'),
    getNewspapers(initialLocale, bottomNewsParams, 'standard'),
  ])
  return ({
    initialTopNewspapers: topNewspapers,
    initialMoreNewspapers: moreNewspapers,
  })
}

export default BlogPage
