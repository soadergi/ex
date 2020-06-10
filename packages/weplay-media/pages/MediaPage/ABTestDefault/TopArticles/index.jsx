import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import getArticleImage from 'weplay-core/helpers/getArticleImage'
import { transformUrl } from 'weplay-core/helpers/transformUrl'

import Image from 'weplay-components/Image'
import LocalizedMoment from 'weplay-components/LocalizedMoment'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import Link from 'weplay-components/Link'
import Tags from 'weplay-components/Tags'
import BookmarkIcon from 'weplay-components/BookmarkIcon'
import MediaPlayer from 'weplay-components/MediaPlayer'

import LatestNews from '../LatestNews'
import ArticlePreview from '../ArticlePreview'

import styles from './styles.scss'
import { useTopArticles } from './container'

const mediaPlayerMods = ['articlePlayer']

const TopArticlesDefault = ({ latestIds }) => {
  const {
    latestNews,
    activeNewsPaper,
    setActiveNewsPaperId,
    topNews,
    getNewspaperInfoText,
    isMediaArticle,
    articleIcons,
  } = useTopArticles({ latestIds })
  return (
    <section className={classNames(
      styles.block,
      { [styles.streamPlayerVisible]: false },
    )}
    >
      <div className={styles.wrap}>
        <ContentContainer>
          <div className={styles.topArticle}>
            <div>
              <Tags tagsForNews={activeNewsPaper.tags} />
              <Link
                to={`/news/${transformUrl(activeNewsPaper)}`}
                className={styles.link}
              >
                <h2 className={styles.title}>{activeNewsPaper.title}</h2>
              </Link>
              <div className={styles.infoWrap}>
                <div>
                  <LocalizedMoment
                    dateTime={activeNewsPaper.publishedDate}
                    formatKey="short"
                  />
                  <span className="u-mx-half">•</span>
                  <span>
                    {getNewspaperInfoText(activeNewsPaper)}
                  </span>
                </div>
                <BookmarkIcon
                  color="blue"
                  newspaperId={activeNewsPaper.newsId}
                  isBookmarked={activeNewsPaper.isInBookmark}
                />
              </div>
            </div>

            <div className={styles.previewWrap}>
              <div className={styles.previewHolder}>
                {isMediaArticle ? (
                  <MediaPlayer
                    url={activeNewsPaper.mediaIframeLink}
                    modifiers={mediaPlayerMods}
                  />
                ) : (
                  <Link to={`/news/${transformUrl(activeNewsPaper)}`}>
                    <Image
                      className={styles.image}
                      src={getArticleImage(activeNewsPaper, 'big').url}
                      alt={getArticleImage(activeNewsPaper, 'big').alt}
                    />
                  </Link>
                )}
              </div>
            </div>

            <div className={styles.tabsWrap}>
              {topNews.map((item, index) => (
                <ArticlePreview
                  key={item.newsId}
                  url={item.mediaIframeLink ?? ''}
                  title={item.title}
                  previewUrl={getArticleImage(item, 'standard').url}
                  duration={getNewspaperInfoText(item)}
                  iconName={articleIcons[item.articleType]}
                  isActive={activeNewsPaper.newsId === item.newsId}
                  onClick={() => setActiveNewsPaperId(item.newsId)}
                  {...getAnalyticsAttributes({
                    category: 'Preview news',
                    action: item.title,
                    label: index + 1,
                  })}
                />
              ))}
            </div>
          </div>
          <LatestNews
            latestNews={latestNews}
            className={styles.latestNews}
          />
        </ContentContainer>
      </div>
    </section>
  )
}
TopArticlesDefault.propTypes = {
  latestIds: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default React.memo(TopArticlesDefault)
