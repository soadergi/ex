import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SectionHeader from 'weplay-components/SectionHeader'
import ShowMoreLink from 'weplay-components/ShowMoreLink'
import * as R from 'ramda'

import ArticleItem from './ArticleItem'
import container from './container'
import styles from './styles.scss'

const hotMediaAlignTitle = ['hotMediaAlignTitle']

const ArticlesList = ({
  // required props
  linkUrl,
  linkText,
  articles,
  title,
  // optional props
  modifications,
  createAnalyticsWithLabel,
  isMobileWidth,
  isEventsPage,
  // analytic
  contentAction,
  contentType,
  isLinkVisible,
}) => (
  <div className={classNames(
    styles.articles,
    modifications.map(modification => (styles[modification])),
  )}
  >
    {title && (
      <SectionHeader
        title={title}
        linkUrl={!isMobileWidth ? linkUrl : ''}
        linkText={linkText}
        contentType={contentType}
        contentAction={contentAction}
        modifiers={hotMediaAlignTitle}
      />
    )}

    <div
      className={classNames(
        styles.container,
        { [styles.isEventsPage]: isEventsPage },
      )}
    >
      {articles.map((article, index) => (
        <ArticleItem
          key={article.newsId}
          article={article}
          className={styles.item}
          onClick={createAnalyticsWithLabel(index)}
        />
      ))}
    </div>

    {(isMobileWidth && linkUrl) && (
      <ShowMoreLink
        linkUrl={linkUrl}
        linkText={linkText}
        isVisible={isLinkVisible}
      />
    )}
  </div>
)


ArticlesList.propTypes = {
  // required props
  title: PropTypes.string,
  articles: PropTypes.arrayOf(PropTypes.shape).isRequired,
  contentAction: PropTypes.string.isRequired,
  contentType: PropTypes.string.isRequired,
  isLinkVisible: PropTypes.bool,

  // optional props
  modifications: PropTypes.arrayOf(PropTypes.string),
  linkUrl: PropTypes.string,
  linkText: PropTypes.string,
  isEventsPage: PropTypes.bool,
  createAnalyticsWithLabel: PropTypes.func,
  isMobileWidth: PropTypes.bool,
}

ArticlesList.defaultProps = {
  modifications: [],
  linkUrl: '',
  title: '',
  linkText: '',
  isLinkVisible: false,
  isMobileWidth: false,
  isEventsPage: false,
  createAnalyticsWithLabel: R.always,
}

export default container(ArticlesList)
