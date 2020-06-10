import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'
import { $hasData } from 'weplay-core/$utils/$hasData'
import { usePageViewAnalytics } from 'weplay-core/hooks/usePageViewAnalytics'
import { getWriterTitle } from 'weplay-core/reduxs/helpers'

import GridTile from 'weplay-components/GridTile/GridTile'
import Article from 'weplay-components/Article'
import MessageBanner from 'weplay-components/MessageBanner'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import PageHelmet from 'weplay-components/PageHelmet'
import Breadcrumbs from 'weplay-components/Breadcrumbs'
import Headline from 'weplay-components/HeadLine'

import NewsInfiniteList from 'weplay-media/components/NewsInfiniteList/NewsInfiniteList'
import { useContentStatus } from 'weplay-media/hooks/useContentStatus'
import AuthorHeader from 'weplay-media/pages/AuthorPage/AuthorHeader/AuthorHeader'
import { useNewspapersByIds } from 'weplay-media/hooks/useNewspapersByIds'

import messageImage from './img/milky-way.svg'
import styles from './AuthorPage.scss'
import { useAuthor } from './useAuthor'

const NEWSPAPERS_FETCH_LIMIT = 18

const AuthorPage = ({
  history,
}) => {
  const [hasNewspapers, setHasNewspapers] = useState(true)
  const { handleContentStatus } = useContentStatus()
  const t = useTranslation()
  const { author, isColumnist } = useAuthor()
  const authorTitle = useMemo(() => getWriterTitle(author) ?? '', [author])

  const topNewspapersIds = author.topNews?.map(authorTopNewspaper => authorTopNewspaper.newsId) ?? []
  const topNewspapers = useNewspapersByIds(topNewspapersIds)

  const hasTopNewspapers = topNewspapers.length > 0

  usePageViewAnalytics(history)

  useEffect(() => {
    if ($hasData(author)) {
      handleContentStatus(author)
    }
  }, [author, handleContentStatus])

  return (
    <div data-qa-id={dataQaIds.pages[NAMES.AUTHOR].container}>
      {author.authorId && (
        <AuthorHeader
          isColumnist={isColumnist}
          author={author}
        />
      )}
      <div className={classNames(
        styles.breadcrumbs,
        hasTopNewspapers && styles.grey,
      )}
      >
        <ContentContainer>
          <Breadcrumbs entityName={authorTitle} />
        </ContentContainer>
      </div>

      {hasTopNewspapers && (
        <div className={styles.topMaterials}>
          <ContentContainer>
            <Headline
              title={t('mediaCore.author.topNews.title')}
              size="h4"
            />
            <GridTile>
              {topNewspapers.map(topNewspaper => (
                <Article
                  key={topNewspaper.newsId}
                  article={topNewspaper}
                />
              ))}
            </GridTile>
          </ContentContainer>
        </div>
      )}

      {!hasNewspapers && (
        <div className={styles.emptyBlock}>
          <ContentContainer>
            <PageHelmet seoInfo={author.seo} />
            <MessageBanner
              imageUrl={messageImage}
              title={t('mediaCore.author.message.noResultTitle')}
              message={t('mediaCore.author.message.noResultSubTitle')}
            />
          </ContentContainer>
        </div>
      )}

      {hasNewspapers && (
        <>
          <div className={classNames(
            styles.lastMaterials,
            {
              [styles.columnist]: isColumnist,
            },
          )}
          >
            <ContentContainer>
              <Headline
                title={t('mediaCore.author.latestMaterialsTitle')}
                size="h4"
              />
              {author.authorId && (
              <NewsInfiniteList
                authorId={author.authorId}
                fetchLimit={NEWSPAPERS_FETCH_LIMIT}
                onEmptyResponse={() => setHasNewspapers(false)}
                isTile
              />
              )}
            </ContentContainer>
          </div>
        </>
      )}
    </div>
  )
}

AuthorPage.propTypes = {
  history: PropTypes.shape({}).isRequired,
}

AuthorPage.defaultProps = {
  // optional props
}

export default AuthorPage
