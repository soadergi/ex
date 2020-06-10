import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { $isEmpty } from 'weplay-core/$utils/$isEmpty'
import { readNews } from 'weplay-core/reduxs/news/actions'
import { createEmptyArray } from 'weplay-core/helpers/createEmptyArray'
import useAction from 'weplay-core/helpers/useAction'
import { usePageViewAnalytics } from 'weplay-core/hooks/usePageViewAnalytics'
import { windowWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { WIDTH_LG, WIDTH_SM } from 'weplay-core/reduxs/_legacy/layout/consts'
import { goTo, NAMES } from 'weplay-core/routes'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import PageHelmet from 'weplay-components/PageHelmet'
import Breadcrumbs from 'weplay-components/Breadcrumbs'

import ListingTitle from 'weplay-media/components/ListingTitle'
import NewsInfiniteList from 'weplay-media/components/NewsInfiniteList/NewsInfiniteList'
import { authorActions, authorSelectors } from 'weplay-media/reduxs/authors'

import ColumnistsList from './ColumnistsList'

const DEFAULT_LIMIT = 3
const TABLET_LIMIT = 2

const ColumnistsPage = ({
  history,
}) => {
  const [columnistIds, setColumnistIds] = useState([])
  const [offset, setOffset] = useState(0)
  const [hasMoreColumnists, setHasMoreColumnists] = useState(true)

  const windowWidth = useSelector(windowWidthSelector)
  const storedColumnists = useSelector(authorSelectors.createRecordsByIdsSelector(columnistIds))
  const { readAuthors } = useAction({ readAuthors: authorActions.queryRecords.request })
  const { getNews } = useAction({ getNews: readNews.request })

  const t = useTranslation()
  const { locale } = useLocale()

  const limit = useMemo(
    () => ((windowWidth >= WIDTH_SM && windowWidth < WIDTH_LG) ? TABLET_LIMIT : DEFAULT_LIMIT),
    [windowWidth],
  )
  const columnists = useMemo(
    () => ($isEmpty(storedColumnists) ? createEmptyArray(limit) : storedColumnists),
    [storedColumnists, limit],
  )

  const goToMedia = useCallback(() => goTo({ name: NAMES.MEDIA, history }), [history])
  const getColumnistNews = useCallback((columnist) => {
    getNews({
      language: locale,
      columnist: columnist.authorId,
      limit: 1,
      sort: '-published',
    })
  }, [getNews, locale])
  const readNextColumnistsPage = useCallback(() => {
    readAuthors({
      type: 'columnist',
      offset,
      limit,
    }).then((response) => {
      setColumnistIds(columnistIds.concat(response.data.map(columnist => columnist.authorId)))
      setHasMoreColumnists(offset + limit < response.paginationInfo.count)
      setOffset(offset + limit)
      response.data.forEach(getColumnistNews)
    })
  }, [readAuthors, setColumnistIds, setHasMoreColumnists, setOffset, columnistIds, offset, limit, getColumnistNews])

  usePageViewAnalytics(history)

  useEffect(() => {
    readNextColumnistsPage()
  }, [])

  return (
    <div
      className="u-py-2 u-py-md-4"
      data-qa-id={dataQaIds.pages[NAMES.COLUMNISTS].container}
    >
      <PageHelmet lokaliseProject="mediaCore" />

      <ContentContainer>
        <Breadcrumbs entityName={t('mediaCore.columnists.breadcrumbName')} />
        <ListingTitle
          title={t('mediaCore.columnists.seo.default.h1')}
          handleClick={goToMedia}
        />
        <div className="u-mb-6">
          <ColumnistsList
            onClick={readNextColumnistsPage}
            columnists={columnists}
            hasMore={hasMoreColumnists}
          />
        </div>

        <div className="u-mb-6">
          <NewsInfiniteList
            only="columnist"
            articleModifier="inline"
          />
        </div>
      </ContentContainer>
    </div>
  )
}

ColumnistsPage.propTypes = {
  history: PropTypes.shape({}).isRequired,
}

export default ColumnistsPage
