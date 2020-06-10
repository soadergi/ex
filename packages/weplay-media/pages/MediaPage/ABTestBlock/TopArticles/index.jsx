import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import getArticleImage from 'weplay-core/helpers/getArticleImage'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import ArticlePreview from '../ArticlePreview'
import LatestNews from '../LatestNews'

import { useTopArticles } from './container'
import styles from './styles.scss'

const TopArticles = ({ latestIds }) => {
  const {
    latestNews,
    topNews,
    getNewspaperInfoText,
  } = useTopArticles({ latestIds })
  const t = useTranslation()
  return (
    <section className={classNames(
      styles.block,
      { [styles.streamPlayerVisible]: false },
    )}
    >
      <div className={styles.wrap}>
        <ContentContainer>
          <div className={styles.tabsWrap}>
            {topNews.map((item, index) => (
              <ArticlePreview
                key={item.newsId}
                url={item.mediaIframeLink ?? ''}
                title={item.title}
                previewUrl={getArticleImage(item, 'standard').url}
                duration={getNewspaperInfoText(item)}
                bookmarkColor="blue"
                newspaper={item}
                {...getAnalyticsAttributes({
                  category: 'Preview news',
                  action: item.title,
                  label: index + 1,
                })}
              />
            ))}
          </div>
          <LatestNews
            title={t('mediaCore.mediaPage.latestTitle')}
            latestNews={latestNews}
            className={styles.latestNews}
          />
        </ContentContainer>
      </div>
    </section>
  )
}
TopArticles.propTypes = {
  latestIds: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default TopArticles
